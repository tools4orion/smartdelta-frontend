import React from 'react';
import MessagingTimeSeriesChart from './reports/TimeSeriesChart';
import ServiceActionCodeChart from './reports/ServiceActionCodeChart';
import RealmPieChart from './reports/RealmPieChart';
import ServiceActionDistribution from './reports/ServiceActionDistribution';

import ErrorRateChart from './reports/CorrelationErrorRate';

const generateReports = (tableData) => [
	{
	  label: 'Distribution of Status Codes along Service Actions',
	  component: <ServiceActionCodeChart tableData={tableData}/>,
	},
	{
	  label: 'Internal/External Communication Proportion',
	  component: <RealmPieChart tableData={tableData}/>,
	},
	{
	  label: 'Proportion of Service Actions',
	  component: <ServiceActionDistribution tableData={tableData}/>,
	},
	{
	  label: 'Error/Success Time-Series Chart',
	  component: <MessagingTimeSeriesChart tableData={tableData}/>,
	},
	{
	  label: 'Top 30 Highest Error rate of correlations',
	  component: <ErrorRateChart tableData={tableData}/>,
	},
  ];
  
  export default generateReports;
  