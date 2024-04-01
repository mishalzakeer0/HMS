const { where } = require('sequelize');
const pool = require('./db_pool')

const allPt = async () => {
  try {
    const result = await pool.Patient.findAll({raw: true});
    // console.log(result)
    return result;
  } catch (err) {
    console.log("error while selecting all patients", err);
  }
};

// console.log(allPt())

const ptById = async (id) => {
  try {
    const result = await pool.Patient.findOne({ where: { id: id }, raw: true});
    // console.log(result)
    return result;
  } catch (err) {
    console.log("error while selecting patient by id", err);
  }
};

// console.log(ptById(5))


const searchPt = async (key1, value1, key2, value2) => {
  try {
    const result = await pool.Patient.findAll({
      where: {
        [key1]: value1,
        [key2]: value2
      },
      raw: true
    });
    // console.log(result);
    return result;
  } catch (err) {
    console.log("error while executing searchPt query: ", err);
  }
};
// searchPt('id', '5', 'last_name', 'mzm')

const deletePt = async (key1, value1, key2,value2) => {
  try {
    const result = await pool.Patient.destroy({
      where:{
      [key1]: value1,
      [key2]: value2
    }}
    );
    return result;
  } catch (err) {
    console.log("error while executing deletePt query: ", err);
  }
};
// deletePt('first_name', 'Jennifer', 'last_name', 'Brown')

const createPt = async (
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
  registration_date
) => {
  try {
    const sql = pool.Patient.create
     
    const values = [
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
    ];
    const result = await pool.query(sql, values);
    // console.log(result);
    return result;
  } catch (err) {
    console.log("error while executing createPt query: ", err);
  }
};

// createPt('mz', 'mzm', 18, 'Male', 'mishal@bititude.com', '123-123-1243', 'jannah(H)', 'CL', 'IND', '673003', '2023-03-15');

module.exports = {
  allPt,
  ptById,
  searchPt,
  deletePt,
  createPt,
};
