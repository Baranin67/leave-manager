import knexFn from "knex"; 
import dbConfig from "../config/database-info.js";


const knex = knexFn(dbConfig);


/**
 * @route POST /api/v1/company/view
 * @desc view company credentials
 * @access Private
 */


export async function companyView(req, res) {
    try {
        // Parse 'fields' and 'where' from query parameters
        const parsedFields = req.query.fields || {};
        const parsedWhere = req.query.where || {};
        console.log("New /company/view request from:", req.socket.remoteAddress, "with Fields", parsedFields, "Where", parsedWhere )

    // Helper to dynamically build company select columns
    const buildCompanySelect = (fields) => {
        const columns = [];
        for (const key in fields) {
            if (fields[key] === 'true' || fields[key] === true) {
                columns.push(`${key}`);
            }
        }
        return columns;
    };

    const companyColumns = buildCompanySelect(parsedFields);
    let query = knex('company').select(companyColumns);

    // Apply WHERE condition
    if (Object.keys(parsedWhere).length > 0) {
        const whereClauses = {};
        for (const key in parsedWhere) {
            const column = key.includes('.') ? key : `company.${key}`;
            whereClauses[column] = parsedWhere[key];
        }
        query.where(whereClauses);
    }

    // Company Address Join (if address is requested in fields)
    if (parsedFields.address) {
        query.leftJoin('address', 'company.address', 'address.id');
        const addressColumns = Object.entries(parsedFields.address)
            .filter(([_, v]) => v === true)
            .map(([k]) => `address.${k} as address_${k}`);
        query.select(addressColumns);
    }

    const companyData = await query;

    // Post-process to group and nest address and company data
    const formattedCompany = companyData.map(companyData => {
        const address = {};


        for (const key in companyData) {
            // Address fields
            if (key.startsWith('address_')) {
                address[key.replace('address_', '')] = companyData[key];
                delete companyData[key];
            }
        }

        if (Object.keys(address).length) {
            companyData.address = address;
        }

        return {
            ...companyData,
            address: Object.keys(address).length ? address : undefined,
        };
    });

    console.log("Response content:",formattedCompany);
    res.status(200).json({ data: formattedCompany });
    } 
    catch (err) {
        console.error('Error fetching company:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route PUT /api/v1/company/create
 * @desc create company
 * @access Private
 */


export async function companyCreate(req, res) {
   
    const newCompanyData = req.body;
    console.log("New /company/create request from:", req.socket.remoteAddress, "with req.body", newCompanyData);


    try {

        const result = await knex("company")
            .insert(newCompanyData);
        const insertedId = result[0];

        const companyData = await knex("company")
            .select()
            .where({id: insertedId})
            .first();
        
        console.log("Company created:",companyData);
        res.status(200).json({ data: companyData });
    }
    catch (err){
        console.error('Error creating company:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route PATCH /api/v1/company/update/:id
 * @desc updates company
 * @access Private
 */


export async function companyUpdate(req, res) {
    
    const {id} = req.params;
    const newCompanyData = req.body;
    console.log("New /company/update request from:", req.socket.remoteAddress, "with req.body", newCompanyData);


    try {

        const result = await knex("company")
            .update(newCompanyData)
            .where({ id });

            if (result === 0) {
                return res.status(404).json({ error: "Company not found" });
            }

        const companyData = await knex("company")
            .select()
            .where({ id })
            .first();
        
        console.log("Company updated:",companyData);
        res.status(200).json({ data: companyData });
    }
    catch (err){
        console.error('Error updating company:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route DELETE /api/v1/company/delete/:id
 * @desc delete company
 * @access Private
 */


export async function companyDelete(req, res) {
   
    const { id } = req.params;
    console.log("New /company/delete request from:", req.socket.remoteAddress, "with req.body id:", id);


    try {

        const result = await knex("company")
            .delete()
            .where({id});

            if (result === 0) {
                return res.status(404).json({ error: "Company not found" });
            }

        console.log("Company deleted. id:", id);
        res.status(200).json({ message: "succesful" });
    }
    catch (err){
        console.error('Error deleting Company:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};