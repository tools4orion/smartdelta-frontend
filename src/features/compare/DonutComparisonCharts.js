import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useFileController } from "contexts/FileContext";
import { useMaterialUIController } from "contexts/UIContext";

const DonutComparisonChart = ({ fileNo }) => {
  const { state } = useFileController();
  const { comparisonResult, selectedFilesToCompare } = state;
  const [controller, _] = useMaterialUIController();
  const { darkMode } = controller;
  const [tooltipBackgroundColor, setTooltipBackgroundColor] =
    useState("#ffffff");

  const fileProp = fileNo === 1 ? "file1" : "file2";
  const filledArray = [];

  if (comparisonResult) {
    comparisonResult.result[fileProp].clusters[0].message_instances.forEach(
      (instance, i) => {
        filledArray.push(instance.occurrence_percentage);
      }
    );
  }

  const chartData = {
    series: [...filledArray],
    options: {
      chart: {
        width: 420,
        type: "donut",
        events: {
          beforeMarkerShow: (event, chartContext, config) => {
            const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            const sliceColor =
              chartContext.w.config.series[seriesIndex].data[dataPointIndex]
                .color;
            setTooltipBackgroundColor(sliceColor);
          },
        },
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
        labels: {
          colors: darkMode ? "#ffffff" : "#000000",
        },
      },
      title: {
        text: "Clusters: " + selectedFilesToCompare[fileNo - 1]?.fileName,
        style: {
          color: darkMode ? "#ffffff" : "#000000",
          fontSize: "16px",
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const instanceIndex = dataPointIndex;
          const instance =
            comparisonResult.result[`file${fileNo}`].clusters[0]
              .message_instances[seriesIndex];

          const formattedFields = instance?.fields
            .map((field) => {
              const key = Object.keys(field)[0];
              const value = field[key];
              return `${key}: ${value}`;
            })
            .join("<br>");
          return `
          <div style="padding: 8px; background-color: ${
            w.globals.colors[seriesIndex]
          };">
            <div>Occurrence Percentage: ${instance?.occurrence_percentage.toFixed(
              2
            )}%</div>
            <div>Fields:</div>
            <div>${formattedFields}</div>
          </div>
        `;
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div id="chart">
        {comparisonResult && (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            width={420}
          />
        )}
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutComparisonChart;
