const pt_db = require('../model/patients');


const getAllPt = async(req,res,next)=>{
   try{
        const patients = await pt_db.allPt();  
        res.status(200).send(patients);
    }  catch(err){
        console.log("error in get all patient",err);
}
};


const patient = async(req,res,next)=>{
     try{
        const {id} = req.body
        const pt = await pt_db.ptById(id);
        console.log(id)
        res.status(200).send(pt);
        console.log(pt)
    } catch(err){
        res.status(400).send("patient by id failed",err)
    }
};

const searchPt = async(req,res,next)=>{
    try{
        const{key1, value1, key2, value2} = req.body;
        const pt = await pt_db.searchPt(key1,value1,key2,value2)
        res.status(200).send(pt);
    }catch(err){
        console.log("failed search patient",err);
    }
}

const deletePt = async(req,res,next)=>{
    try{
        const{key1, value1,key2,value2} = req.body;
        const pt = await pt_db.deletePt(key1,value1,key2,value2)
        res.status(200).send(pt); 
    }catch(err){
        console.log("failed delete patient",err);
    }
}

const createPt = async(req,res,next)=>{
    try{
        const{first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date} = req.body;
        const pt = await pt_db.createPt(first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date);
        res.status(200).send(pt)
        
    }catch(err){
        console.log("error while create patient",err);

    }
}

module.exports = {
    getAllPt,
    patient,
    searchPt,
    deletePt,
    createPt
}