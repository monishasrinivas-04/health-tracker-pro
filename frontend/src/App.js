import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import HealthForm from "./components/HealthForm";
import HealthReport from "./components/HealthReport";
import HealthHistory from "./components/HealthHistory";
import HealthDashboard from "./components/HealthDashboard";
import HealthTrends from "./components/HealthTrends";

import { calculateHealthData } from "./utils/healthCalculations";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [steps, setSteps] = useState("");

  const [message, setMessage] = useState("");
  const [healthData, setHealthData] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  const [records, setRecords] = useState([]);

  // Tracks whether Add or Update is currently running
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all records
  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/records"
      );

      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
      setMessage("Unable to load health records.");
    }
  };

  // Load records when application starts
  useEffect(() => {
    fetchRecords();
  }, []);

  const resetForm = () => {
    setName("");
    setAge("");
    setWeight("");
    setHeight("");
    setSteps("");
    setHealthData(null);
    setEditingRecord(null);
  };

  // CREATE
  const addRecord = async () => {
    setIsSubmitting(true);

    try {
      const calculatedData = calculateHealthData(
        weight,
        height,
        steps
      );

      if (!calculatedData) {
        setMessage(
          "Please enter valid weight and height."
        );
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

      await fetchRecords();

      setHealthData(calculatedData);
      setMessage("Record Added Successfully");

      resetForm();
    } catch (error) {
      console.error(error);
      setMessage("Backend Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start editing
  const startEditing = (record) => {
    setEditingRecord(record);

    setName(record.name || "");
    setAge(record.age || "");
    setWeight(record.weight || "");
    setHeight(record.height || "");
    setSteps(record.steps || "");

    setHealthData({
      bmi: record.bmi,
      waterIntake: record.waterIntake,
      fitnessStatus: record.fitnessStatus,
      diet: record.diet,
      healthTip: record.healthTip
    });

    setMessage("Editing health record");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // UPDATE
  const updateRecord = async () => {
    setIsSubmitting(true);

    try {
      const calculatedData = calculateHealthData(
        weight,
        height,
        steps
      );

      if (!calculatedData) {
        setMessage(
          "Please enter valid weight and height."
        );
        return;
      }

      await axios.put(
        `http://localhost:5000/api/records/${editingRecord._id}`,
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

      await fetchRecords();

      setHealthData(calculatedData);
      setMessage("Record Updated Successfully");

      resetForm();
    } catch (error) {
      console.error(error);
      setMessage(
        "Unable to update health record."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE
  const deleteRecord = async (recordId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/records/${recordId}`
      );

      setRecords((currentRecords) =>
        currentRecords.filter(
          (record) => record._id !== recordId
        )
      );

      setMessage("Record Deleted Successfully");

      if (
        editingRecord &&
        editingRecord._id === recordId
      ) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Unable to delete health record."
      );
    }
  };

  const handleSubmit = () => {
    if (editingRecord) {
      updateRecord();
    } else {
      addRecord();
    }
  };

  const cancelEdit = () => {
    resetForm();
    setMessage("Edit cancelled");
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

        <HealthDashboard records={records} />

        <HealthTrends records={records} />

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
          onSubmit={handleSubmit}
          isEditing={Boolean(editingRecord)}
          isSubmitting={isSubmitting}
          onCancel={cancelEdit}
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
          records={records}
          onEdit={startEditing}
          onDelete={deleteRecord}
        />
      </div>
    </div>
  );
}

export default App;