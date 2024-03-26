const jwt = require('jsonwebtoken');
const userValid = require('../model/patients');
const express = require('express')
const app = express();

app.post('/User', (req, res) => {
    const username = req.body();
    const password = req.body();
    const validUser = userValid.searchPt('first_name', username, 'phone', password)
    if (length.validUser = 0 || err) {
        throw err
    }res.status(200).send('Valid User')
    
})

app.listen(8051,()=>{
    console.log(`userAuth running on port: ${8051}`)
})