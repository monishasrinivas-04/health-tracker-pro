export const calculateHealthData = (weight, height, steps) => {
  const weightValue = parseFloat(weight);
  const heightValue = parseFloat(height) / 100;
  const stepsValue = parseInt(steps);

  if (!weightValue || !heightValue) {
    return null;
  }

  const bmiValue = (
    weightValue / (heightValue * heightValue)
  ).toFixed(2);

  const water = (weightValue * 0.033).toFixed(1);

  let fitnessStatus;
  let diet;
  let healthTip;

  if (bmiValue < 18.5) {
    fitnessStatus = "Underweight";

    diet =
      "High protein diet, nuts, milk, eggs, banana, peanut butter";

    healthTip =
      "Increase calorie intake and maintain proper sleep schedule.";
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    fitnessStatus = "Healthy";

    diet =
      "Balanced diet with fruits, vegetables, proteins, and whole grains";

    healthTip =
      "Maintain regular exercise and hydration.";
  } else {
    fitnessStatus = "Overweight";

    diet =
      "Low sugar diet, more vegetables, oats, salads, lean proteins";

    healthTip =
      "Walk daily, avoid junk food, and maintain calorie deficit.";
  }

  if (stepsValue < 5000) {
    healthTip =
      "Your daily activity is low. Try walking at least 8000 steps daily.";
  }

  return {
    bmi: bmiValue,
    waterIntake: water,
    fitnessStatus,
    diet,
    healthTip
  };
};