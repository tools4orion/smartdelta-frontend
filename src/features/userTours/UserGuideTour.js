import Joyride from "react-joyride";
import useUserGuide from "./useUserGuide";
import getSteps from "./getSteps";

const UserGuideTour = ({ guideKey }) => {
  const { runGuide, handleJoyrideCallback } = useUserGuide(guideKey);

  return (
    <div>
      <Joyride
        steps={getSteps(guideKey)}
        run={runGuide}
        callback={handleJoyrideCallback}
        continuous={true} // allow users to proceed through all steps
        showProgress={true} // show progress indicator
        styles={{
          options: {
            primaryColor: "#007BFF",
          },
        }}
      />
    </div>
  );
};

export default UserGuideTour;
