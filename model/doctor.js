const pool = require('./db_pool')


const allDr = async () => {
  try {
    const result = await pool.Doctor.findAll({raw: true});
    console.log(result);
    return result;
  } catch (err) {
    console.error("error executing allDr query: ", err);
  }
};
// allDr()
const searchDr = async (key1, value1, key2, value2) => {
    try {
      const result = await pool.Doctor.findAll({
        where: {
          [key1]: value1,
          [key2]: value2
        },
        raw: true
      });
      return result;
    } catch (err) {
      console.log("error while executing searchDr query: ", err);
    }
  };

const drById = async (id) =>{
    try{
        const result = await pool.Doctor.findOne({where:{id: {id}},raw: true});
        console.log(result);
        return result;
    }
    
    catch(err) {
        console.log("error executing drById query ", err);
    }
}
// drById(2)



// searchDr('name','Dr. David Lee','contact_number','444-333-2222')
const deleteDr = async (id) => {
    try {
        
        const result = await pool.Doctor.destroy({
            where: {
              id: id
            }
        });
        console.log(result);
        return result;
    } catch (err) {
        console.log("error while executing deleteDr query: ", err);
        
    }
};
// deleteDr('id', 21)

const createDr = async (name,specialization,experience_years,contact_number,email,address,password) => {
    try {
        const result = await pool.Doctor.create({
            name: name,
            specialization: specialization,
            experience_years: experience_years,
            contact_number: contact_number,
            email: email,
            address: address,
            password: password,
            raw: true
        });
        console.log(result);
        return result;
    } catch (err) {
      res.status(401).send(err,"Error while excuting createDr")
      throw err
        
    }

};

// createDr("mishal", "neuro", 3, "123-123-1323", "mishalzakeer0@gmail.com", "jannah(H)", "password")

module.exports = {
    allDr,
    drById,
    deleteDr,
    createDr,
    searchDr
}