const ap_db = require('../model/appointment');

const getAllAp = async(req,res,next)=>{
    try{
         const appointment = await ap_db.allAppointments();  
         res.status(200).send(appointment);
     }  catch(err){
         next(err)
 }
 };

 const appointment = async(req,res,next)=>{
    try{
        const id = req.body
        const ap = await ap_db.appointmentById(id);
        res.status(200).send(ap);
    } catch(err){
        next(err)
    }
};

const deleteAp = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const pt = await ap_db.deleteAppointment(key,value)
        res.status(200).send(pt); 
    }catch(err){
        next(err)
    }
}

const createAp = async(req,res,next)=>{
    try{
        const{patient_id, doctor_id, appointment_date} = req.body;
        const ap = await pt_db.createPt(patient_id, doctor_id, appointment_date);
        res.status(200).send(ap)
        
    }catch(err){
        next(err)

    }
}

module.exports = {
    getAllAp,
    appointment,
    deleteAp,
    createAp
}