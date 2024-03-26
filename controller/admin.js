const ad_db = require('../model/admin');


const getAllAd = async(req,res,next)=>{
    try{
         const admins = await ad_db.allAdmin();  
         res.status(200).send(admins);
     }  catch(err){
         next(err)
 }
 };

 const admin = async(req,res,next)=>{
    try{
        const id = req.body
        const ad = await ad_db.adminById(id);
        res.status(200).send(ad);
    } catch(err){
        next(err)
    }
};

const deleteAd = async(req,res,next)=>{
    try{
        const{key, value} = req.body;
        const ad = await ad_db.deleteAdmin(key,value)
        res.status(200).send(ad); 
    }catch(err){
        next(err)
    }
}

const createAd = async(req,res,next)=>{
    try{
        const{username, password, email} = req.body;
        const ad = await pt_db.createPt(username, password, email);
        res.status(200).send(ad)
        
    }catch(err){
        next(err)

    }
}

module.exports = {
    getAllAd,
    admin,
    deleteAd,
    createAd
}