require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

// Health Record Schema
const HealthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    steps: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
    },

    waterIntake: {
      type: Number,
    },

    fitnessStatus: {
      type: String,
    },

    diet: {
      type: String,
    },

    healthTip: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Health = mongoose.model("Health", HealthSchema);

// --------------------------------------------------
// CREATE - Add Health Record
// POST /api/records
// --------------------------------------------------

app.post("/api/records", async (req, res) => {
  try {
    const {
      name,
      age,
      weight,
      height,
      steps,
      bmi,
      waterIntake,
      fitnessStatus,
      diet,
      healthTip,
    } = req.body;

    const record = new Health({
      name,
      age,
      weight,
      height,
      steps,
      bmi,
      waterIntake,
      fitnessStatus,
      diet,
      healthTip,
    });

    const savedRecord = await record.save();

    res.status(201).json({
      message: "Health record added successfully",
      record: savedRecord,
    });
  } catch (error) {
    console.error("Create Record Error:", error);

    res.status(500).json({
      message: "Failed to add health record",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// READ - Get All Health Records
// GET /api/records
// --------------------------------------------------

app.get("/api/records", async (req, res) => {
  try {
    const records = await Health.find().sort({
      createdAt: -1,
    });

    res.status(200).json(records);
  } catch (error) {
    console.error("Get Records Error:", error);

    res.status(500).json({
      message: "Failed to fetch health records",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// READ - Get One Health Record
// GET /api/records/:id
// --------------------------------------------------

app.get("/api/records/:id", async (req, res) => {
  try {
    const record = await Health.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Health record not found",
      });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Get Record Error:", error);

    res.status(500).json({
      message: "Failed to fetch health record",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// UPDATE - Update Health Record
// PUT /api/records/:id
// --------------------------------------------------

app.put("/api/records/:id", async (req, res) => {
  try {
    const updatedRecord = await Health.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        message: "Health record not found",
      });
    }

    res.status(200).json({
      message: "Health record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    console.error("Update Record Error:", error);

    res.status(500).json({
      message: "Failed to update health record",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// DELETE - Delete Health Record
// DELETE /api/records/:id
// --------------------------------------------------

app.delete("/api/records/:id", async (req, res) => {
  try {
    const deletedRecord = await Health.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRecord) {
      return res.status(404).json({
        message: "Health record not found",
      });
    }

    res.status(200).json({
      message: "Health record deleted successfully",
    });
  } catch (error) {
    console.error("Delete Record Error:", error);

    res.status(500).json({
      message: "Failed to delete health record",
      error: error.message,
    });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Health Tracker Pro API is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});