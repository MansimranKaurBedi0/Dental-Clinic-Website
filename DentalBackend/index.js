const connectMongoose=require('./db.js');
const express=require('express');
connectMongoose();
const cors = require("cors");


const app=express();
const port=3000;
app.use(cors());
const router=require('./Routes/Appointment');

app.use(express.json());

app.use("/user",router);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

