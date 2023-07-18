import React from 'react';
import {   Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

const createDataset = (statusData, label, color) => {
	return {
	  label: label,
	  data: statusData.map(({ timestamp, statusCode }) => ({
		x: new Date(timestamp),
		y: statusCode,
	  })),
	  pointRadius: 3,
	  backgroundColor: color,
	};
  };

const MessagingTimeSeriesChart = ({ tableData }) => {
	const timestamps = tableData.map(item => new Date(item.timestamp));
	// Filter by status code
	const status200 = tableData.filter((item) => item.statusCode === '200');
	const status201 = tableData.filter((item) => item.statusCode === '201');
	const status400 = tableData.filter((item) => item.statusCode ==='400');
	const status404 = tableData.filter((item) => item.statusCode === '404');

	 // Creating an array of data points for the chart
	 const chartData = {
		labels: timestamps,
		datasets: [
			createDataset(status200, '200 Status', 'green'),
			createDataset(status201, '201 Status', 'teal'),
			createDataset(status400, '400 Status', '#FEB2B2'),
			createDataset(status404, '404 Status', 'red'),
		  ],
	  };
	
	 // Customizing the chart options
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
		},
		plugins: {
		  legend: {
			display: true,
		  },
		}
	  };

  return <Scatter data={chartData} options={chartOptions} />;
};

export default MessagingTimeSeriesChart;
