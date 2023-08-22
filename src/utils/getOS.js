export function getOperatingSystem() {
	const userAgent = window.navigator.userAgent.toLowerCase();
  
	if (userAgent.includes('win')) {
	  return 'Windows';
	} else if (userAgent.includes('mac')) {
	  return 'Mac OS';
	} else if (userAgent.includes('linux')) {
	  return 'Linux';
	} else {
	  return 'Unknown';
	}
  }