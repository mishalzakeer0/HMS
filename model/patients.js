const pool = require('./db_pool')
const mysql = require('mysql2')

console.log("user",process.env.DB_USER)
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

const searchPt = async (key1, value1, key2, value2) => {
    try {
        // console.log(key1, value1, key2, value2);
        const [result] = await pool.query("SELECT * FROM patients WHERE ?? = ? and ?? = ?;", [key1, value1, key2, value2]);
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing searchPt query: ", err);
        throw err;
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

const createPt = async (first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date) => {
    try {
        const sql = "INSERT INTO patients (first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date];
        const [result] = await pool.query(sql, values);
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing createPt query: ", err);
        throw err;
    }
};

// createPt('mz', 'mzm', 18, 'Male', 'mishal@bititude.com', '123-123-1243', 'jannah(H)', 'CL', 'IND', '673003', '2023-03-15');

searchPt('first_name', 'mz', 'phone', '123-123-1243')

module.exports = {
    allPt,
    ptById,
    searchPt,
    deletePt,
    createPt
}
    