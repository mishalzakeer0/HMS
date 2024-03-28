const { validationResult, Result } = require('express-validator');
const dr_db = require('../model/doctor');

const getAlldr = async(req,res,next)=>{
   try{
        const doctors = await dr_db.allDr();  
        res.status(200).send(doctors);
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

const searchDoctor = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const dr = await dr_db.searchDr(key,value)
        res.status(200).send(dr);
    }catch(err){
        throw err
    }
}

const deleteDoctor = async(req,res,next)=>{
    try{
        const{key1, value1, key2, value2} = req.body;
        const dr = await dr_db.deleteDr(key1,value1,key2,value2)
        res.status(200).send(dr); 
    }catch(err){
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
        res.status(200).send(dr)
        
    }catch(err){
        throw err

    }
}


module.exports = {
    getAlldr,
    doctor,
    searchDoctor,
    deleteDoctor,
    createDoctor
}
