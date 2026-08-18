import React, { useEffect, useState } from "react";
import axios from "axios";

function HealthHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/records"
      );

      setRecords(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching records:", error);
      setError("Unable to load health history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  if (loading) {
    return (
      <div className="history-container">
        <p>Loading health history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <div>
          <h2>Health History</h2>
          <p>Track your health records over time.</p>
        </div>

        <div className="record-count">
          {records.length} Records
        </div>
      </div>

      {records.length === 0 ? (
        <div className="empty-history">
          <h3>No health records yet</h3>
          <p>
            Add your first health record to start tracking
            your progress.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="health-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight</th>
                <th>BMI</th>
                <th>Steps</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>
                    {record.createdAt
                      ? new Date(
                          record.createdAt
                        ).toLocaleDateString()
                      : "—"}
                  </td>

                  <td>
                    {record.weight
                      ? `${record.weight} kg`
                      : "—"}
                  </td>

                  <td>
                    {record.bmi
                      ? Number(record.bmi).toFixed(2)
                      : "—"}
                  </td>

                  <td>
                    {record.steps
                      ? Number(record.steps).toLocaleString()
                      : "—"}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        record.fitnessStatus
                          ? record.fitnessStatus.toLowerCase()
                          : "unknown"
                      }`}
                    >
                      {record.fitnessStatus || "Not available"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HealthHistory;