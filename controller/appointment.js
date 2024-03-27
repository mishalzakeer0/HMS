const ap_db = require('../model/appointment');

const getAllAp = async(req,res,next)=>{
    try{
         const appointment = await ap_db.allAppointments();  
         res.status(200).send(appointment);
     }  catch(err){
         console.log("error while getting all appointment",err);
 }
 };

 const appointment = async(req,res,next)=>{
    try{
        const {appointment_id} = req.body
        const ap = await ap_db.appointmentById(appointment_id);
        res.status(200).send(ap);
    } catch(err){
        console.log("error while getting appoint by id",err);
    }
};

const deleteAp = async(req,res,next)=>{
    try{
        const{key1, value1, key2, value2} = req.body;
        const pt = await ap_db.deleteAppointment(key1,value1,key2,value2)
        res.status(200).send(pt); 
    }catch(err){
        console.log("error while deleting appointment", err);
    }
}

const createAp = async(req,res,next)=>{
    try{
        const{patient_id, doctor_id, appointment_date} = req.body;
        const ap = await ap_db.createAppointment(patient_id, doctor_id, appointment_date);
        res.status(200).send(ap)
        
    }catch(err){
        console.log("error while creating appointment",err)

    }
}

module.exports = {
    getAllAp,
    appointment,
    deleteAp,
    createAp
}