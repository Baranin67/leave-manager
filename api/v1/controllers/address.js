import knexFn from "knex"; 
import dbConfig from "../config/database-info.js";


const knex = knexFn(dbConfig);


/**
 * @route POST /api/v1/address/view
 * @desc view address credentials
 * @access Private
 */


export async function addressView(req, res) {
    try {
        // Parse 'fields' and 'where' from query parameters
        const parsedFields = req.query.fields || {};
        const parsedWhere = req.query.where || {};
        console.log("New /address/view request from:", req.socket.remoteAddress, "with Fields", parsedFields, "Where", parsedWhere )

    // Helper to dynamically build address select columns
    const buildAddressSelect = (fields) => {
        const columns = [];
        for (const key in fields) {
            if (fields[key] === 'true' || fields[key] === true) {
                columns.push(`${key}`);
            }
        }
        return columns;
    };

    const addressColumns = buildAddressSelect(parsedFields);
    let query = knex('address').select(addressColumns);

    // Apply WHERE condition
    if (Object.keys(parsedWhere).length > 0) {
        const whereClauses = {};
        for (const key in parsedWhere) {
            const column = key.includes('.') ? key : `${key}`;
            whereClauses[column] = parsedWhere[key];
        }
        query.where(whereClauses);
    }

    const addressData = await query;

    console.log("Response content:",addressData);
    res.status(200).json({ data: addressData });
    } 
    catch (err) {
        console.error('Error fetching address:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route PUT /api/v1/address/create
 * @desc create address
 * @access Private
 */


export async function addressCreate(req, res) {
   
    const newAddressData = req.body;
    console.log("New /address/create request from:", req.socket.remoteAddress, "with req.body", newAddressData);


    try {

        const result = await knex("address")
            .insert(newAddressData);
        const insertedId = result[0];

        const addressData = await knex("address")
            .select()
            .where({id: insertedId})
            .first();
        
        console.log("Address created:",addressData);
        res.status(200).json({ data: addressData });
    }
    catch (err){
        console.error('Error creating address:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route PATCH /api/v1/address/update/:id
 * @desc updates address
 * @access Private
 */


export async function addressUpdate(req, res) {
   
    const { id } = req.params;
    const newAddressData = req.body;
    console.log("New /address/update request from:", req.socket.remoteAddress, "with req.body", newAddressData);


    try {

        const result = await knex("address")
            .update(newAddressData)
            .where({ id });

            if (result === 0) {
                return res.status(404).json({ error: "Address not found" });
            }

        const addressData = await knex("address")
            .select()
            .where({ id })
            .first();
        
        console.log("Address updated:",addressData);
        res.status(200).json({ data: addressData });
    }
    catch (err){
        console.error('Error updating address:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @route DELETE /api/v1/address/delete/:id
 * @desc delete address
 * @access Private
 */


export async function addressDelete(req, res) {
   
    const { id } = req.params;
    console.log("New /address/delete request from:", req.socket.remoteAddress, "with req.body id:", id);


    try {

        const result = await knex("address")
            .delete()
            .where({ id });

            if (result === 0) {
                return res.status(404).json({ error: "Address not found" });
            }

        console.log("Address deleted. id:", id);
        res.status(200).json({ message: "succesful" });
    }
    catch (err){
        console.error('Error deleting address:', err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
};