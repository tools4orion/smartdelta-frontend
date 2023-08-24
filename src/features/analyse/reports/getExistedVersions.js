export function getExistedVersions(messages) {
	const versionSet = new Set();
  
	// Iterate through the messages array to extract unique versions
	messages.forEach(message => {
	  if (message.version) {
		versionSet.add(message.version);
	  }
	});
  
	// Convert the set of versions back to an array
	const existedVersions = Array.from(versionSet);
  
	return existedVersions;
  }
  
 