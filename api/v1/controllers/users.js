import knexFn from "knex"; 
import dbConfig from "../config/database-info.js";
import bcrypt from "bcrypt";


const knex = knexFn(dbConfig);


/**
 * @route POST /api/v1/users/view
 * @desc view user credentials
 * @access Private
 */


export async function userView(req, res) {
    try {
        // Parse 'fields' and 'where' from query parameters
        const parsedFields = req.query.fields || {};
        const parsedWhere = req.query.where || {};
        console.log("New /user/view request from:", req.socket.remoteAddress, "with Fields", parsedFields, "Where", parsedWhere )

    // Helper to dynamically build user select columns
    const buildUserSelect = (fields) => {
        const columns = [];
        for (const key in fields) {
            if (fields[key] === 'true' || fields[key] === true) {
                columns.push(`users.${key}`);
            }
        }
        return columns;
    };

    const userColumns = buildUserSelect(parsedFields);
    let query = knex('users').select(userColumns);

    // Apply WHERE condition
    if (Object.keys(parsedWhere).length > 0) {
        const whereClauses = {};
        for (const key in parsedWhere) {
            const column = key.includes('.') ? key : `users.${key}`;
            whereClauses[column] = parsedWhere[key];
        }
        query.where(whereClauses);
    }

    // User Address Join (if address is requested in fields)
    if (parsedFields.address) {
        query.leftJoin('address', 'users.address', 'address.id');
        const addressColumns = Object.entries(parsedFields.address)
            .filter(([_, v]) => v === 'true' || v === true)
            .map(([k]) => `address.${k} as address_${k}`);
        query.select(addressColumns);
    }

    // Company Join (if company is requested in fields)
    if (parsedFields.company) {
        query.leftJoin('company', 'users.company', 'company.id');
        const companyColumns = Object.entries(parsedFields.company)
            .filter(([_, v]) => v === 'true' || v === true)
            .map(([k]) => `company.${k} as company_${k}`);
        query.select(companyColumns);

        // Company Address Join (if company.address is requested)
        if (parsedFields.company.address) {
            query.leftJoin('address as company_address', 'company.address', 'company_address.id');
            const companyAddressColumns = Object.entries(parsedFields.company.address)
                .filter(([_, v]) => v === 'true' || v === true)
                .map(([k]) => `company_address.${k} as company_address_${k}`);
            query.select(companyAddressColumns);
        }
    }

    const users = await query;

    // Post-process to group and nest address and company data
    const formattedUsers = users.map(user => {
        const address = {};
        const company = {};
        const companyAddress = {};

        for (const key in user) {
            // Address fields
            if (key.startsWith('address_')) {
                address[key.replace('address_', '')] = user[key];
                delete user[key];
            }
            // Company Address fields
            if (key.startsWith('company_address_')) {
                companyAddress[key.replace('company_address_', '')] = user[key];
                delete user[key];
            }
            // Company fields
            if (key.startsWith('company_')) {
                company[key.replace('company_', '')] = user[key];
                delete user[key];
            }
        }

        if (Object.keys(companyAddress).length) {
            company.address = companyAddress;
        }

        return {
            ...user,
            address: Object.keys(address).length ? address : undefined,
            company: Object.keys(company).length ? company : undefined
        };
    });

    console.log("Response content:",formattedUsers);
    res.status(200).json({ data: formattedUsers });
    } 
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route PUT /api/v1/users/create
 * @desc create user
 * @access Private
 */


export async function userCreate(req, res) {
   
    const newUserData = req.body;
    console.log("New /users/create request from:", req.socket.remoteAddress, "with req.body", newUserData);


    try {

        if(newUserData.password) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
        }

        const result = await knex("users")
            .insert(newUserData);
        const insertedId = result[0];

        const userData = await knex("users")
            .select()
            .where({id: insertedId})
            .first();
        
        console.log("User created:",userData);
        res.status(200).json({ data: userData });
    }
    catch (err){
        console.error('Error creating user:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route PATCH /api/v1/users/update
 * @desc updates user
 * @access Private
 */


export async function userUpdate(req, res) {
   
    const { id } = req.params;
    const newUserData = req.body;
    console.log("New /users/update request from:", req.socket.remoteAddress, "with req.body", newUserData);


    try {

        if(newUserData.password) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
        }

        const result = await knex("users")
            .update(newUserData)
            .where({id});

            if (result === 0) {
                console.log("Requested user not found");
                return res.status(404).json({ error: "User not found" });
            }

        const userData = await knex("users")
            .select()
            .where({id})
            .first();

        const { refreshToken, password, ...userWithoutSensitiveData } = userData;

        
        console.log("User updated:", userWithoutSensitiveData);
        res.status(200).json({ data: userWithoutSensitiveData });
    }
    catch (err){
        console.error('Error updating user:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route DELETE /api/v1/users/delete
 * @desc delete user
 * @access Private
 */


export async function userDelete(req, res) {
   
    const { id } = req.params;
    console.log("New /users/delete request from:", req.socket.remoteAddress, "with req.body id:", id);


    try {

        const result = await knex("users")
            .delete()
            .where({id});

            if (result === 0) {
                console.log("Requested user not found");
                return res.status(404).json({ error: "User not found" });
            }

        console.log("User deleted. id:", id);
        res.status(200).json({ message: "succesful" });
    }
    catch (err){
        console.error('Error deleting user:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};