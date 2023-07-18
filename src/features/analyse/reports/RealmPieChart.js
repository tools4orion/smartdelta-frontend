import { Pie } from 'react-chartjs-2';

const RealmPieChart = ({ tableData }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    width: 500, 
    height: '100%',
  };

  // Initialize the messageRealm count map
  const messageRealmCounts = new Map();
  messageRealmCounts.set('internal', 0);
  messageRealmCounts.set('external', 0);

  // Count the occurrences of each messageRealm
  tableData.forEach((row) => {
    const messageRealm = row.messageRealm;
    if (messageRealmCounts.has(messageRealm)) {
      messageRealmCounts.set(messageRealm, messageRealmCounts.get(messageRealm) + 1);
    } else {
      messageRealmCounts.set(messageRealm, 1);
    }
  });

  const totalCount = [...messageRealmCounts.values()].reduce((sum, count) => sum + count, 0);
  const percentages = new Map();

  // Calculate the percentage for each messageRealm
  for (const [realm, count] of messageRealmCounts) {
    percentages.set(realm, (count / totalCount) * 100);
  }

  const pieChartData = {
    labels: [...messageRealmCounts.keys()],
    datasets: [
      {
        data: [...percentages.values()],
        backgroundColor: ['#F06292', '#FFB74D'], // Customize the background colors
      },
    ],
  };

  return <Pie data={pieChartData} options={chartOptions} />;
};

export default RealmPieChart;
