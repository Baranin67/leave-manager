import knexFn from "knex"; 
import dbConfig from "../config/database-info.js";
import QueryString from "qs";


const knex = knexFn(dbConfig);


/**
 * @route POST /api/v1/leaveRequests/view
 * @desc view leave requests credentials
 * @access Private
 */


export async function leaveRequestsView(req, res) {
    try {
        // Parse 'fields' and 'where' from query parameters
        const parsedFields = req.query.fields || {};
        const parsedWhere = req.query.where || {};
        console.log("New /leaveRequests/view request from:", req.socket.remoteAddress, "with Fields", parsedFields, "Where", parsedWhere);

        // Helper to dynamically build leave request select columns
        const buildLeaveRequestsSelect = (fields) => {
            const columns = [];
            for (const key in fields) {
                if (fields[key] === 'true' || fields[key] === true) {
                    columns.push(`leaverequest.${key}`);
                }
            }
            return columns;
        };

        const leaveRequestsColumns = buildLeaveRequestsSelect(parsedFields);
        let query = knex('leaverequest').select(leaveRequestsColumns);

        // Apply WHERE condition
        if (Object.keys(parsedWhere).length > 0) {
            const whereClauses = {};
            for (const key in parsedWhere) {
                const column = key.includes('.') ? key : `leaverequest.${key}`;
                whereClauses[column] = parsedWhere[key];
            }
            query.where(whereClauses);
        }

        // Join to get user data if requested
        if (parsedFields.user) {
            query.leftJoin('users', 'leaverequest.user', 'users.id');
            const userColumns = Object.entries(parsedFields.user)
                .filter(([_, v]) => v === 'true' || v === true)
                .map(([k]) => `users.${k} as user_${k}`);
            query.select(userColumns);

            // User Address Join (if address is requested in fields)
            if (parsedFields.user.address) {
                query.leftJoin('address', 'users.address', 'address.id');
                const addressColumns = Object.entries(parsedFields.user.address)
                    .filter(([_, v]) => v === 'true' || v === true)
                    .map(([k]) => `address.${k} as address_${k}`);
                query.select(addressColumns);
            }

            // User Company Join (if company is requested in fields)
            if (parsedFields.user.company) {
                query.leftJoin('company', 'users.company', 'company.id');
                const companyColumns = Object.entries(parsedFields.user.company)
                    .filter(([_, v]) => v === 'true' || v === true)
                    .map(([k]) => `company.${k} as company_${k}`);
                query.select(companyColumns);

                // Company Address Join (if company.address is requested)
                if (parsedFields.user.company.address) {
                    // Zmieniamy alias z 'company_address' na np. 'companyAddress'
                    query.leftJoin('address as companyAddress', 'company.address', 'companyAddress.id');
                    const companyAddressColumns = Object.entries(parsedFields.user.company.address)
                        .filter(([_, v]) => v === 'true' || v === true)
                        .map(([k]) => `companyAddress.${k} as companyAddress_${k}`);
                    query.select(companyAddressColumns);
                }
            }
        }

        const leaveRequests = await query;

        // Post-process to group and nest user, address, and company data
        const formattedLeaveRequests = leaveRequests.map(leaveRequest => {
            const user = {};
            const address = {};
            const company = {};
            const companyAddress = {};
        
            for (const key in leaveRequest) {
                // User fields
                if (key.startsWith('user_')) {
                    user[key.replace('user_', '')] = leaveRequest[key];
                    delete leaveRequest[key];
                }
                // User Address fields - Zagnieżdżamy adres użytkownika w obiekcie 'user'
                if (key.startsWith('address_')) {
                    address[key.replace('address_', '')] = leaveRequest[key];
                    delete leaveRequest[key];
                }
                // User Company fields - Zagnieżdżamy dane firmy w użytkowniku
                if (key.startsWith('company_')) {
                    company[key.replace('company_', '')] = leaveRequest[key];
                    delete leaveRequest[key];
                }
                // Company Address fields
                if (key.startsWith('companyAddress_')) {
                    companyAddress[key.replace('companyAddress_', '')] = leaveRequest[key];
                    delete leaveRequest[key];
                }
            }
        
            // Zagnieżdżamy dane adresu użytkownika w obiekcie user
            if (Object.keys(address).length) {
                user.address = address;
            }
        
            // Zagnieżdżamy dane adresu firmy w obiekcie firmy
            if (Object.keys(companyAddress).length) {
                company.address = companyAddress;
            }
        
            // Zagnieżdżamy dane firmy w obiekcie user
            if (Object.keys(company).length) {
                user.company = company;
            }
        
            return {
                ...leaveRequest,
                user: Object.keys(user).length ? user : undefined,  
            };
        });

        console.log("Response content:", formattedLeaveRequests);
        res.status(200).json({ data: formattedLeaveRequests });
    } catch (err) {
        console.error('Error fetching leave requests:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
    

/**
 * @route PUT /api/v1/leaveRequests/create
 * @desc create leave requests
 * @access Private
 */


export async function leaveRequestsCreate(req, res) {
   
    const newLeaveRequestData = req.body;
    console.log("New /leaveRequests/create request from:", req.socket.remoteAddress, "with req.body", newLeaveRequestData);


    try {

        const result = await knex("leaverequest")
            .insert(newLeaveRequestData);
        const insertedId = result[0];

        const leaveRequest = await knex("leaverequest")
            .select()
            .where({id: insertedId})
            .first();
        
        console.log("Leave Requests created:",leaveRequest);
        res.status(200).json({ data: leaveRequest });
    }
    catch (err){
        console.error('Error creating leave requests:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route PATCH /api/v1/leaveRequests/update
 * @desc updates leave requests
 * @access Private
 */


export async function leaveRequestsUpdate(req, res) {

    const { id } = req.params;
    const newLeaveRequestData = req.body;
    console.log("New /leaveRequests/update request from:", req.socket.remoteAddress, "with req.body", newLeaveRequestData);


    try {

        const result = await knex("leaverequest")
            .update(newLeaveRequestData)
            .where({ id });

            if (result === 0) {
                console.log("Requested leave request not found");
                return res.status(404).json({ error: "Leave request not found" });
            }

        const leaveRequestData = await knex("leaverequest")
            .select()
            .where({ id })
            .first();
        
        console.log("Leave Requests updated:",leaveRequestData);
        res.status(200).json({ data: leaveRequestData });
    }
    catch (err){
        console.error('Error updating leave requests:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route DELETE /api/v1/leaveRequests/delete
 * @desc delete leave requests
 * @access Private
 */


export async function leaveRequestsDelete(req, res) {
   
    const { id } = req.params;
    console.log("New /leaveRequests/delete request from:", req.socket.remoteAddress, "with req.body id:", id);


    try {

        const result = await knex("leaverequest")
            .delete()
            .where({ id });

            if (result === 0) {
                console.log("Requested leave request not found");
                return res.status(404).json({ error: "Leave requests not found" });
            }

        console.log("Leave Requests deleted. id:", id);
        res.status(200).json({ message: "succesful" });
    }
    catch (err){
        console.error('Error deleting leave requests:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};