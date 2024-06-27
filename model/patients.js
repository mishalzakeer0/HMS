const { where } = require("sequelize");
const pool = require("./db_pool");
const { raw } = require("mysql2");
const { Op } = require("sequelize");

const allPt = async () => {
  try {
    const result = await pool.Patient.findAll({ raw: true });

    return result;
  } catch (err) {
    console.log("error while selecting all patients", err);
  }
};

const ptById = async (id) => {
  try {
    const result = await pool.Patient.findOne({ where: { id: id }, raw: true });

    return result;
  } catch (err) {
    console.log("error while selecting patient by id", err);
  }
};

const updatePassword = async (newPassword, user) => {
  try {
    let result = await pool.Patient.update(
      {
        password: newPassword,
        resetPasswordToken: null,
        resetPasswordExpire: null,
      },
      { where: { id: user.id } }
    );

    if (result[0] === 0) {
      console.log("Patient not found");
      return null;
    }

    console.log("Password updated successfully");
    return result;
  } catch (err) {
    console.log("Error while updating patient password", err);
    throw err;
  }
};
const updateToken = async (resetToken, resetPasswordExpire, email) => {
  try {
    const result = await pool.Patient.update(
      { resetPasswordToken: resetToken, resetPasswordExpire },
      { where: { email } }
    );

    if (result[0] === 0) {
      return null;
    }
    return result;
  } catch (err) {
    console.log("Error while updating reset token", err);
    throw err;
  }
};

// updateToken('abcd', '2024-07-01 10:00:00','mishal@bititude.com')

const searchEmail = async (email) => {
  try {
    const result = await pool.Patient.findOne({
      where: { email: email },
      raw: true,
    });

    return result;
  } catch (err) {
    console.log("error while selecting patient by email", err);
  }
};

const searchExpire = async (token) => {
  try {
    const result = await pool.Patient.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpire: {
          [Op.gt]: new Date(), // Check if token is not expired
        },
      },
    });

    if (result) {
      console.log("Patient found by token:", result);
      return result;
    } else {
      console.log("Patient not found or token expired.");
      return null;
    }
  } catch (err) {
    console.error("Error while selecting patient by token:", err);
    throw err;
  }
};

// console.log(searchEmail("hello@bititude.com"))

const searchPt = async (key1, value1, key2, value2) => {
  try {
    const result = await pool.Patient.findOne({
      attributes: ["id", "first_name"],
      where: {
        [key1]: value1,
        [key2]: value2,
      },

      raw: true,
    });

    return result;
  } catch (err) {
    console.log("error while executing searchPt query: ", err);
  }
};
// searchPt('id', '5', 'last_name', 'mzm')

const deletePt = async (id) => {
  try {
    const result = await pool.Patient.destroy({
      where: {
        id: [id],
      },
      raw: true,
    });
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
  registration_date,
  password
) => {
  try {
    const result = await pool.Patient.create({
      first_name: first_name,
      last_name: last_name,
      age: age,
      gender: gender,
      email: email,
      phone: phone,
      address: address,
      city: city,
      state: state,
      country: country,
      postal_code: postal_code,
      registration_date: registration_date,
      password: password,
      raw: true,
    });
    console.log("create pt", result);
    return result;
  } catch (err) {
    console.log("error while executing createPt query: ", err);
  }
};

// createPt(
//   "mz",
//   "mzm",
//   18,
//   "Male",
//   "mishal@bititude.com",
//   "123-123-1243",
//   "jannah(H)",
//   "panniyankra",
//   "CL",
//   "IND",
//   "673003",
//   "2023-03-15",
//   "Zakeer*07"

// )

module.exports = {
  allPt,
  ptById,
  searchPt,
  deletePt,
  createPt,
  searchEmail,
  updateToken,
  searchExpire,
  updatePassword,
};
