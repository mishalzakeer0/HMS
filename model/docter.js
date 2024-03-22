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

const searchDr = async (key, value) => {
    try {
        console.log(key, value);
        const [result] = await pool.query("SELECT * FROM doctor WHERE ?? = ?;", [key, value]);
        await pool.query("SET @num := 0;");
        await pool.query("UPDATE doctor SET id = @num := (@num + 1);");
        await pool.query("ALTER TABLE doctor AUTO_INCREMENT = 1;");
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing searchDr query: ", err);
        throw err; r
    }
};

const deleteDr = async (key, value) => {
    try {
        console.log(key, value);
        const [result] = await pool.query("DELETE FROM doctor WHERE ?? = ?;", [key, value]);
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deleteDr query: ", err);
        throw err;
    }
};


