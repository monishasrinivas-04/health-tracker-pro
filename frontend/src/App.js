import React, { useState } from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [steps, setSteps] = useState("");
  const [message, setMessage] = useState("");
  const [healthTip, setHealthTip] = useState("");
  const [diet, setDiet] = useState("");
  const [bmi, setBmi] = useState("");
  const [fitnessStatus, setFitnessStatus] = useState("");
  const [waterIntake, setWaterIntake] = useState("");

  const addRecord = async () => {

    try {

      await axios.post(
        "http://localhost:5000/addRecord",
        {
          name,
          age,
          weight,
          height,
          steps
        }
      );

      calculateHealthData();

      setMessage("Record Added Successfully");

    } catch (error) {

      console.log(error);

      setMessage("Backend Error");
    }
  };

  const calculateHealthData = () => {

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height) / 100;
    const stepsValue = parseInt(steps);

    const bmiValue = (
      weightValue / (heightValue * heightValue)
    ).toFixed(2);

    setBmi(bmiValue);

    const water = (weightValue * 0.033).toFixed(1);
    setWaterIntake(water);

    if (bmiValue < 18.5) {

      setFitnessStatus("Underweight");

      setDiet(
        "High protein diet, nuts, milk, eggs, banana, peanut butter"
      );

      setHealthTip(
        "Increase calorie intake and maintain proper sleep schedule."
      );

    } else if (bmiValue >= 18.5 && bmiValue < 25) {

      setFitnessStatus("Healthy");

      setDiet(
        "Balanced diet with fruits, vegetables, proteins, and whole grains"
      );

      setHealthTip(
        "Maintain regular exercise and hydration."
      );

    } else {

      setFitnessStatus("Overweight");

      setDiet(
        "Low sugar diet, more vegetables, oats, salads, lean proteins"
      );

      setHealthTip(
        "Walk daily, avoid junk food, and maintain calorie deficit."
      );
    }

    if (stepsValue < 5000) {
      setHealthTip(
        "Your daily activity is low. Try walking at least 8000 steps daily."
      );
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px"
      }}
    >

      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "25px",
          width: "450px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#f8fafc",
            marginBottom: "30px",
            letterSpacing: "1px"
          }}
        >
          Health Tracker Application
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter Daily Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={addRecord}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(to right, #7f5af0, #6246ea)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
            transition: "0.3s ease"
          }}
        >
          Add Record
        </button>

        <h3
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#cbd5e1"
          }}
        >
          {message}
        </h3>

        {bmi && (
          <div
            style={{
              marginTop: "25px",
              backgroundColor: "#334155",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f1f5f9"
            }}
          >

            <h2 style={{ color: "#a78bfa" }}>
              Health Report
            </h2>

            <p><strong>BMI:</strong> {bmi}</p>

            <p><strong>Fitness Status:</strong> {fitnessStatus}</p>

            <p><strong>Recommended Water Intake:</strong> {waterIntake} Litres/day</p>

            <p><strong>Diet Recommendation:</strong> {diet}</p>

            <p><strong>Health Tip:</strong> {healthTip}</p>

          </div>
        )}

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #475569",
  fontSize: "15px",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  outline: "none"
};

export default App;