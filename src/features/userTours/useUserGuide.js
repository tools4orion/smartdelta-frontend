import { useVisualizerController } from 'contexts/VisualizerContext';

import { useState, useEffect } from 'react';


// Custom hook to manage user guides
const useUserGuide = (guideKey) => {
  const [runGuide, setRunGuide] = useState(false);
  const {  dispatch, isUserGuideOpen, showUserGuide } = useVisualizerController();

  useEffect(() => {
    // Check if the guideKey exists in local storage
    const guideState = JSON.parse( localStorage.getItem(guideKey));
	console.log("guideState: ", typeof guideState);
	
    if (guideState ) {
		console.log("Enter IN IF INSIDE ",guideState);
      setRunGuide(true);

    }

  }, [guideKey,isUserGuideOpen, showUserGuide] );

  const handleJoyrideCallback = (data) => {
    // Check if the user completed the tour
	console.log("handleJoyrideCallback DATA STATUS: ",data.status)
    if (data.status === 'finished') {
      // Set the corresponding guideKey in local storage to mark it as seen
	  console.log('CONSOLE FINISHED IF INSIDE')
	  console.log('GUIDE KEY: ' + guideKey);
      localStorage.removeItem(guideKey, false);
	  
    }

  };

  return {
    runGuide,
    handleJoyrideCallback,
  };
};

export default useUserGuide;
