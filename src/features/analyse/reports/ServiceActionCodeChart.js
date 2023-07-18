import { Bar } from 'react-chartjs-2';

const ServiceActionCodeChart = ({ tableData }) => {
  // Initialize the count map
  const counts = new Map();

   // Iterate over the data and count occurrences of  status codes according to service action
  tableData.forEach((row) => {
    const serviceAction = row.serviceAction;
    const statusCode = row.statusCode;

    if (!counts[serviceAction]) {
      counts[serviceAction] = {};
    }

    if (!counts[serviceAction][statusCode]) {
      counts[serviceAction][statusCode] = 0;
    }

	// Increment the count for the specific service action and status code
    counts[serviceAction][statusCode]++;
  });

  // Generate count data arrays
  const serviceActions = Object.keys(counts);
  const statusCodes = [...new Set(tableData.map((row) => row.statusCode))];
  const countData = serviceActions.map((serviceAction) =>
    statusCodes.map((statusCode) => counts[serviceAction][statusCode] || 0)
  );

  const chartData = {
    labels: serviceActions,
    datasets: statusCodes.map((statusCode, index) => ({
      label: `Status Code ${statusCode}`,
      data: countData.map((data) => data[index]),
      backgroundColor:
        statusCode === '400'
          ? '#FEB2B2'
          : statusCode === '404'
          ? '#C53030'
          : statusCode === '200'
          ? '#81C784'
          : statusCode === '201'
          ? '#008080'
          : '#4DB6AC', // Customize the background color
    })),
  };

  return <Bar data={chartData} />;
};

export default ServiceActionCodeChart;
