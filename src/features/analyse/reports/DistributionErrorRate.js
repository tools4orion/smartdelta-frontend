// All Topology Error rate status code percentage
export function calculateErrorRateAndStatusPercentages(dataArray) {
	const statusCodeCounts = new Map();
  
	dataArray.forEach(item => {
	  const statusCode = item.statusCode || "Unknown";
	  const count = statusCodeCounts.get(statusCode) || 0;
	  statusCodeCounts.set(statusCode, count + 1);
	});
  
	const errorStatusCodes = ["400", "404", "50X"];
	const successStatusCodes = ["200", "201", "204"];
  
	const totalErrors = errorStatusCodes
	  .map(code => statusCodeCounts.get(code) || 0)
	  .reduce((total, count) => total + count, 0);
  
	const totalSuccess = successStatusCodes
	  .map(code => statusCodeCounts.get(code) || 0)
	  .reduce((total, count) => total + count, 0);
  
	const errorRatePercentage = ((totalErrors / dataArray.length) * 100).toFixed(1);
  
	const formatPercentage = (count, total) => {
	  const percentage = (count / total) * 100;
	  return Number.isNaN(percentage) ? '0' : (Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(1));
	};
  
	const errorStatusCodePercentages = errorStatusCodes.map(code => ({
	  code,
	  percentage: `${formatPercentage(statusCodeCounts.get(code) || 0, totalErrors)}%`
	}));
  
	const successStatusCodePercentages = successStatusCodes.map(code => ({
	  code,
	  percentage: `${formatPercentage(statusCodeCounts.get(code) || 0, totalSuccess)}%`
	}));
  
	return {
	  errorRatePercentage,
	  statusCodePercentages: {
		errorStatusCodePercentages,
		successStatusCodePercentages,
	  },
	};
  }
  

  export function calculateMicroserviceErrorRates(dataArray) {
	const microserviceData = dataArray.reduce((acc, item) => {
	  const microservice = item.service || "Unknown";
	  const statusCode = item.statusCode || "Unknown";
  
	  if (!acc.has(microservice)) {
		acc.set(microservice, { total: 0, errors: 0, data: [] });
	  }
  
	  acc.get(microservice).total += 1;
	  if (["400", "404", "50X"].includes(statusCode)) {
		acc.get(microservice).errors += 1;
	  }
  
	  acc.get(microservice).data.push( acc.get(microservice).total > 0 ? ((acc.get(microservice).errors / acc.get(microservice).total) * 100).toFixed(2) : 0,
);
  
	  return acc;
	}, new Map());
  
	const latestMicroserviceErrorRates = Array.from(microserviceData.entries()).map(
	  ([microservice, { data }]) => ({
		microservice,
		latestErrorRate: data.length > 0 ? data[data.length - 1] : 0,
		errorRateData: data.sort((a, b) => a.x - b.x), // Sort data by timestamp
	  })
	);
  
	console.log(latestMicroserviceErrorRates);
  
	return latestMicroserviceErrorRates;
  }
  

  export function calculateTransactionsPerMinute(tableData) {
	// Create an object to store the transaction counts per service per minute
	const transactionCounts = {};
  
	// Sort tableData by timestamp
	tableData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
	// Iterate through the sorted tableData and populate the transactionCounts object
	tableData.forEach(entry => {
	  const { timestamp, service } = entry;
	  const minute = new Date(timestamp).getMinutes();
  
	  // Initialize the service entry if not already present
	  if (!transactionCounts[service]) {
		transactionCounts[service] = Array(60).fill(0);
	  }
  
	  // Increment the transaction count for the corresponding minute
	  transactionCounts[service][minute]++;
	});
  
	// Calculate TPM for each service
	const tpmResults = Object.entries(transactionCounts).map(([service, counts]) => {
	
	  return { service, tpmData: counts };
	});
  
	return tpmResults;
  }
  
  export function calculateMicroserviceMetrics(dataArray) {
	const metricsData = dataArray.reduce((acc, item) => {
	  const microservice = item.terminatingMS || "Unknown";
	  const statusCode = item.statusCode || "Unknown";
	  const timestamp = new Date(item.timestamp);
	  const minute = timestamp.getMinutes();
  
	  // Initialize microservice entry if not already present
	  if (!acc.has(microservice)) {
		acc.set(microservice, {
		  errorData: [],
		  tpmData: Array(60).fill(0),
		  errors:0,
		  total: 0,
		});
	  }

	  acc.get(microservice).total += 1;
	  if (["400", "404", "50X"].includes(statusCode)) {
		acc.get(microservice).errors += 1;
	  }
  
	  // Calculate error rate
	  acc.get(microservice).errorData.push( acc.get(microservice).total > 0 ? ((acc.get(microservice).errors / acc.get(microservice).total) * 100).toFixed(2) : 0,
	  );
  
	  // Increment the transaction count for the corresponding minute
	  acc.get(microservice).tpmData[minute]++;
  
	  return acc;
	}, new Map());

  
	const microserviceMetrics = Array.from(metricsData.entries()).map(
	  ([microservice, { errorData, tpmData }]) => ({
		microservice,
		latestErrorRate: errorData.length > 0 ? errorData[errorData.length - 1] : 0,
		errorRateData: errorData,
		tpmData: tpmData,
		tpmAvg: (tpmData.reduce((acc, value) => acc + value, 0) / tpmData.length).toFixed(2)
	  })
	);
  
	console.log(microserviceMetrics);
  
	return microserviceMetrics;
  }
  

  export function getServiceData(data, serviceName) {
	return data.find(item => item.microservice === serviceName) || null;
  }