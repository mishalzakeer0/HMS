const { validationResult, Result } = require('express-validator');
const dr_db = require('../model/doctor');

const getAlldr = async(req,res,next)=>{
   try{
        const doctors = await dr_db.allDr();  
        req.msg = doctors
        next()
    }  catch(err){
        throw err
}
};


const doctor = async(req,res,next)=>{
    try{
        const id = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).send(errors.array()[0].msg)
            return errors
        }
        const dr = await dr_db.drById(id);
        res.status(200).send(dr);
    } catch(err){
        throw err
    }
};



const deleteDoctor = async(req,res,next)=>{
    try{
        const{id} = req.body;
        const dr = await dr_db.deleteDr(id)
        req.msg = dr 
        next()
    }catch(err){
        console.log("error deleting dr")
        throw err
    }
}

const createDoctor = async(req,res,next)=>{
    try{
        const{name,specialization,experience_years,contact_number,email,address,password} = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).send(errors.array()[0].msg)
            return errors            
        }
        const dr = await dr_db.createDr(name,specialization,experience_years,contact_number,email,address,password);
        req.msg = dr
        
    }catch(err){
        res.status(401).send(err,"Error while creating Doctor")
        throw err


    }
    next()
}


module.exports = {
    getAlldr,
    doctor,
    deleteDoctor,
    createDoctor
}
