import * as React from 'react';
import  { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import MDButton from "components/MDButton";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
const bgStyles = {
    background: '#360033',
    /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #0b8793, #360033)',
    /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #0b8793, #360033)',
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  };

  const steps = [
	{
	  label: 'Select Indices',
	  description: `You can choos to analyze subsets of index names .Every selected index name must match at least one index with log entries.`,
	component:<><FormLabel component="legend">Indices</FormLabel>
	<FormControlLabel control={<Checkbox defaultChecked  />} label="-log*" /></>
	},
	{
	  label: 'Create Job',
	  description:
		'Implement Categorical Analysis',	component:null

	}
  ];
  
const SetupMlDialog = ({isVisible,handleClose}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
  
	const handleBack = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
  
	const handleReset = () => {
	  setActiveStep(0);
	};

	return(
		<Dialog
		fullScreen={fullScreen}
		open={isVisible}
		onClose={handleClose}
		aria-labelledby="responsive-dialog-title"
	  >
		<DialogTitle sx={bgStyles} id="responsive-dialog-title">
		Anomaly Detection 
		</DialogTitle>
		<DialogContent sx={bgStyles}>
		  <DialogContentText></DialogContentText>
		  
		  <Box sx={{ maxWidth: 400 }}>
      <Stepper sx={bgStyles} activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent sx={bgStyles}>
              <Typography>{step.description}</Typography>
			  {step.component}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Create Job' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
		</DialogContent>
		<DialogActions sx={bgStyles}>
		</DialogActions>
	  </Dialog>
	)
};

export default SetupMlDialog;