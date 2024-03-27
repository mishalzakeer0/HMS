const msg_db = require('../model/message');

const getAllMsg = async(req,res,next)=>{
    try{
         const msg = await msg_db.allMessages();  
         res.status(200).send(msg);
     }  catch(err){
         throw err
 }
 };

 const msg = async(req,res,next)=>{
    try{
        const id = req.body
        const msg = await msg_db.messageById(id);
        res.status(200).send(msg);
    } catch(err){
        throw err
    }
};

const deleteMsg = async(req,res,next)=>{
    try{
        const{key1, value1, key2, value2} = req.body;
        const msg = await msg_db.deleteMessage(key1,value1,key2,value2)
        res.status(200).send(msg); 
    }catch(err){
        throw err
    }
}

const createMsg = async(req,res,next)=>{
    try{
        const{first_name, last_name, age, gender, message} = req.body;
        const msg = await msg_db.createMessage(first_name, last_name, age, gender, message);
        res.status(200).send(msg)
        
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