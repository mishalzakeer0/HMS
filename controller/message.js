const { validationResult } = require('express-validator');
const msg_db = require('../model/message');

const getAllMsg = async(req,res,next)=>{
    try{
         const msg = await msg_db.allMessages();  
         req.msg = msg;
         next()
     }  catch(err){
         throw err
 }
 };

 const msg = async(req,res,next)=>{
    try{
        const {id} = req.body
        const msg = await msg_db.messageById(id);
        req.msg = msg;
        next()
    } catch(err){
        throw err
    }
};

const deleteMsg = async(req,res,next)=>{
    try{
        const{key1, value1, key2, value2} = req.body;
        const msg = await msg_db.deleteMessage(key1,value1,key2,value2)
        return msg 
    }catch(err){
        throw err
    }
}

const createMsg = async(req,res,next)=>{
    try{
        const{first_name, last_name, age, gender, message} = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).send(errors.array()[0].msg)
            
        }
        const msg = await msg_db.createMessage(first_name, last_name, age, gender, message);
        return msg
        
    }catch(err){
        throw err

    }
}

module.exports = {
    getAllMsg,
    msg,
    deleteMsg,
    createMsg
}