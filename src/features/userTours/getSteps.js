const userGuideSteps = {
	'interaction-panel': [
	  {
		target: '.dashed-line',
		content: 'Use this dashed line color to trace this interaction in topology',
		placement: 'bottom',
	  },
	  {
		target: '.react-flow__edge-path',
		content: 'Trace Colored units Hint: The wider the unit the more messages it has',
		placement: 'bottom',
	  },
	  {
		target: '.react-flow__node',
		content: 'Here is a microservice. The larger arrows mean more incoming messages',
		placement: 'bottom',
	  },
	],
	'latency-menu': [
	  {
		target: '.VersionServiceLatency',
		content: 'Compare the latency between different versions using line chart and scatterplot',
		placement: 'left',
	  },
	  {
		target: '.CorrelationChart',
		content: 'Display the correlation between latency and other metrics',
		placement: 'bottom',
	  },
	  {
		target: '.TopologyOverview',
		content: 'Display the outliers  topology of the system using Tukey`s Fences method',
		placement: 'bottom',
	  },
	],
  
	'visualizer-tools': [
	  {
		target: '.strength',
		content: 'This is the strength control. You can adjust it to change the force layout strength.',
		placement: 'right',
	  },
	  {
		target: '.distance',
		content: 'This is the distance control. Use it to manipulate the node distance.',
		placement: 'bottom',
	  },
	  {
		target: '.react-flow__node',
		content: 'Here is a microservice. Right Click on it to see node menu options.',
		placement: 'bottom',
	  },
	],
	'compare': [
		{
		  target: '.compare',
		  content: 'In this column, Click the icon of a  log file to compare',
		  placement: 'right',
		}
	  ],
  };
  
  const getSteps = (guideKey) => {
	return userGuideSteps[guideKey] || [];
  };

  export default getSteps;
  