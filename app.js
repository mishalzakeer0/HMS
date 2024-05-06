const express = require('express')
const patientRoute = require('./routes/patients')
const adminRoute = require('./routes/admin')
const doctorRoute = require('./routes/doctor')
const app = express()
const pool = require('./model/db_pool')
const cors = require('cors')
app.use(express.json())

app.options('http://localhost:3000', cors({ origin: 'http://localhost:3000' }))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use("/patient",patientRoute)
app.use("/admin",adminRoute)
app.use("/doctor",doctorRoute)

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`app running on port ${process.env.PORT}`);
})