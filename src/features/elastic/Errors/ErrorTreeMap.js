import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './index.css';
import genMeaningfulTitle from './genMeaningfulTitle';

const ErrorTreeMap = ({ errors }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      legend: { show: false },
      chart: { height: 350, type: 'treemap' },
      title: { text: 'Distribution of Errors', align: 'center' },
      colors: [
        '#3B93A5',
        '#F7B844',
        '#ADD8C7',
        '#EC3C65',
        '#CDD7B6',
        '#C1F666',
        '#D43F97',
        '#1E5D8C',
        '#421243',
        '#7F94B0',
        '#EF6537',
        '#C0ADDB'
      ],
      plotOptions: { treemap: { distributed: true, enableShades: false,  } }
    }
  });

  // Process errors data and create series for treemap
  const processErrorsData = () => {
    const groupedErrors = {};
    errors?.forEach(error => {
      const { grouping_name } = error.error;
      if (!groupedErrors[grouping_name]) {
        groupedErrors[grouping_name] = 1;
      } else {
        groupedErrors[grouping_name]++;
      }
    });

    const seriesData = Object.entries(groupedErrors).map(([grouping_name, count], index) => ({
      x: `${grouping_name.substring(0,25)}...`,
      y: count
    }));

    setChartData(prevState => ({
      ...prevState,
      series: [{ data: seriesData }]
    }));
  };

  // Call processErrorsData when errors prop changes
  React.useEffect(() => {
    processErrorsData();
  }, [errors]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="treemap" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ErrorTreeMap;
