import React from "react";
import { generateRandomColor } from "features/visualize/helpers/generateRandomColors";
import { Bar } from "react-chartjs-2";

const CorrelationLatency = ({ data }) => {
	const aggregatedData = {};
	data.forEach(entry => {
	  const { terminatingMS, latency } = entry;
	  if (!aggregatedData[terminatingMS]) {
		aggregatedData[terminatingMS] = { totalLatency: 0, count: 0 };
	  }
	  const latencyValue = parseInt(latency); // Convert "135ms" to 135
	  aggregatedData[terminatingMS].totalLatency += latencyValue;
	  aggregatedData[terminatingMS].count += 1;
	});
  
	const labels = Object.keys(aggregatedData);
	const averageLatencies = labels.map(
	  service =>
		aggregatedData[service].totalLatency / aggregatedData[service].count
	);
  
	// Chart.js data
	const chartData = {
	  labels: labels,
	  datasets: [
		{
		  label: "Average Latency",
		  data: averageLatencies,
		  backgroundColor: "rgba(75, 192, 192, 0.2)", // Adjust color as needed
		  borderColor: "rgba(75, 192, 192, 1)",
		  borderWidth: 1,
		},
	  ],
	};
  
	// Chart.js options
	const chartOptions = {
	  scales: {
		x: {
			title: {
			  display: true,
			  text: "Terminating Services",
			},
		  },
		y: {
		  beginAtZero: true,
		},
	  },
	};
  
	return <Bar data={chartData} options={chartOptions} />;
  };
  

export default CorrelationLatency;