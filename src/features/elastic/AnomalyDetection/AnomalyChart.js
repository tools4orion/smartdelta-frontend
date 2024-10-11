import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { formatDate } from "utils/formatDate";
import { useLocation } from "react-router-dom";
import "./index.css";

const AnomalyChart = ({ data }) => {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const minDate = yesterday.getTime();
  const maxDate = today.getTime();

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 400,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: "datetime",
        min: minDate,
        max: maxDate,
        labels: {
          style: {
            colors: "#49a3f1",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#49a3f1",
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          console.log("TOOLTIP DATA");
          console.log(data);

          return (
            "<div class='tooltip'>" +
            "<ul>" +
            "<li><b>" +
            data.x +
            "</b></li>" +
            '<li class="bold" ><b>Score</b>:' +
            data.y[2] +
            "</li>" +
            "</ul>" +
            "</div>"
          );
        },
      },
    },
  });

  useEffect(() => {
    // Sample anomaly data
    const anomalies = [
      {
        anomaly: "Fewer log messages",
        anomaly_score: 99,
        dataSet: "unknown",
        win_start: "2024-01-31T12:00:00",
      },
      {
        anomaly: "Fewer log messages",
        anomaly_score: 85,
        dataSet: "unknown",
        win_start: "2024-01-31T02:45:00",
      },
      {
        anomaly: "Fewer log messages",
        anomaly_score: 33,
        dataSet: "unknown",
        win_start: "2024-01-31T00:45:00",
      },
      {
        anomaly: "Fewer log messages",
        anomaly_score: 27,
        dataSet: "unknown",
        win_start: "2024-01-31T02:30:00",
      },
      {
        anomaly: "Fewer log messages",
        anomaly_score: 17,
        dataSet: "unknown",
        win_start: "2024-01-31T01:00:00",
      },
    ];

    // Convert anomaly data into series for chart
    const seriesData = data?.map((anomaly) => ({
      x: "Anomaly",
      y: [
        new Date(anomaly.win_start).getTime(),
        new Date(anomaly.win_start).getTime() + 1000000, // 1 second later
        anomaly.score, // Use anomaly score as y value
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
  }, [data]); // Empty dependency array to ensure useEffect runs only once

  return (
    <div>
      <div id="chart">
        {data && data.length > 0 && (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="rangeBar"
            height={100}
          />
        )}
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AnomalyChart;
