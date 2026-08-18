import React from "react";

function HealthForm({
  name,
  age,
  weight,
  height,
  steps,
  setName,
  setAge,
  setWeight,
  setHeight,
  setSteps,
  onSubmit,
  isEditing,
  onCancel
}) {
  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #475569",
    fontSize: "15px",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    outline: "none",
    boxSizing: "border-box"
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Enter Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Enter Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Enter Daily Steps"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={onSubmit}
        style={{
          width: "100%",
          padding: "14px",
          background: isEditing
            ? "linear-gradient(to right, #0ea5e9, #2563eb)"
            : "linear-gradient(to right, #7f5af0, #6246ea)",
          color: "#ffffff",
          border: "none",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        {isEditing ? "Update Health Record" : "Add Health Record"}
      </button>

      {isEditing && (
        <button
          onClick={onCancel}
          style={{
            width: "100%",
            padding: "12px",
            background: "transparent",
            color: "#94a3b8",
            border: "1px solid #475569",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Cancel Edit
        </button>
      )}
    </>
  );
}

export default HealthForm;