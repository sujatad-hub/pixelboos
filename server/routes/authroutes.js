const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("../models/user");



const router= express.Router();

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, character } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "user already exists :(" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.json({ message: "signup successful!" });

    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password, character } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "user not found :(" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password!" });
        }

        res.json({ message: "Login successfu!!" });

    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
});

router.post("/character", async(req,res) => {
    const { username,character} =req.body;
    try{
        await User.updateOne(
            { username},
            { $set: { character: character}}
        );
        
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
});

module.exports = router;