import React from 'react';
import { Box } from '@mui/system';
import { Button, Paper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRawData } from 'features/featureDiscovery/useRawData';
import { useFileController } from 'contexts/FileContext';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@mui/material/MobileStepper';

import generateReports from './generateReports';

import styles from './ReportModal.styles';
import MDTypography from 'components/MDTypography';

const AnalysisModalContent = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const { state } = useFileController();
  const { fileStateToView } = state ?? {};
  const directions = fileStateToView?.directions;
  const { tableData } = useRawData(directions, '', '', '');

  if (!directions) {
    // Render a loading state or placeholder
    return <div>Loading...</div>;
  }

  const analysisReportComponents = generateReports(tableData);

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const maxSteps = analysisReportComponents.length;

  return (
    <Box sx={styles.container}>
      <Paper square elevation={0} sx={styles.paper}>
        <MDTypography>{analysisReportComponents[activeStep].label}</MDTypography>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={styles.swipeableViews}
      >
        {analysisReportComponents.map((component, index) => (
          <Box key={component.label}>
            {Math.abs(activeStep - index) <= 2 && (
              <Box sx={styles.componentBox}>
                {component.component}
              </Box>
            )}
          </Box>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNextStep}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handlePreviousStep}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default AnalysisModalContent;
