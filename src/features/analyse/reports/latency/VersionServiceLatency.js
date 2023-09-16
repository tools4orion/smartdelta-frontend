import { generateRandomColor } from 'features/visualize/helpers/generateRandomColors';
import React from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

const VersionServiceLatency = ({ data, chartType }) => {
  // Filter out 'Missing Pair' values
  const filteredData = data.filter(entry => entry.latency !== 'Missing Pair');
  const parseLatency = latencyString => parseInt(latencyString.replace('ms', ''));
  const versions = [...new Set(filteredData.map(entry => entry.version))];

  const datasets = versions.map(version => {
    const versionData = filteredData
      .filter(entry => entry.version === version)
      .map(entry => parseLatency(entry.latency)); // Parse the latency value

   
	const getRandomColor = () => {
		const colors = ["#FFB74D", "#AED581", "#81C784", "#4DB6AC", "#4DD0E1", "#64B5F6", "#55ffe1", '#ab20fd', "#F06292"];
		return colors[Math.floor(Math.random() * colors.length)];
	  };
	const borderColor = getRandomColor();
	//getRandomColor();

    return {
      label: `Version ${version}`,
      data: versionData,
      borderColor: borderColor,
    };
  });

  const chartData = {
    labels: filteredData.map(entry => new Date(entry.timestamp)),
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'mmm dd, yyyy @ hh:mm:ss.sss',
        },
        ticks: {
          maxRotation: 120,
          minRotation: 60,
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Latency (ms)',
        },
        suggestedMin: 0,   // Set the minimum value of the y-axis
        suggestedMax: 1200, // Set the maximum value of the y-axis
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  console.log(chartData);

  return (
    chartType === 'line' ? (
      <Line data={chartData} options={chartOptions} />
    ) : (
      <Scatter data={chartData} options={chartOptions} />
    )
  );
};

export default VersionServiceLatency;
