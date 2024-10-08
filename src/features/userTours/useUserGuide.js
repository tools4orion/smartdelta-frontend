import { useState, useEffect } from "react";
import { useVisualizerController } from "contexts/VisualizerContext";

// Custom hook to manage user guides
const useUserGuide = (guideKey) => {
  const [runGuide, setRunGuide] = useState(false);
  const { isUserGuideOpen } = useVisualizerController();

  useEffect(() => {
    // Check if the guideKey exists in local storage
    const guideState = localStorage.getItem(guideKey);
    if (!guideState) {
      // If guideState is not set in localStorage, run the guide
      setRunGuide(isUserGuideOpen);
    }
  }, [guideKey, isUserGuideOpen]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if (status === "finished" || status === "skipped") {
      // Mark the tour as completed in localStorage
      localStorage.setItem(guideKey, "true");
      setRunGuide(false);
    }
  };

  const resetUserGuide = () => {
    localStorage.removeItem(guideKey);
    setRunGuide(true);
  };

  return {
    runGuide,
    handleJoyrideCallback,
    resetUserGuide,
  };
};

export default useUserGuide;
