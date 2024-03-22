const express = require('express')

const app = express()
const pool = require('./model/db_pool')



//get route
app.get("/", (req,res) => {
    res.status(200).send("app running")
})



const PORT = process.env.PORT
app.listen(PORT ,()=>{
    console.log(`app listening on port ${PORT}`)
})