import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useFileController } from 'contexts/FileContext';


const DonutComparisonChart = ({fileNo}) => {
  const { state } = useFileController();
  const { comparisonResult, selectedFilesToCompare } = state;
  const [tooltipBackgroundColor, setTooltipBackgroundColor] = useState('#ffffff'); 

  const fileProp = fileNo === 1 ? 'file1' : 'file2';
  const filledArray =[ ]

	if (comparisonResult) {
			comparisonResult.result[fileProp].clusters[0].message_instances.forEach((instance, i) => {
			  filledArray.push( instance.occurrence_percentage,
			  );
	
			});

		}

  const chartData = {
    series: [...filledArray],
    options: {
	// labels: [],
      chart: {
        width: 420,
        type: 'donut',
		events: {
			beforeMarkerShow: (event, chartContext, config) => {
			  const seriesIndex = config.seriesIndex;
			  const dataPointIndex = config.dataPointIndex;
			  const sliceColor = chartContext.w.config.series[seriesIndex].data[dataPointIndex].color;
			  setTooltipBackgroundColor(sliceColor);
			}
		  }
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
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: 'Clusters:'+ selectedFilesToCompare[fileNo-1]?.fileName,
      },
	  tooltip: {
	
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
         console.log("Wwwww ",w)
          const instanceIndex = dataPointIndex;
		  console.log("instanceIndex: ",instanceIndex)
		  console.log("dataPointIndex: ",dataPointIndex)
		  console.log("seriesIndex: ",seriesIndex)
		  console.log("clusters: ")
		  console.log(comparisonResult.result[`file${fileNo}`].clusters[0])
          const instance = comparisonResult.result[`file${fileNo}`].clusters[0].message_instances[seriesIndex];
		  console.log("instance: ",JSON.stringify(instance))
		  console.log("fields: ",JSON.stringify(instance.fields))
		 
		  console.log("series: ",JSON.stringify(series))
		  const formattedFields = instance?.fields.map(field => {
			const key = Object.keys(field)[0]; // Get the key of the field
			const value = field[key]; // Get the value of the field
			return `${key}: ${value}`;
		  }).join('<br>');
          return `
            <div style="padding: 8px;!important; background-color: ${w.globals.colors[seriesIndex]};">
              <div>Occurrence Percentage: ${instance?.occurrence_percentage.toFixed(2)}%</div>
              <div>Fields:</div>
              <div>${formattedFields}</div>
            </div>
          `;
        },
      }
	  ,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
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
