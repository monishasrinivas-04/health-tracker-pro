const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/healthtracker");

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB Error:", err);
});

const HealthSchema = new mongoose.Schema({
    name: String,
    age: String,
    weight: String,
    steps: String
});

const Health = mongoose.model("Health", HealthSchema);

app.post("/addRecord", async (req, res) => {

    try {

        console.log("BODY RECEIVED:");
        console.log(req.body);

        const data = new Health({
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            steps: req.body.steps
        });

        console.log("BEFORE SAVE");

        await data.save();

        console.log("AFTER SAVE");

        res.status(200).json({
            message: "Saved Successfully"
        });

    } catch (error) {

        console.log("FULL ERROR:");
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("Backend Working");
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

