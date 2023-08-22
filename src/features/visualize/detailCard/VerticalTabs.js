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
import MDTypography from 'components/MDTypography';
import CellTowerIcon from '@mui/icons-material/CellTower';
import MDBox from 'components/MDBox';
import { protocolComponents } from './ProtocolComponents';
import TabPanel from './TabPanel';

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

export function VerticalTabs({ usedProtocols, errorRate, statusCodePercentages }) {
  const [value, setValue] = React.useState(0);
  const chipColor = errorRate === 0 ? 'success' : 'error';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                  <RunningWithErrorsIcon color="error" />
                  <MDTypography variant="h6">{errorRate}%</MDTypography>
                </div>
                <MDTypography variant="h6">Error Rate</MDTypography>
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
          {statusCodePercentages.map((status) => (
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
