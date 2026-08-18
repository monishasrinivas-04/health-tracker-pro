import React, { useState } from "react";

function HealthForm({
  name,
  age,
  isSubmitting,
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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Age
    const ageValue = Number(age);

    if (!age) {
      newErrors.age = "Age is required.";
    } else if (
      !Number.isInteger(ageValue) ||
      ageValue < 1 ||
      ageValue > 120
    ) {
      newErrors.age =
        "Please enter an age between 1 and 120.";
    }

    // Weight
    const weightValue = Number(weight);

    if (!weight) {
      newErrors.weight = "Weight is required.";
    } else if (
      !Number.isFinite(weightValue) ||
      weightValue <= 0
    ) {
      newErrors.weight =
        "Weight must be greater than 0.";
    }

    // Height
    const heightValue = Number(height);

    if (!height) {
      newErrors.height = "Height is required.";
    } else if (
      !Number.isFinite(heightValue) ||
      heightValue < 50 ||
      heightValue > 250
    ) {
      newErrors.height =
        "Please enter a height between 50 and 250 cm.";
    }

    // Steps
    const stepsValue = Number(steps);

    if (steps === "") {
      newErrors.steps = "Daily steps are required.";
    } else if (
      !Number.isInteger(stepsValue) ||
      stepsValue < 0 ||
      stepsValue > 100000
    ) {
      newErrors.steps =
        "Steps must be between 0 and 100,000.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((currentErrors) => {
        const updatedErrors = {
          ...currentErrors
        };

        delete updatedErrors[field];

        return updatedErrors;
      });
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px",
    marginBottom: errors[field] ? "6px" : "15px",
    borderRadius: "12px",
    border: errors[field]
      ? "1px solid #f87171"
      : "1px solid #475569",
    fontSize: "15px",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    outline: "none",
    boxSizing: "border-box"
  });

  const errorStyle = {
    color: "#f87171",
    fontSize: "13px",
    margin: "0 0 12px 4px"
  };

  return (
    <>
      {/* Name */}
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          clearError("name");
        }}
        style={inputStyle("name")}
      />

      {errors.name && (
        <p style={errorStyle}>{errors.name}</p>
      )}

      {/* Age */}
      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        min="1"
        max="120"
        onChange={(e) => {
          setAge(e.target.value);
          clearError("age");
        }}
        style={inputStyle("age")}
      />

      {errors.age && (
        <p style={errorStyle}>{errors.age}</p>
      )}

      {/* Weight */}
      <input
        type="number"
        placeholder="Enter Weight (kg)"
        value={weight}
        min="0.1"
        step="0.1"
        onChange={(e) => {
          setWeight(e.target.value);
          clearError("weight");
        }}
        style={inputStyle("weight")}
      />

      {errors.weight && (
        <p style={errorStyle}>{errors.weight}</p>
      )}

      {/* Height */}
      <input
        type="number"
        placeholder="Enter Height (cm)"
        value={height}
        min="50"
        max="250"
        onChange={(e) => {
          setHeight(e.target.value);
          clearError("height");
        }}
        style={inputStyle("height")}
      />

      {errors.height && (
        <p style={errorStyle}>{errors.height}</p>
      )}

      {/* Steps */}
      <input
        type="number"
        placeholder="Enter Daily Steps"
        value={steps}
        min="0"
        max="100000"
        onChange={(e) => {
          setSteps(e.target.value);
          clearError("steps");
        }}
        style={inputStyle("steps")}
      />

      {errors.steps && (
        <p style={errorStyle}>{errors.steps}</p>
      )}

      {/* Submit */}
      <button
  onClick={handleSubmit}
  disabled={isSubmitting}
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
    cursor: isSubmitting
      ? "not-allowed"
      : "pointer",
    marginTop: "10px",
    opacity: isSubmitting ? 0.7 : 1
  }}
>
  {isSubmitting
    ? isEditing
      ? "Updating..."
      : "Saving..."
    : isEditing
      ? "Update Health Record"
      : "Add Health Record"}
</button>

      {/* Cancel */}
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