const pool = require("./db_pool");
const mysql = require("mysql2");

const allAdmin = async () => {
  try {
    const result = await pool.Admin.findAll({ raw: true });
    // console.log(result)
  } catch (err) {
    console.error("error executing allAdmin query: ", err);
  }
};
// allAdmin();

const adminById = async (id) => {
  try {
    const result = await pool.Admin.findOne({ where: { id: id }, raw: true });
    // console.log(result)
    return result;
  } catch (err) {
    console.log("error executing adminById query ", err);
  }
};
// adminById(4)

const deleteAdmin = async (id) => {
  try {
    const result = await pool.Admin.destroy({
      where: {
        id: id,
      },
      raw: true,
    });
    // console.log(result);
    return result;
  } catch (err) {
    console.log("error while executing deleteAdmin query: ", err);
  }
};
// deleteAdmin('id', 5)

const createAdmin = async (username, password, email) => {
  try {
    const result = await pool.Admin.create({
      username: username,
      password: password,
      email: email,
      raw: true,
    });
    // console.log(result)
    return result;
  } catch (err) {
    console.log("error while executing createAdmin query: ", err);
  }
};
// createAdmin('mishal', "hdhdhd", 'misns@dnndw.com')

const searchAdmin = async (email, password) => {
  try {
    const result = await pool.Admin.findAll({
      where: {
        email: email,
        password: password,
      },
      raw: true,
    });
    // console.log(result);
    return result;
  } catch (err) {
    console.log("search Admin query is failed", err);
  }
};
// searchAdmin("mishalzakeer0@gmail.com", "Zakeer*07")
module.exports = {
  allAdmin,
  adminById,
  deleteAdmin,
  createAdmin,
  searchAdmin,
};
