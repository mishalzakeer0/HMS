const ap_db = require('../model/appointment');
const {body , validationResult} = require('express-validator')

const getAllAp = async(req,res,next)=>{
    try{
         const appointment = await ap_db.allAppointments();  
         req.msg = appointment
         console.log(appointment);
         next()
     }  catch(err){
         console.log("error while getting all appointment",err);
 }
 };

 const appointment = async (req, res, next) => {
   try {
     const { appointment_id } = req.body;
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
         res.status(401).send(errors.array()[0].msg)
         return errors
     }
     const ap = await ap_db.appointmentById(appointment_id);
     req.msg = ap;
     next();
   } catch (err) {
     console.log("error while getting appointment by id", err);
   }
 };

const deleteAp = async(req,res,next)=>{
    try{
        const{id} = req.body;
        const ap = await ap_db.deleteAppointment(id)
        req.msg = ap
        next()
    }catch(err){
        console.log("error while deleting appointment", err);
    }
}

const createAp = async(req,res,next)=>{
    try{
        const{patient_id, doctor_id, appointment_date} = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).send(errors.array()[0].msg)
            return errors
        }
        const ap = await ap_db.createAppointment(patient_id, doctor_id, appointment_date);
        req.msg = ap
        next()
        
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