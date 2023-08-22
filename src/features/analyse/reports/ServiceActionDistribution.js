import { generateRandomColor } from 'features/visualize/helpers/generateRandomColors';
import {  Pie } from 'react-chartjs-2';
const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
  };

const ServiceActionDistribution = ({tableData}) => {
  // Calculate the counts of service action types
  const serviceActionCounts = tableData.reduce((counts, row) => {
	const serviceAction = row.serviceAction;
	counts[serviceAction] = (counts[serviceAction] || 0) + 1;
	return counts;
  }, {});
  
  // Calculate the total count
  const totalCountActions = Object.values(serviceActionCounts).reduce((sum, count) => sum + count, 0);
  
  // Generate the pie chart data
  const pieChartData = {
	labels: Object.keys(serviceActionCounts),
	datasets: [
	  {
		data: Object.values(serviceActionCounts).map(count => (count / totalCountActions) * 100),
		backgroundColor: Object.keys(serviceActionCounts).map(() => generateRandomColor()), // Customize the background colors
	  },
	],
  };
  
	return (
		<Pie data={pieChartData} options={chartOptions} />
	)

};

export default ServiceActionDistribution;