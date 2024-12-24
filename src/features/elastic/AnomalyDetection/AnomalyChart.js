import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./index.css";

const AnomalyChart = ({ data }) => {
  // const today = new Date();

  // const yesterday = new Date(today);
  // yesterday.setDate(today.getDate() - 1);

  // const minDate = yesterday.getTime();
  // const maxDate = today.getTime();
  const [chartData, setChartData] = useState({
    series: [{ data: [] }],
    options: {
      chart: {
        height: 200,
        type: "rangeBar",
        zoom: { enabled: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "100%",
        },
      },
      xaxis: {
        type: "datetime",
        // min: minDate,
        // max: maxDate,
        labels: {
          style: {
            colors: "#49a3f1",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: () => "Anomalies",
          style: {
            colors: "#49a3f1",
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const tooltipData =
            w.globals.initialSeries[seriesIndex]?.data[dataPointIndex];
          if (!tooltipData) return "<div>No Data Available</div>";

          return `
            <div class="tooltip">
              <ul>
                <li><b>Anomaly Score:</b> ${tooltipData.y[2]}</li>
              </ul>
            </div>`;
        },
      },
    },
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData((prevState) => ({
        ...prevState,
        series: [{ data: [] }],
      }));
      return;
    }

    const seriesData = data.map((anomaly) => ({
      x: "Anomalies",
      y: [
        new Date(anomaly.win_start).getTime(),
        new Date(anomaly.win_end).getTime(),
        anomaly.score,
      ],
      fillColor: (() => {
        if (anomaly.score >= 75) {
          return "#FF0000";
        } else if (anomaly.score >= 50) {
          return "#FFA500";
        } else if (anomaly.score >= 25) {
          return "#FFFF00";
        } else if (anomaly.score >= 3) {
          return "#0000FF";
        } else {
          return "#FFFFFF";
        }
      })(),
    }));

    setChartData((prevState) => ({
      ...prevState,
      series: [{ data: seriesData }],
    }));
  }, [data]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="rangeBar"
        height={200}
      />
    </div>
  );
};

export default AnomalyChart;
