const { validationResult } = require('express-validator');
const pt_db = require('../model/patients');
const sendEmail = require('./utils/sendEmail'); 
const crypto = require('crypto');



const getAllPt = async(req,res,next)=>{
   try{
        const patients = await pt_db.allPt();
        req.msg = patients
        res.send(patients)
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

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await pt_db.searchExpire(token)
    
    if (!user) {
      
      return res.status(400).send("Invalid or expired token");
    }

  
    // Update the user's password and clear the reset token and expiration date
  

    const changePassword =   await pt_db.updatePassword(newPassword, user);
    
    res.status(200).send("Password has been reset successfully");
  } catch (err) {
    console.log("Failed to reset password", err);
    res.status(500).send("Server error");
  }
};



const forgotPassword = async (req, res) => {
  try {
      // console.log(req.query,"!@#$%^&*()(*&^%$#@#$%^&*(")
      const { email } = req.query;

      const user = await pt_db.searchEmail(email)

      if (!user) {
          return res.status(404).send("User not found");
      }

      // Generate reset token and expiry
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

      // Save token and expiration to user record
     const updateToken = await pt_db.updateToken(resetToken, resetPasswordExpire, email)

      const resetUrl = `http://localhost:3000/PatientLogin/ForgotPassword/ResetPassword/${resetToken}`;

      const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link to reset your password: \n\n ${resetUrl}`;

      const emailSent = await sendEmail({
          email: user.email,
          subject: 'Password Reset',
          message,
      });
      // console.log(emailSent,"emailsent ivde")
      if (emailSent) {
          res.status(200).send('Email sent');
      } else {
          res.status(500).send('Failed to send email');
      }
  } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
  }
};


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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(401).send(errors.array()[0].msg);
    // }
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
    createPt,
    forgotPassword,
    resetPassword
}