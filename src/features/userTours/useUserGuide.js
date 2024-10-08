import { useState, useEffect } from "react";
import { useVisualizerController } from "contexts/VisualizerContext";

const useUserGuide = (guideKey) => {
  const [runGuide, setRunGuide] = useState(false);
  const { isUserGuideOpen } = useVisualizerController();

  useEffect(() => {
    const guideState = localStorage.getItem(guideKey);
    if (!guideState) {
      setRunGuide(isUserGuideOpen);
    }
  }, [guideKey, isUserGuideOpen]);

  // callback (detecting of finishing the tour)
  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if (status === "finished" || status === "skipped") {
      localStorage.setItem(guideKey, "true"); // it means tour is completed
      setRunGuide(false);
    }
  };

  // resetting
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
