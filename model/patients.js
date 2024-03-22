const pool = require('./db_pool')
const mysql = require('mysql2')

const allPt = async () => {
    pool.query("select * from patients").then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.error("error executing allPt query: ",err);
    })
}

const ptById = async (id) =>{
    pool.query("Select * from patients where id = ?", id).then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.log("error executing ptById query ", err);
    })
}

const searchPt = async (key, value) => {
    try {
        console.log(key, value);
        const [result] = await pool.query("SELECT * FROM patients WHERE ?? = ?;", [key, value]);
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing searchPt query: ", err);
        throw err; r
    }
};

const deletePt = async (key, value) => {
    try {
        console.log(key, value);
        const [result] = await pool.query("DELETE FROM patients WHERE ?? = ?;", [key, value]);
        await pool.query("SET @num := 0;");
        await pool.query("UPDATE patients SET id = @num := (@num + 1);");
        await pool.query("ALTER TABLE patients AUTO_INCREMENT = 1;");
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deletePt query: ", err);
        throw err;
    }
};

deletePt('first_name', 'Michael');