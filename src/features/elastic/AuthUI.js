import React from 'react';
import Card from '@mui/material/Card';

import { Link } from 'react-router-dom'; // Make sure to import the correct Link component
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

const ElasticAuthUI = ({ styles, inputRefUsername, inputRefPassword, inputRefCloudId, handleAuthentication }) => {
  return (
    <Card sx={{ ...styles }}>
      <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mx={2} mt={-3} p={2} mb={1} textAlign="center">
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Enable Elastic Cloud Monitoring
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput inputRef={inputRefUsername} type="text" label="Username" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput inputRef={inputRefPassword} type="password" label="Password" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput inputRef={inputRefCloudId} type="password" label="Cloud Id" fullWidth />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton onClick={handleAuthentication} variant="gradient" color="info" fullWidth>
              Integrate
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Don&apos;t have an elastic account?{' '}
              <MDTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default ElasticAuthUI;
