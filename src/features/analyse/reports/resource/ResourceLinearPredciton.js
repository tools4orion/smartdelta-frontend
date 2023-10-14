import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
} from 'chart.js';
import {  Line } from 'react-chartjs-2';
import analysisEndpoints from 'network/endpoints/analysis';
import MDTypography from 'components/MDTypography';
import { Stack, Skeleton } from '@mui/material';
import FadeIn from 'hooks/FadeIn';
import './override.css';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const ResourceLinearPrediction = () => {
  const [chartData, setChartData] = useState(null);
  const [ predictionText, setPredictionText] = useState(null);
  const [loading, setLoading] = useState(true); 

 const getColorBasedOnProbability = (probability) => {
  // Adjust these values based on the desired color range
  const minColor = 30; // Darker orange
  const maxColor = 200; // Lighter orange

  // Map the probability to the color range
  const colorIntensity = minColor + (maxColor - minColor) * probability;

  // Return the rgba string for the color
  return `rgba(255, ${colorIntensity}, 0, 0.5)`;
};
  const options = {
	maintainAspectRatio:false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
        min: 0,
        // You may want to adjust the max value based on your data
        max: 100,
      },
    },
  };

  const fetchData = async () => {
    try {
      const chartData = await analysisEndpoints.getResourcePrediction();
      const validJsonString = chartData.data[0].replace(/'/g, '"');
      const jsonData = JSON.parse(validJsonString);
	  console.log(jsonData)

      const rawDataSet = {
        type: 'line',
        label: 'Raw Data',
        borderColor: 'rgb(169, 169, 169)',
        borderWidth: 0.20,
        fill: false,
        data: jsonData.raw_data.times.map((time, index) => ({
          x: time,
          y: jsonData.raw_data.values[index],
        })),
      };

      const meanDataSet = {
        type: 'line',
        label: 'Mean Values',
        borderColor: 'rgb(0, 0, 255)',
        borderWidth: 6,
        fill: false,
        data: jsonData.mean_values.times.map((time, index) => ({
          x: time,
          y: jsonData.mean_values.values[index],
        })),
      };

	  const predictionLineDataSet = {
        type: 'line',
        label: 'Prediction Line',
        backgroundColor: 'rgb(255, 255, 0)',
        data: jsonData.prediction_line.times.map((time, index) => ({
          x: time,
          y: jsonData.prediction_line.values[index],
        })),
      };

	  const warningBoxesDataSet =  {
		type: 'scatter',
		label: 'Warning Probability',
		backgroundColor: jsonData.warning_distribution.values.map(( index) =>  getColorBasedOnProbability(
			jsonData.warning_distribution.values[index]
		  ),),
		radius: 11,
		borderWidth: 2,
		data: jsonData.warning_distribution.times.map((time, index) => ({
		  x: time,
		  y: jsonData.WARNING_VALUE,
		   // Adjust the radius as needed
		})),
	  };
	

      // Adding a horizontal line annotation
	  const warningLine = {
		type: 'line',
		scaleID: 'y',
		data: [
		  { x: 0, y: jsonData.WARNING_VALUE },
		  { x: 1000, y: jsonData.WARNING_VALUE },
		],
		borderColor: 'red',
		borderWidth: 2,
		label: 'Warning Line',
	  };
      setChartData({
        datasets: [rawDataSet, meanDataSet, warningLine, warningBoxesDataSet,predictionLineDataSet],

      });
	  const predictionLineData = jsonData.prediction_line;

// Find the first index where the value is greater than or equal to 90
const indexOfFirstValueAbove90 = predictionLineData.values.findIndex(value => value >= 90);

// If an index is found, get the corresponding time value
const firstTimeAbove90 = indexOfFirstValueAbove90 !== -1 ? predictionLineData.times[indexOfFirstValueAbove90] : null;
setLoading(false);  
setPredictionText(`Prediction: Warning  Level at ${firstTimeAbove90.toFixed(2)}`);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
	  setLoading(false);  
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <Stack spacing={2} sx={{paddingTop:2 }}>
	 {loading && <><Skeleton variant="rectangular" width={324} height={300} sx={{backgroundColor: '#2A4365'}} /> <Skeleton variant="rectangular" width={324} height={26} sx={{	backgroundColor: '#2A4365'}} /></>} 
	<FadeIn>
	 <div  style={{ height:300}}>
   {chartData && !loading && (
        <Line height={null} width={null}
 data={{ datasets: chartData.datasets }} options={options} plugins={[{ id: 'annotation', options: chartData.annotations }]} />
      )}
	  <MDTypography variant="h6" sx={{paddingTop:2}}>
	  {predictionText}
	  </MDTypography>
	  </div>
	  </FadeIn>
    </Stack>
  );
};

export default ResourceLinearPrediction;
