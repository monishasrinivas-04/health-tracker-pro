import React from "react";

function HealthDashboard({ records }) {
  const latestRecord = records.length > 0
    ? records[0]
    : null;

  const recordCount = records.length;

  if (!latestRecord) {
    return (
      <div className="dashboard-empty">
        <h2>Welcome to Health Tracker Pro</h2>
        <p>
          Add your first health record to see your
          health dashboard.
        </p>
      </div>
    );
  }

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Your Health Overview</h2>
          <p>
            Here's a snapshot of your latest health
            information.
          </p>
        </div>

        <div className="record-count">
          {recordCount} Records
        </div>
      </div>

      <div className="stats-grid">

        {/* BMI */}
        <div className="stat-card">
          <div className="stat-icon">⚖️</div>

          <div>
            <p className="stat-label">BMI</p>

            <h3>
              {latestRecord.bmi
                ? Number(latestRecord.bmi).toFixed(2)
                : "—"}
            </h3>

            <span className="stat-status">
              {latestRecord.fitnessStatus ||
                "Not available"}
            </span>
          </div>
        </div>

        {/* Weight */}
        <div className="stat-card">
          <div className="stat-icon">💪</div>

          <div>
            <p className="stat-label">Weight</p>

            <h3>
              {latestRecord.weight
                ? `${latestRecord.weight} kg`
                : "—"}
            </h3>

            <span className="stat-status">
              Latest record
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="stat-card">
          <div className="stat-icon">🚶</div>

          <div>
            <p className="stat-label">Daily Steps</p>

            <h3>
              {latestRecord.steps
                ? Number(
                    latestRecord.steps
                  ).toLocaleString()
                : "—"}
            </h3>

            <span className="stat-status">
              Activity level
            </span>
          </div>
        </div>

        {/* Water */}
        <div className="stat-card">
          <div className="stat-icon">💧</div>

          <div>
            <p className="stat-label">Water Intake</p>

            <h3>
              {latestRecord.waterIntake
                ? `${latestRecord.waterIntake} L`
                : "—"}
            </h3>

            <span className="stat-status">
              Recommended
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HealthDashboard;