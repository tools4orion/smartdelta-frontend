import React from 'react';
import { Line } from 'react-chartjs-2';

const ErrorRateChart = ({ tableData }) => {
  const calculateErrorRates = (data) => {
    const correlationMap = new Map();
    const errorCountMap = new Map();

    for (const entry of data) {
      const correlationId = entry.correlationID;
      const statusCode = entry.statusCode;

      if (!correlationMap.has(correlationId)) {
        correlationMap.set(correlationId, []);
        errorCountMap.set(correlationId, 0);
      }

      const correlationData = correlationMap.get(correlationId);
      correlationData.push({ statusCode, subscriber: entry.subscriber });

      if (statusCode >= 400 && statusCode <= 499) {
        errorCountMap.set(correlationId, errorCountMap.get(correlationId) + 1);
      }
    }

    const correlationErrorRates = [];
    for (const [correlationId, correlationData] of correlationMap.entries()) {
      const totalRequests = correlationData.length;
      const errorCount = errorCountMap.get(correlationId);
      const errorRate = (errorCount / totalRequests) * 100;
      correlationErrorRates.push({ correlationId, errorRate, subscriber: correlationData[0].subscriber });
    }

    correlationErrorRates.sort((a, b) => b.errorRate - a.errorRate);

    return correlationErrorRates;
  };

  const errorRates = calculateErrorRates(tableData);

  const createFooter = (tooltipItems) => {
    const dataIndex = tooltipItems[0].dataIndex;
    const correlation = errorRates[dataIndex];
    const correlationId = correlation.correlationId;

    return `Correlation ID: ${correlationId}`;
  };

  const topCorrelations = errorRates.slice(0, 30);

  const chartOptions = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Clients',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          footer: createFooter,
        },
      },
    },
  };

  const chartData = {
    labels: topCorrelations.map((correlation) => correlation.subscriber),
    datasets: [
      {
        label: 'Error Rate',
        data: errorRates.map((correlation) => correlation.errorRate),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default ErrorRateChart;
