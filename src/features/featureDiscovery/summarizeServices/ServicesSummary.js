import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chip from "@mui/material/Chip";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "contexts/UIContext";

import { useFileController } from "contexts/FileContext";
import { useRawData } from "../useRawData";
import { calculateMicroserviceErrorRates } from "features/analyse/reports/DistributionErrorRate";
import { calculateTransactionsPerMinute } from "features/analyse/reports/DistributionErrorRate";
import { calculateMicroserviceMetrics } from "features/analyse/reports/DistributionErrorRate";

const randomizeArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const sparklineData = [45, 76, 12, 34, 56, 23, 45, 78, 32, 67, 89];

const ApexChart = () => {
  const { state: fileState } = useFileController();
  const { fileStateToView } = fileState ?? {};
  const directions = fileStateToView?.directions;
  const { tableData } = useRawData(directions, "", "", "asc");
  const microserviceErrorRates = calculateMicroserviceErrorRates(tableData);
  const res = calculateTransactionsPerMinute(tableData);
  console.log("TPM");
  console.log(res);
  const [controller, dispatch] = useMaterialUIController();

  const [state] = useState({
    series: [
      {
        data: randomizeArray(sparklineData),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0,
      },
      colors: ["#DCE6EC"],
      title: {
        text: "$424,652",
        offsetX: 0,
        style: {
          fontSize: "24px",
        },
      },
      subtitle: {
        text: "Sales",
        offsetX: 0,
        style: {
          fontSize: "14px",
        },
      },
    },

    seriesSpark2: [
      {
        data: randomizeArray(sparklineData),
      },
    ],
    optionsSpark2: {
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0,
      },
      colors: ["#DCE6EC"],
      title: {
        text: "$235,312",
        offsetX: 0,
        style: {
          fontSize: "24px",
        },
      },
      subtitle: {
        text: "Expenses",
        offsetX: 0,
        style: {
          fontSize: "14px",
        },
      },
    },

    seriesSpark3: [
      {
        data: randomizeArray(sparklineData),
      },
    ],
    optionsSpark3: {
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.3,
      },
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      yaxis: {
        min: 0,
      },
      title: {
        text: "$135,965",
        offsetX: 0,
        style: {
          fontSize: "24px",
        },
      },
      subtitle: {
        text: "Profits",
        offsetX: 0,
        style: {
          fontSize: "14px",
        },
      },
    },

    series1: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
    options1: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },

    series2: [
      {
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
      },
    ],
    options2: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
      colors: ["#FEB2B2"],
    },

    series3: [43, 32, 12, 9],
    options3: {
      chart: {
        type: "pie",
        width: 40,
        height: 40,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
      },
    },

    series4: [43, 32, 12, 9],
    options4: {
      chart: {
        type: "donut",
        width: 40,
        height: 40,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
      },
    },

    series5: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
    options5: {
      chart: {
        type: "bar",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
        },
      },
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },

    series6: [
      {
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
      },
    ],
    options6: {
      chart: {
        type: "bar",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
        },
      },
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },

    series7: [45],
    options7: {
      chart: {
        type: "radialBar",
        width: 50,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "50%",
          },
          track: {
            margin: 0,
          },
          dataLabels: {
            show: false,
          },
        },
      },
    },

    series8: [53, 67],
    options8: {
      chart: {
        type: "radialBar",
        width: 40,
        height: 40,
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "50%",
          },
          track: {
            margin: 1,
          },
          dataLabels: {
            show: false,
          },
        },
      },
    },
    options10: {
      chart: {
        type: "line",
        width: 100,
        height: 35,
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
      colors: ["#81E6D9"],
    },
  });

  const columns = [
    { Header: "Health", accessor: "health", align: "center" },
    { Header: "Name", accessor: "name", align: "center" },
    {
      Header: "Avg. Response Time",
      accessor: "avgResponseTime",
      align: "center",
    },
    { Header: "Trans. per min", accessor: "transPerMin", align: "center" },
    { Header: "Error Rate", accessor: "errorRate", align: "center" },
  ];
  const generateRow = ({
    health,
    name,
    avgResponseTime,
    transPerMin,
    errorRate,
  }) => {
    return {
      health: <Chip label={health.label} sx={health.sx} />,
      name: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {name}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      avgResponseTime: (
        <MDBox display="flex">
          <ReactApexChart
            options={avgResponseTime.options}
            series={avgResponseTime.series}
            type="area"
            height={35}
            width={100}
          />
          <MDTypography style={{ marginLeft: "16px" }}>
            {avgResponseTime.value}
          </MDTypography>
        </MDBox>
      ),
      transPerMin: (
        <MDBox display="flex">
          <ReactApexChart
            options={transPerMin.options}
            series={transPerMin.series}
            type="area"
            height={35}
            width={100}
          />
          <MDTypography style={{ marginLeft: "16px" }}>
            {transPerMin.value}
          </MDTypography>
        </MDBox>
      ),
      errorRate: (
        <MDBox display="flex">
          <ReactApexChart
            options={errorRate.options}
            series={errorRate.series}
            type="area"
            height={35}
            width={100}
          />
          <MDTypography variant="h7" style={{ marginLeft: "16px" }}>
            {errorRate.value}
          </MDTypography>
        </MDBox>
      ),
    };
  };

  const rowss = calculateMicroserviceMetrics(tableData);
  console.log(rowss);
  const rows = rowss.map(
    ({ microservice, latestErrorRate, errorRateData, tpmData }, index) =>
      generateRow({
        health: {
          label: "Healthy",
          sx: { backgroundColor: "#4caf50", color: "#fff" },
        },
        name: microservice,
        avgResponseTime: {
          options: state.options1,
          series: state.series1,
          value: "220 ms",
        },
        transPerMin: {
          options: state.options10,
          series: [{ data: tpmData }],
          value: "132.4 tpm",
        },
        errorRate: {
          options: state.options2,
          series: [{ data: errorRateData }],
          value: latestErrorRate + "%",
        },
      })
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </DashboardLayout>
  );
};

export default ApexChart;
