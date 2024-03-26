const pool = require('./db_pool')
const mysql = require('mysql2')

const allDr = async () => {
    pool.query("select * from doctor").then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.error("error executing allDr query: ",err);
    })
}

const drById = async (id) =>{
    pool.query("Select * from doctor where id = ?", id).then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.log("error executing drById query ", err);
    })
}

const searchDr = async (key1, value1, key2, value2) => {
    try {
        // console.log(key, value);
        const [result] = await pool.query("SELECT * FROM doctor WHERE ?? = ? and ?? = ?;", [key1, value1, key2, value2]);
        // console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing searchDr query: ", err);
        throw err;
    }
};

const deleteDr = async (key, value) => {
    try {
        console.log(key, value);
        await pool.query("DELETE FROM doctor WHERE ?? = ?;", [key, value]);
        await pool.query("SET @num := 0;");
        await pool.query("UPDATE doctor SET id = @num := (@num + 1);");
        await pool.query("ALTER TABLE doctor AUTO_INCREMENT = 1;");
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deleteDr query: ", err);
        throw err;
    }
};

const createDr = async (name,specialization,experience_years,contact_number,email,address) => {
    try {
        const sql = ("INSERT INTO doctor VALUES ?,?,?,?,?,?");
        const value = [name,specialization,experience_years,contact_number,email,address]
        await pool.query("INSERT INTO doctor VALUES ?,?,?,?,?,?", [name,specialization,experience_years,contact_number,email,address]);
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing createDr query: ", err);
        throw err;
    }

};

searchDr('name','Dr. David Lee','contact_number','444-333-2222')

module.exports = {
    allDr,
    drById,
    searchDr,
    deleteDr,
    createDr
}