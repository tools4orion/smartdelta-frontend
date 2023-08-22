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
  