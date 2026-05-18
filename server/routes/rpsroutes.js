const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("../models/user");

const rpsroutes= express.Router();

rpsroutes.get("/getuserdata/:username", async (req, res)=>{
    try{
        const username = req.params.username;

        const user= await User.findOne({ username});

        res.json({
            username: user.username,
            characterimage : `/assets/${user.character}-head.png`
        });
    }
    catch(err){
        res.status(500).send("Error");
    }
})

module.exports=rpsroutes;