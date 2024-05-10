const { Sequelize } = require('sequelize');
const pool = require('./db_pool')
const mysql = require('mysql2')

const allAppointments = async () => {
    try{
        const result = await pool.Appointment.findAll({raw: true})
        // console.log(result);
        return result
    }
    catch(err) {
        console.error("error executing allAppointments query: ",err);
    }
}
// allAppointments()
const appointmentById = async (appointment_id) =>{
  try {
    const result = await pool.Appointment.findOne({
      where: {appointment_id: appointment_id}, raw: true}
    );
    // console.log(result);
    return result;
  } catch (err) {
    console.log("error executing drById query ", err);
  }
};
// appointmentById(2)

const deleteAppointment = async (id) => {
    try {
        const result = await pool.Appointment.destroy({
            where:{
                "appointment_id": id
            }
        })
        // console.log(result);
        return result;
    }catch (err) {
        console.log("error while executing deleteDr query: ", err);
    }
};
// deleteAppointment('appointment_id', 3, 'patient_id', 4)
const createAppointment = async (patient_id, doctor_id, appointment_date,) => {
    try {
        
        const result = await pool.Appointment.create({
           patient_id: patient_id,
           doctor_id: doctor_id,
           appointment_date: appointment_date,
           raw: true
        });
        
         console.log(result, "resatdb")
        return result;
    } catch (err) {
        console.log("error while executing createAppointment query: ", err);
    }
};

// createAppointment(2, 4, "2024/12/12")
module.exports = {
    allAppointments,
    appointmentById,
    deleteAppointment,
    createAppointment
}

