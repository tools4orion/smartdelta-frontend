import * as React from "react";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import {
  Card,
  Grid,
  Icon,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

/*
  const steps = [
	{
	  label: 'Transaction 1',
	  transactionInfo: {
		destination: {
		  address: 'dynamodb.us-east-1.amazonaws.com',
		  port: 443,
		},
		span: {
		  duration: {
			us: 38878,
		  },
		},
		http: {
		  request: {
			method: 'POST',
		  },
		  response: {
			status_code: 200,
		  },
		},
	  },
	  metadata: {
		agent: {
		  activation_method: 'aws-lambda-layer',
		  name: 'nodejs',
		  version: '4.4.0',
		},
		data_stream: {
		  namespace: 'default',
		  type: 'traces',
		  dataset: 'apm',
		},
		event: {
		  agent_id_status: 'missing',
		  ingested: '2024-02-16T20:43:04Z',
		  success_count: 1,
		  outcome: 'success',
		},
		host: {
		  hostname: '169.254.44.21',
		  os: {
			platform: 'linux',
		  },
		  ip: ['44.205.14.154'],
		  name: '169.254.44.21',
		  architecture: 'x64',
		},
		timestamp: {
		  us: 1708116178589222,
		},
	  },
	},
	// Add more transactions as needed
  ];
  */
export default function TextMobileStepper({ steps }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  console.log("MOBIL STEPS");
  console.log(steps);

  const maxSteps = steps?.length ?? null;

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {!steps ? null : (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            {/*<Typography>{steps[activeStep]?.label ?? 'Unknown'}</Typography>*/}
          </Paper>

          <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                width={100}
                {...a11yProps(0)}
                label="Metrics"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    troubleshoot
                  </Icon>
                }
              />
              <Tab
                {...a11yProps(1)}
                label="MetaData"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    code
                  </Icon>
                }
              ></Tab>
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <Typography variant="h6">Destination:</Typography>
              <Typography>
                {steps[activeStep]?.transactionInfo?.destination?.address ??
                  "unknown"}
              </Typography>
              <Typography>
                {steps[activeStep]?.transactionInfo?.destination?.port ??
                  "unknown"}
              </Typography>
              <Divider />
              <Typography variant="h6">
                Span Duration (microseconds):
              </Typography>
              <Typography>
                {steps[activeStep]?.transactionInfo?.span?.duration?.us ??
                  "unknown"}
              </Typography>
              <Typography variant="h6">HTTP Request:</Typography>
              <Typography>
                {steps[activeStep]?.transactionInfo.http?.request?.method ??
                  "unknown"}
              </Typography>
              <Typography variant="h6">HTTP Response:</Typography>
              <Typography>
                {steps[activeStep]?.transactionInfo.http?.response
                  ?.status_code ?? "unknown"}
              </Typography>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Agent ID Status"
                    secondary={
                      steps[activeStep]?.metadata?.event?.agent_id_status ??
                      "unknown"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Ingested"
                    secondary={
                      steps[activeStep]?.metadata?.event?.ingested ?? "unknown"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Outcome"
                    secondary={
                      steps[activeStep]?.metadata?.event?.outcome ?? "unknown"
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    primary="Host"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Hostname"
                    secondary={
                      steps[activeStep]?.metadata?.host?.hostname ?? "unknown"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Architecture"
                    secondary={
                      steps[activeStep]?.metadata?.host?.architecture ??
                      "unknown"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="IP"
                    secondary={
                      steps[activeStep]?.metadata?.host?.ip?.join(", ") ??
                      "unknown"
                    }
                  />
                </ListItem>
              </List>
            </CustomTabPanel>
          </Box>
          {steps[activeStep] !== undefined && (
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          )}
        </Box>
      )}
    </div>
  );
}
