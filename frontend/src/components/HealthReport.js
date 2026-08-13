import React from "react";

function HealthReport({
  bmi,
  fitnessStatus,
  waterIntake,
  diet,
  healthTip
}) {
  if (!bmi) {
    return null;
  }

  return (
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
      <h2
        style={{
          color: "#a78bfa",
          marginTop: 0
        }}
      >
        Health Report
      </h2>

      <p>
        <strong>BMI:</strong> {bmi}
      </p>

      <p>
        <strong>Fitness Status:</strong> {fitnessStatus}
      </p>

      <p>
        <strong>Recommended Water Intake:</strong>{" "}
        {waterIntake} Litres/day
      </p>

      <p>
        <strong>Diet Recommendation:</strong>{" "}
        {diet}
      </p>

      <p>
        <strong>Health Tip:</strong>{" "}
        {healthTip}
      </p>
    </div>
  );
}

export default HealthReport;