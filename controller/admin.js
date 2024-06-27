const ad_db = require("../model/admin");

const getAllAd = async (req, res, next) => {
  try {
    const admins = await ad_db.allAdmin();
    res.status(200).send(admins);
  } catch (err) {
    console.log("get all admin failed", err);
  }
};

const admin = async (req, res, next) => {
  try {
    const { id } = req.body;
    const ad = await ad_db.adminById(id);
    req.msg = ad;
    next();
  } catch (err) {
    console.log("admin by id failed", err);
  }
};

const deleteAd = async (req, res, next) => {
  try {
    const { id } = req.body;
    const ad = await ad_db.deleteAdmin(id);
    req.msg = ad;
    next();
  } catch (err) {
    console.log("error while delete Admin", err);
  }
};

const createAd = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const ad = await ad_db.createAdmin(username, password, email);
    req.msg = ad;
    next();
  } catch (err) {
    console.log("error in createAd", err);
  }
};
const searchAd = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const ad = await ad_db.searchAdmin(username, password);
    res.status.send(ad);
  } catch (err) {
    console.log("error in searchAd", err);
  }
};

module.exports = {
  getAllAd,
  admin,
  deleteAd,
  createAd,
  searchAd,
};
