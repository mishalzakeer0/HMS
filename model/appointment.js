const pool = require('./db_pool')
const mysql = require('mysql2')

const allAppointments = async () => {
    try{
        const [result] = await pool.query("select * from appointments")
        return result
    }
    catch(err) {
        console.error("error executing allAppointments query: ",err);
    }
}

const appointmentById = async (appointment_id) =>{
  try {
    const [result] = await pool.query(
      "Select * from appointments where appointment_id = ?;", appointment_id
    );
    return result;
  } catch (err) {
    console.log("error executing drById query ", err);
  }
}

const deleteAppointment = async (key1, value1,key2,value2) => {
    try {
        await pool.query("DELETE FROM appointments WHERE ?? = ? and ?? = ?;", [key1, value1, key2, value2]);
        await pool.query("SET @num := 0;");
        await pool.query("UPDATE appointments SET appointment_id = @num := (@num + 1);");
        const [result] = await pool.query("ALTER TABLE appointments AUTO_INCREMENT = 1;");
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deleteDr query: ", err);
        
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

