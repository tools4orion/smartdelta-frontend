import Joyride from 'react-joyride';
import useUserGuide from './useUserGuide';
import getSteps from './getSteps';
import { useEffect } from 'react';
const UserGuideTour = ({guideKey,isUserGuideOpen}) => {
	const { runGuide, handleJoyrideCallback } = useUserGuide(guideKey);
	console.log('RUN GUIDE:',runGuide);
	return (
		<div>
		<Joyride
		  steps={getSteps(guideKey)}
		  run={runGuide}
		  callback={handleJoyrideCallback}
		  continuous={true} // Allow users to proceed through all steps
		  showProgress={true} // Show progress indicator
		  styles={{
			options: {
			  primaryColor: '#007BFF',
			},
		  }}
		/>
	  </div>
	);
	
};
export default UserGuideTour;