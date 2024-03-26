const msg_db = require('../model/message');

const getAllMsg = async(req,res,next)=>{
    try{
         const msg = await msg_db.allMessages();  
         res.status(200).send(msg);
     }  catch(err){
         next(err)
 }
 };

 const msg = async(req,res,next)=>{
    try{
        const id = req.body
        const msg = await msg_db.messageById(id);
        res.status(200).send(msg);
    } catch(err){
        next(err)
    }
};

const deleteMsg = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const msg = await msg_db.deleteMessage(key,value)
        res.status(200).send(msg); 
    }catch(err){
        next(err)
    }
}

const createMsg = async(req,res,next)=>{
    try{
        const{first_name, last_name, age, gender, message} = req.body;
        const msg = await pt_db.createPt(first_name, last_name, age, gender, message);
        res.status(200).send(msg)
        
    }catch(err){
        next(err)

    }
}

module.exports = {
    getAllMsg,
    msg,
    deleteMsg,
    createMsg
}