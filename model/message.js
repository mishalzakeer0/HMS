const pool = require('./db_pool')
const mysql = require('mysql2')

const allMessages = async () => {
    pool.query("select * from message").then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.error("error executing allMessage query: ",err);
    })
}

const messageById = async (id) =>{
    pool.query("Select * from message where id = ?", id).then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.log("error executing messageById query ", err);
    })
}

const deleteMessage = async (key, value) => {
    try {
        await pool.query("DELETE FROM message WHERE ?? = ?;", [key, value]);
        await pool.query("SET @num := 0;");
        await pool.query("UPDATE message SET id = @num := (@num + 1);");
        const [result] = await pool.query("ALTER TABLE message AUTO_INCREMENT = 1;");
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deleteMessage query: ", err);
        throw err;
    }
};

const createMessage = async (first_name, last_name, age, gender, message) => {
    try {
        const sql = "INSERT INTO message (first_name, last_name, age, gender, message) VALUES (?,?,?,?)" 
        const value = [first_name, last_name, age, gender, message]
        const [result] = await pool.query(sql,value);
        console.log(result)
        return result;
    } catch (err) {
        console.log("error while executing createMessage query: ", err);
    }

};