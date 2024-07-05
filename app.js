const express = require("express");
const patientRoute = require("./routes/patients");
const adminRoute = require("./routes/admin");
const doctorRoute = require("./routes/doctor");
const app = express();
const pool = require("./model/db_pool");
const cors = require("cors");
app.use(express.json());

app.options("https://6687dc083756a847e7160ed1--mzhms.netlify.app", cors({ origin: "https://6687dc083756a847e7160ed1--mzhms.netlify.app" }));
app.use(
  cors({
    origin: "https://6687dc083756a847e7160ed1--mzhms.netlify.app",
    credentials: true,
  })
);

app.use("/patient", patientRoute);
app.use("/admin", adminRoute);
app.use("/doctor", doctorRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log(`app running on port ${process.env.PORT}`);
});
