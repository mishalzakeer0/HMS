const { validationResult } = require('express-validator');
const pt_db = require('../model/patients');
const { msg } = require('./message');


const getAllPt = async(req,res,next)=>{
   try{
        const patients = await pt_db.allPt();
        req.msg = patients
        next() 
    }  catch(err){
        console.log("error in get all patient",err);
}
};


const patient = async(req,res,next)=>{
     try{
        const {id} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).send(errors.array()[0].msg)
            return errors
        }
        const pt = await pt_db.ptById(id);
        req.msg = pt
        next()

    } catch(err){
        res.status(400).send("patient by id failed",err)
    }
};

const searchPt = async(req,res,next)=>{
    try{
        const{key1, value1, key2, value2} = req.body;
        const pt = await pt_db.searchPt(key1,value1,key2,value2)
        req.msg = pt
        next()
    }catch(err){
        console.log("failed search patient",err); 
    }
}

const deletePt = async(req,res,next)=>{
    try{
        const {id} = req.body;
        const pt = await pt_db.deletePt(id)
        if (pt) {
          req.msg = pt
          next()
        } else {
          res.status(404).send("Patient not found")
          return
        }
        
    }catch(err){
        console.log("failed delete patient",err);
        throw err
    }
}

const createPt = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      age,
      gender,
      email,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
      registration_date,
      password,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send(errors.array()[0].msg);
    }
    const pt = await pt_db.createPt(
      first_name,
      last_name,
      age,
      gender,
      email,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
      registration_date,
      password
    );
    req.msg = pt;
    next()
  } catch (err) {
    console.log("error while create patient", err);
  }
};

module.exports = {
    getAllPt,
    patient,
    searchPt,
    deletePt,
    createPt
}