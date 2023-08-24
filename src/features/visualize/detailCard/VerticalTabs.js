import React from 'react';
import {
  Box,
  Stack,
  Tab,
  Tabs,
  styled,
  Chip,
} from '@mui/material';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MDTypography from 'components/MDTypography';
import CellTowerIcon from '@mui/icons-material/CellTower';
import MDBox from 'components/MDBox';
import { protocolComponents } from './ProtocolComponents';
import TabPanel from './TabPanel';
import { calculateErrorRateAndStatusPercentages } from 'features/analyse/reports/DistributionErrorRate';
import { getUniqueProtocols } from 'features/analyse/reports/getUniqueProtocols';


const StyledMDBox = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(1),
  '&:hover': {
    transform: 'scale(1.06)',
  },
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
  maxHeight: 30,
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function VerticalTabs({tableData}) {
  
  //
  const {
    errorRatePercentage,
    statusCodePercentages
  } = calculateErrorRateAndStatusPercentages(tableData);
  const [value, setValue] = React.useState(0);
  const chipColor = errorRatePercentage == 0 ? 'success' : 'error';
  const isZeroErrorRate = errorRatePercentage == 0;

  
  const {
    errorStatusCodePercentages,
    successStatusCodePercentages
  } = statusCodePercentages;
  
  const getRateChips = () => {
	return errorRatePercentage == 0 ? successStatusCodePercentages : errorStatusCodePercentages;
  };
console.log(getRateChips());
  const usedProtocols = getUniqueProtocols(tableData);

  //

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getStatusIconAndLabel() {
	if (isZeroErrorRate) {
	  return {
		icon: <CheckCircleOutlineIcon color="success" />,
		label: 'Success Rate',
		value: '100%',
	  };
	} else {
	  return {
		icon: <RunningWithErrorsIcon color="error" />,
		label: 'Error Rate',
		value: `${errorRatePercentage}%`,
	  };
	}
  }
  

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', height: 130 }}
    >
      <Tabs
        orientation="vertical"
        variant="standard"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minHeight: 130 }}
      >
        <Tab
          label={(
            <StyledMDBox sx={{ width: '120px' }}>
              <MDBox>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CellTowerIcon color="info" />
                  <MDTypography variant="h6">{usedProtocols.length}</MDTypography>
                </div>
                <MDTypography variant="h6">
                  {usedProtocols.length > 1 ? 'Protocols' : 'Protocol'}
                </MDTypography>
              </MDBox>
            </StyledMDBox>
          )}
          {...a11yProps(0)}
        />
        <Tab
          label={(
            <StyledMDBox sx={{ width: '120px' }}>
              <MDBox>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {getStatusIconAndLabel().icon}
          <MDTypography variant="h6">
            {getStatusIconAndLabel().value}
          </MDTypography>
        </div>
        <MDTypography variant="h6">
          {getStatusIconAndLabel().label}
        </MDTypography>
      </MDBox>
            </StyledMDBox>
          )}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack sx={{ mt: 2 }} spacing={1}>
          {usedProtocols.map((protocol, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
              {protocolComponents[protocol]
                ? protocolComponents[protocol]()
                : protocolComponents.Default(protocol)}
            </div>
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
          { getRateChips().map((status) => (
            <div
              key={status.code}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Chip size="small" style={{ color: 'white' }} label={status.code} color={chipColor} />
              <Chip size="small" sx={{ width: 50 }} label={status.percentage} color="warning" />
            </div>
          ))}
        </Stack>
      </TabPanel>
    </Box>
  );
}
