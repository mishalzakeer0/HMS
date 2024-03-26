const pool = require('./db_pool')
const mysql = require('mysql2')

const allAppointments = async () => {
    pool.query("select * from appointments").then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.error("error executing allAppointments query: ",err);
    })
}

const appointmentById = async (id) =>{
    pool.query("Select * from appointments where id = ?", id).then(([result])=>{
        console.log(result)
    })
    .catch(err =>{
        console.log("error executing drById query ", err);
    })
}

const deleteAppointment = async (key, value) => {
    try {
        await pool.query("DELETE FROM appointments WHERE ?? = ?;", [key, value]);
        await pool.query("SET @num := 0;");
        await pool.query("UPDATE appointments SET appointment_id = @num := (@num + 1);");
        const [result] = await pool.query("ALTER TABLE appointments AUTO_INCREMENT = 1;");
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deleteDr query: ", err);
        throw err;
    }
};

const createAppointment = async (patient_id, doctor_id, appointment_date,) => {
    try {
        const sql = "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?,?,?,?)" 
        const value = [patient_id, doctor_id, appointment_date, "Scheduled"]
        const [result] = await pool.query(sql,value);
        console.log(result)
        return result;
    } catch (err) {
        console.log("error while executing createAppointment query: ", err);
    }

};

module.exports = {
    allAppointments,
    appointmentById,
    deleteAppointment,
    createAppointment
}

// deleteAppointment('appointment_id', 11);