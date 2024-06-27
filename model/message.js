const { raw } = require("mysql2");
const pool = require("./db_pool");

const allMessages = async () => {
  try {
    const result = await pool.Message.findAll({ raw: true });
    // console.log(result);
    return result;
  } catch (err) {
    console.error("error executing allMessage query: ", err);
  }
};
// allMessages()
const messageById = async (id) => {
  try {
    const result = await pool.Message.findOne({ where: { id: id }, raw: true });
    // console.log(result);
    // console.log(id);
    return result;
  } catch (err) {
    console.log("error executing messageById query ", err);
  }
};
// messageById(2)
const deleteMessage = async (id) => {
  try {
    const result = await pool.Message.destroy({
      where: {
        id: id,
      },
      raw: true,
    });
    // console.log(result);
    return result;
  } catch (err) {
    console.log("error while executing deleteMessage query: ", err);
  }
};
// deleteMessage("first_name", "John", "last_name", "Doe")
const createMessage = async (first_name, last_name, age, gender, message) => {
  try {
    const result = await pool.Message.create({
      first_name: first_name,
      last_name: last_name,
      age: age,
      gender: gender,
      message: message,
      raw: true,
    });
    // console.log(result)
    return result;
  } catch (err) {
    console.log("error while executing createMessage query: ", err);
  }
};
// createMessage("mishal", "zakeer", 18, "Male", "say my name !!")
module.exports = {
  allMessages,
  messageById,
  deleteMessage,
  createMessage,
};
