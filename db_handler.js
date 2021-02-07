// Dette er setupkode/connection, gjelder for serveren, som ikke trenger å gjentas
// DATABASEHÅNDTERING

const pg = require('pg');
const dbhandler = {};

let dbcred = "postgres://morekptiiwaimg:ea31b397226cbc620a97a79c583ff20f10fab3ec2a70bf65f52514a85483c1f5@ec2-52-48-65-240.eu-west-1.compute.amazonaws.com:5432/d9vuo2najrmusl";
    
const pool = new pg.Pool({
    connectionString: dbcred,
    ssl: {rejectUnauthorized: false}
});


// HANDLERS:

// Velger alt fra lister

dbhandler.getLists = async function() {
    let sql = "SELECT * FROM lists";
    let result = await pool.query(sql); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}

// Lager en ny liste

dbhandler.createList = async function(name, publ, comm, userid) {
    let sql = "INSERT INTO lists (id, list_name, publ, comm, userid) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *";
    let values = [name, publ, comm, userid];
    let result = await pool.query(sql, values); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}

// Delete list

dbhandler.deleteList = async function(id) {
    let sql = "DELETE FROM lists WHERE id = $1";
    let values = [id];
    let result = await pool.query(sql, values); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}


// Lager nye items

dbhandler.getItems = async function(listid) {
    let sql = "SELECT * FROM list_item WHERE list_id = $1";
    let values = [listid];
    let result = await pool.query(sql, values); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}

dbhandler.createItem = async function(itemName, listid) {
    let sql = "INSERT INTO list_item (id, item_name, list_id) VALUES (DEFAULT, $1, $2) RETURNING *";
    let values = [itemName, listid];
    let result = await pool.query(sql, values); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}

// Delete item

dbhandler.deleteItem = async function(id) {
    let sql = "DELETE FROM list_item WHERE id = $1";
    let values = [id];
    let result = await pool.query(sql, values); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}


// Create user

dbhandler.getUsers = async function() {
    let sql = "SELECT * FROM users";
    let result = await pool.query(sql); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}

dbhandler.createUser = async function(user_name, password) {
    let sql = "INSERT INTO users (id, user_name, password) VALUES (DEFAULT, $1, $2) RETURNING *";
    let values = [user_name, password];
    let result = await pool.query(sql, values); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}

dbhandler.deleteUser = async function(id) {
    let sql = "DELETE FROM users WHERE id = $1";
    let values = [id];
    let result = await pool.query(sql, values); // bruke await hvis det tar lang tid (pool)
    return result.rows;
}

module.exports = dbhandler;
