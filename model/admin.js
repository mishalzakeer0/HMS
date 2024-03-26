const pool = require('./db_pool')
const mysql = require('mysql2')

const allAdmin = async () => {
    pool.query("select * from admin").then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.error("error executing allAdmin query: ",err);
    })
}

const adminById = async (id) =>{
    pool.query("Select * from admin where id = ?", id).then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.log("error executing adminById query ", err);
    })
}

const deleteAdmin = async (key, value) => {
    try {
        await pool.query("DELETE FROM Admin WHERE ?? = ?;", [key, value]);
        await pool.query("SET @num := 0;");
        await pool.query("UPDATE admin SET id = @num := (@num + 1);");
        const [result] = await pool.query("ALTER TABLE admin AUTO_INCREMENT = 1;");
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deleteAdmin query: ", err);
        throw err;
    }
};

const createAdmin = async  (username, password, email)  => {
    try {
        const sql = "INSERT INTO admin  (username, password, email)  VALUES (?,?,?)" 
        const value = [username, password, email]
        const [result] = await pool.query(sql,value);
        console.log(result)
        return result;
    } catch (err) {
        console.log("error while executing createAdmin query: ", err);
    }

};