import React, { useMemo, useState } from "react";

const metrics = {
  weight: {
    label: "Weight",
    unit: "kg",
    colorClass: "trend-weight"
  },
  bmi: {
    label: "BMI",
    unit: "",
    colorClass: "trend-bmi"
  },
  steps: {
    label: "Steps",
    unit: "",
    colorClass: "trend-steps"
  }
};

function HealthTrends({ records }) {
  const [selectedMetric, setSelectedMetric] =
    useState("weight");

  const metric = metrics[selectedMetric];

  const chartData = useMemo(() => {
    return [...records]
      .filter((record) => {
        const value = Number(record[selectedMetric]);
        return Number.isFinite(value);
      })
      .sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      )
      .map((record) => ({
        id: record._id,
        value: Number(record[selectedMetric]),
        date: record.createdAt
          ? new Date(record.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short"
              }
            )
          : "—"
      }));
  }, [records, selectedMetric]);

  if (chartData.length === 0) {
    return (
      <section className="trends-container">
        <div className="trends-heading">
          <div>
            <h2>Health Trends</h2>
            <p>
              Your health progress over time.
            </p>
          </div>
        </div>

        <div className="no-trend-data">
          No data available for {metric.label}.
        </div>
      </section>
    );
  }

  const chartWidth = 760;
  const chartHeight = 300;

  const padding = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 60
  };

  const plotWidth =
    chartWidth -
    padding.left -
    padding.right;

  const plotHeight =
    chartHeight -
    padding.top -
    padding.bottom;

  const values = chartData.map(
    (item) => item.value
  );

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const range = maxValue - minValue;

  const safeRange =
    range === 0 ? 1 : range;

  const chartMin =
    selectedMetric === "steps"
      ? 0
      : minValue - safeRange * 0.1;

  const chartMax =
    maxValue + safeRange * 0.1;

  const getX = (index) => {
    if (chartData.length === 1) {
      return padding.left + plotWidth / 2;
    }

    return (
      padding.left +
      (index / (chartData.length - 1)) *
        plotWidth
    );
  };

  const getY = (value) => {
    return (
      padding.top +
      ((chartMax - value) /
        (chartMax - chartMin)) *
        plotHeight
    );
  };

  const points = chartData
    .map(
      (item, index) =>
        `${getX(index)},${getY(item.value)}`
    )
    .join(" ");

  const gridLines = 4;

  return (
    <section className="trends-container">
      <div className="trends-heading">
        <div>
          <h2>Health Trends</h2>
          <p>
            Your {metric.label.toLowerCase()} progress
            over time.
          </p>
        </div>

        <div className="metric-selector">
          {Object.entries(metrics).map(
            ([key, item]) => (
              <button
                key={key}
                className={
                  selectedMetric === key
                    ? "metric-button active"
                    : "metric-button"
                }
                onClick={() =>
                  setSelectedMetric(key)
                }
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="trend-chart-wrapper">
        <svg
          className="trend-chart"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
        >
          {Array.from(
            { length: gridLines + 1 },
            (_, index) => {
              const y =
                padding.top +
                (index / gridLines) *
                  plotHeight;

              const value =
                chartMax -
                (index / gridLines) *
                  (chartMax - chartMin);

              return (
                <g key={index}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    className="chart-grid-line"
                  />

                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="chart-axis-label"
                  >
                    {selectedMetric === "steps"
                      ? Math.max(
                          0,
                          Math.round(value)
                        ).toLocaleString()
                      : value.toFixed(1)}
                  </text>
                </g>
              );
            }
          )}

          <polyline
            points={points}
            className={`trend-line ${metric.colorClass}`}
            fill="none"
          />

          {chartData.map(
            (item, index) => (
              <g key={item.id}>
                <circle
                  cx={getX(index)}
                  cy={getY(item.value)}
                  r="5"
                  className={`trend-point ${metric.colorClass}`}
                />

                {(
                  index === 0 ||
                  index ===
                    chartData.length - 1 ||
                  chartData.length <= 6
                ) && (
                  <text
                    x={getX(index)}
                    y={
                      chartHeight -
                      padding.bottom +
                      25
                    }
                    textAnchor="middle"
                    className="chart-date-label"
                  >
                    {item.date}
                  </text>
                )}
              </g>
            )
          )}
        </svg>
      </div>

      <div className="trend-summary">
        <div>
          <span>Latest</span>

          <strong>
            {chartData[
              chartData.length - 1
            ].value.toLocaleString(
              undefined,
              {
                maximumFractionDigits:
                  selectedMetric === "steps"
                    ? 0
                    : 2
              }
            )}

            {metric.unit &&
              ` ${metric.unit}`}
          </strong>
        </div>

        <div>
          <span>Records</span>

          <strong>
            {chartData.length}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default HealthTrends;