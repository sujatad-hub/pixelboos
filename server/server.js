const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv'). config();

const User = require("./models/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

//importing routes
const authroutes= require("./routes/authroutes");
const rpsroutes = require("./routes/rpsroutes");

//connect routes
app.use("/assets", express.static("renderer/assets"));
app.use("/", authroutes);
app.use("/",rpsroutes);


const PORT = process.env.POST || 3000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});  


