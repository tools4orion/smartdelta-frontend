import React from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import getServiceTransactions from "../actions/getServiceTransactions";
import TextMobileStepper from "./Stepper";
import useLastPartOfUrl from "hooks/useLastPartOfUrl";
import { useMaterialUIController } from "contexts/UIContext";

const TransactionsChart = () => {
  const [durations, setDurations] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [stepperData, setStepperData] = useState(null);
  const [controller] = useMaterialUIController();
  const lastPartOfUrl = useLastPartOfUrl();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await getServiceTransactions(lastPartOfUrl);

        const durs = transactions
          .map(
            (item) => item.span?.duration?.us ?? item.transaction?.duration?.us
          )
          .filter((duration) => duration !== undefined);

        const tims = transactions
          .map((item) => new Date(item["@timestamp"]).getTime())
          .filter((timestamp) => !isNaN(timestamp));

        if (durs.length > 0 && tims.length > 0) {
          setDurations(durs);
          setTimestamps(tims);
        }

        const steps = transactions.map(
          (
            {
              destination,
              span,
              http,
              agent,
              data_stream,
              event,
              host,
              timestamp,
            },
            index
          ) => ({
            label: `Transaction ${index + 1}`,
            transactionInfo: {
              destination,
              span,
              http,
            },
            metadata: {
              agent,
              data_stream,
              event,
              host,
              timestamp,
            },
          })
        );

        setStepperData(steps);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (!stepperData) {
      fetchData();
    }
  }, [stepperData, lastPartOfUrl]);

  const { darkMode } = controller;

  const options = {
    chart: {
      id: "chartspan",
      type: "area",
      height: 180,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Transaction Analysis",
      align: "left",
      style: {
        color: darkMode ? "#FFFFFF" : "#000000",
      },
    },
    subtitle: {
      text: "Duration Movements",
      align: "left",
      style: {
        color: darkMode ? "#FFFFFF" : "#000000",
      },
    },
    xaxis: {
      type: "datetime",
      categories: timestamps,
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: darkMode ? "#FFFFFF" : "#000000",
          fontSize: "12px",
          fontWeight: "normal",
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        if (
          series &&
          series[seriesIndex] &&
          series[seriesIndex][dataPointIndex] !== undefined
        ) {
          return `<div class="tooltip">${series[seriesIndex][dataPointIndex]}</div>`;
        }
        return `<div class="tooltip">No Data</div>`;
      },
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return (
    <div id="chart-span">
      <ReactApexChart
        options={options}
        series={[{ name: "span duration", data: durations }]}
        type="area"
        height={180}
      />
      {stepperData && <TextMobileStepper steps={stepperData} />}
    </div>
  );
};

export default TransactionsChart;
