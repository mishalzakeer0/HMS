const pt_db = require('../model/patients');


const getAllPt = async(req,res,next)=>{
   try{
        const patients = await pt_db.allPt();  
        res.status(200).send(patients);
    }  catch(err){
        next(err)
}
};


const patient = async(req,res,next)=>{
    try{
        const {id} = req.body
        const pt = await pt_db.ptById(id);
        res.status(200).send(pt);
    } catch(err){
        next(err)
    }
};

const searchPt = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const pt = await dr_db.searchPt(key,value)
        res.status(200).send(pt);
    }catch(err){
        next(err)
    }
}

const deletePt = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const pt = await pt_db.deletePt(key,value)
        res.status(200).send(pt); 
    }catch(err){
        next(err)
    }
}

const createPt = async(req,res,next)=>{
    try{
        const{first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date} = req.body;
        const pt = await pt_db.createPt(first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date);
        res.status(200).send(pt)
        
    }catch(err){
        next(err)

    }
}

module.exports = {
    getAllPt,
    patient,
    searchPt,
    deletePt,
    createPt
}