const dr_db = require('../model/doctor');

const getAlldr = async(req,res,next)=>{
   try{
        const doctors = await dr_db.allDr();  
        res.status(200).send(doctors);
    }  catch(err){
        next(err)
}
};


const doctor = async(req,res,next)=>{
    try{
        const id = req.body
        const dr = await dr_db.drById(id);
        res.status(200).send(dr);
    } catch(err){
        next(err)
    }
};

const searchDoctor = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const dr = await dr_db.searchDr(key,value)
        res.status(200).send(dr);
    }catch(err){
        next(err)
    }
}

const deleteDoctor = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const dr = await dr_db.deleteDr(key,value)
        res.status(200).send(dr); 
    }catch(err){
        next(err)
    }
}

const createDoctor = async(req,res,next)=>{
    try{
        const{name,specialization,experience_years,contact_number,email,address} = req.body;
        const dr = await dr_db.createDr(name,specialization,experience_years,contact_number,email,address);
        res.status(200).send(dr)
        
    }catch(err){
        next(err)

    }
}

createDoctor()