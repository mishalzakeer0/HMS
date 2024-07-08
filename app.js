const express = require("express");
const patientRoute = require("./routes/patients");
const adminRoute = require("./routes/admin");
const doctorRoute = require("./routes/doctor");
const app = express();
const pool = require("./model/db_pool");
const cors = require("cors");
app.use(express.json());

const allowedOrigins = ["https://668b8918b074e9ddb1f6f663--hms1mz.netlify.app"];
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use("/patient", patientRoute);
app.use("/admin", adminRoute);
app.use("/doctor", doctorRoute);

app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`);
});
