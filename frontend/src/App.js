import React, { useState } from "react";
import axios from "axios";

import "./App.css";

import HealthForm from "./components/HealthForm";
import HealthReport from "./components/HealthReport";
import HealthHistory from "./components/HealthHistory";
import { calculateHealthData } from "./utils/healthCalculations";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [steps, setSteps] = useState("");

  const [message, setMessage] = useState("");
  const [healthData, setHealthData] = useState(null);

  const addRecord = async () => {
    try {
      const calculatedData = calculateHealthData(
        weight,
        height,
        steps
      );

      if (!calculatedData) {
        setMessage("Please enter valid weight and height.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/records",
        {
          name,
          age,
          weight,
          height,
          steps,
          bmi: calculatedData.bmi,
          waterIntake: calculatedData.waterIntake,
          fitnessStatus: calculatedData.fitnessStatus,
          diet: calculatedData.diet,
          healthTip: calculatedData.healthTip
        }
      );

      setHealthData(calculatedData);
      setMessage("Record Added Successfully");
    } catch (error) {
      console.log(error);
      setMessage("Backend Error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "Arial",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "25px",
          width: "900px",
          maxWidth: "100%",
          boxShadow:
            "0px 10px 30px rgba(0,0,0,0.4)",
          border:
            "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#f8fafc",
            marginBottom: "10px",
            letterSpacing: "1px"
          }}
        >
          Health Tracker Pro
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px"
          }}
        >
          Track your health. Understand your progress.
        </p>

        <HealthForm
          name={name}
          age={age}
          weight={weight}
          height={height}
          steps={steps}
          setName={setName}
          setAge={setAge}
          setWeight={setWeight}
          setHeight={setHeight}
          setSteps={setSteps}
          onSubmit={addRecord}
        />

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.includes("Successfully")
                ? "#4ade80"
                : "#f87171",
              fontWeight: "bold",
              marginTop: "20px"
            }}
          >
            {message}
          </p>
        )}

        <HealthReport
          bmi={healthData?.bmi}
          fitnessStatus={healthData?.fitnessStatus}
          waterIntake={healthData?.waterIntake}
          diet={healthData?.diet}
          healthTip={healthData?.healthTip}
        />

        <HealthHistory
  onDelete={() => {
    console.log("Record deleted successfully");
  }}
/>
      </div>
    </div>
  );
}

export default App;