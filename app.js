const express = require('express')
const patientRoute = require('./routes/patients')
const adminRoute = require('./routes/admin')
const doctorRoute = require('./routes/doctor')
const app = express()
const pool = require('./model/db_pool')
app.use(express.json())

app.use(patientRoute)
app.use(adminRoute)
app.use(doctorRoute)

//get route
// app.get("/", (req,res) => {
//     res.status(200).send("app running")
// })



app.listen(process.env.PORT || 3001, ()=>{
    console.log(`app running on port ${process.env.PORT}`);
})