const pool = require("./db_pool");
const mysql = require("mysql2");

console.log("user", process.env.DB_USER);
const allPt = async () => {
  try {
    const [result] = await pool.query("select * from patients");
    return result;
  } catch (err) {
    console.log("error while selecting all patients", err);
  }
};

const ptById = async (id) => {
  try {
    const [result] = await pool.query(
      "Select * from patients where id = ?",
      id
    );
    return result;
  } catch (err) {
    console.log("error while selecting patient by id", err);
  }
};

const searchPt = async (key1, value1, key2, value2) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM patients WHERE ?? = ? and ?? = ?;",
      [key1, value1, key2, value2]
    );
    return result;
  } catch (err) {
    console.log("error while executing searchPt query: ", err);
  }
};

const deletePt = async (key1, value1, key2,value2) => {
  try {
    console.log(key1, value1,key2,value2);
    const [result] = await pool.query("DELETE FROM patients WHERE ?? = ? and ?? = ?;", [
      key1,
      value1,
      key2,
      value2
    ]);
    await pool.query("SET @num := 0;");
    await pool.query("UPDATE patients SET id = @num := (@num + 1);");
    await pool.query("ALTER TABLE patients AUTO_INCREMENT = 1;");
    return result;
  } catch (err) {
    console.log("error while executing deletePt query: ", err);
  }
};

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
    const sql =
      "INSERT INTO patients (first_name, last_name, age, gender, email, phone, address, city, state, country, postal_code, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
    const [result] = await pool.query(sql, values);
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
