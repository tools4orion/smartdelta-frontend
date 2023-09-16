const organizeLatencyData = (rawData) => {
	const latencyData = {}; // Create an empty object to store latency data for each node
  
	// Iterate through the raw data and populate the latencyData object
	rawData.forEach((entry) => {
	  const { originatingMS, latency, ...messageProperties } = entry;
  
	  // Check if the node exists in the latencyData object
	  if (!latencyData[originatingMS]) {
		latencyData[originatingMS] = [];
	  }
  
	  // Push an object containing latency and all message properties
	  if (!isNaN(parseInt(latency))) latencyData[originatingMS].push({ latency, ...messageProperties });
	});
  
	return latencyData;
  };
  
 // Calculate Tukey's method for latency data and dynamically adjust 'k' based on the number of outliers
const calculateDynamicTukeysOutliers = (latencyArray, minOutliers = 4, maxOutliers = 10) => {
	let k = 0.92; // Initial value of 'k'
	let outliers = calculateTukeysOutliers(latencyArray, k).outliers;
  
	// Increase 'k' to make it more sensitive until minimum outliers are met
	while (outliers.length > maxOutliers) {
	  k += 0.25;
	  outliers = calculateTukeysOutliers(latencyArray, k).outliers;
	}
  
	// Decrease 'k' to make it less sensitive if minimum outliers are not met
	while (outliers.length < minOutliers && k > 0) {
	  k -= 0.25;
	  outliers = calculateTukeysOutliers(latencyArray, k).outliers;
	}
  
	// Calculate the mean for each outlier
	const outliersWithUpperBound = outliers.map((outlier) => {
	  // Calculate the mean for this outlier
	  const upperBound =  calculateTukeysOutliers(latencyArray, k).upperBound;
		const deviation = parseInt(outlier.latency) - upperBound;
	  // Add the mean to the outlier object
	  return { ...outlier, upperBound, deviation };
	});
  
	return { outliers: outliersWithUpperBound };
  };

  const calculateTukeysOutliers = (latencyArray, k = 0.92) => {
	const latencies = latencyArray.map((entry) => parseInt(entry.latency));
	const quartiles = calculateQuartiles(latencies);
	const IQR = quartiles.q3 - quartiles.q1;
	const upperBound = quartiles.q3 + k * IQR;
  
	return { outliers: latencyArray.filter((entry) => parseInt(entry.latency) > upperBound), upperBound };
  };
  
  const calculateQuartiles = (numbers) => {
	const sortedNumbers = numbers.sort((a, b) => a - b);
	const middle = Math.floor(sortedNumbers.length / 2);
	const q1 = calculateMedian(sortedNumbers.slice(0, middle));
	const q3 = calculateMedian(sortedNumbers.slice(middle + 1));
  
	return { q1, q3 };
  };
  
  const calculateMedian = (numbers) => {
	const middle = Math.floor(numbers.length / 2);
	if (numbers.length % 2 === 0) {
	  return (numbers[middle - 1] + numbers[middle]) / 2;
	} else {
	  return numbers[middle];
	}
  };
  
  const organizePeakData = (latencyData, minOutliers = 4, maxOutliers = 10) => {
	const peakData = {};
	for (const node in latencyData) {
	  const { outliers } = calculateDynamicTukeysOutliers(latencyData[node], minOutliers, maxOutliers);
	  peakData[node] = outliers;
	}
	return peakData;
  };
  
  export const getOutliers = (rawData, minOutliers = 2, maxOutliers = 4) => {
	const latencyData = organizeLatencyData(rawData);
	const organizedPeakData = organizePeakData(latencyData, minOutliers, maxOutliers);
	console.log(organizedPeakData);
	return organizedPeakData;
  };

 export const classifyOutliers = (outliersByService) => {
	// Define your criteria for severity classification
	const severityLevels = {
	  critical: 2,
	  high: 1,
	  medium: 0.5,
	};
  
	// Create an object to store classified outliers by service
	const classifiedOutliersByService = {};
  
	// Iterate through each service's outliers
	for (const serviceName in outliersByService) {
	  const outliers = outliersByService[serviceName];

     
	  // Classify outliers for the current service
	  const classifiedOutliers = outliers.map((outlier) => {
		console.log('UpperBound: ' +  outlier.upperBound);
		console.log('Outlier: ' + parseInt(outlier.latency));
		const deviation = outlier.deviation;

		console.log('DEVIATION: ' + deviation);
		if (deviation > severityLevels.critical) {
		  outlier.severity = 'critical';
		} else if (deviation > severityLevels.high) {
		  outlier.severity = 'high';
		} else if (deviation > severityLevels.medium) {
		  outlier.severity = 'medium';
		} else {
		  outlier.severity = 'low';
		}
		return outlier;
	  });
  
	  // Store the classified outliers for the current service
	  classifiedOutliersByService[serviceName] = classifiedOutliers;
	}
  
	return classifiedOutliersByService;
  };
