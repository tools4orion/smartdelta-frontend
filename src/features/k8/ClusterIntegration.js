import React, { useEffect, useState } from 'react';
import { Card, Grid, TextField, Stack, Tooltip, Breadcrumbs } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/material/styles'
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'layouts/authentication/components/Footer';
import MDTypography from 'components/MDTypography';
import awsEks from '../../assets/svgs/awsEks.svg';
import google_cloud from '../../assets/svgs/google_cloud.svg';
import microsoftAzure from '../../assets/svgs/microsoftAzure.png';
import bareMetal from '../../assets/svgs/bareMetal.svg';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MDButton from 'components/MDButton';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from 'react-copy-to-clipboard';
import './index.css';
import MDSnackbar from 'components/MDSnackbar';
import { getOperatingSystem } from 'utils/getOS';
import authenticateK8S from './actions/auth.action';
import useSnackbar from 'hooks/useSnackbar';
import { useNavigate } from 'react-router-dom';
const BreadcrumbSeparator = styled('span')({
	color: 'white', // Set the breadcrumb separator color to match your dark blue theme
	margin: '0 8px',
  });
  const RightAngleArrowIcon = styled('span')({
	fontSize: '24px',
	transform: 'rotate(90deg)', // Rotate the arrow icon to make it look like a right angle arrow
	marginLeft: '4px', // Add a bit of spacing between the arrow and text
  });

  function renderCopyCmd(operatingSystem) {
	const copyCommands = {
	  'Linux': 'xsel -ib',
	  'Mac OS': 'pbcopy',
	  'Windows': 'clip'
	};
  
	return copyCommands[operatingSystem] || 'xsel -ib';
  }

  const gcloudItems = [ 'Copy the command below to get auth credentials', 'Paste in Terminal'];

const CodeBlock = styled('pre')(({ theme }) => ({
	// ... your existing styles
	backgroundColor: theme.palette.background.default,
	padding: theme.spacing(2),
	color: '#AAAAAA',
	borderRadius: theme.spacing(1),
	fontFamily: 'monospace',
	fontSize: '0.9rem', // Adjust the font size as needed
	whiteSpace: 'nowrap',
	overflowX: 'auto'
  }));
  
const ClusterIntegration = () => {
	const operatingSystem = getOperatingSystem();
	const codeExample = `gcloud container clusters get-credentials CLUSTER_NAME  --zone ZONE  && cat ~/.kube/config | xsel -ib`;

const tabNames = ['GCloud', 'AWS', 'Azure', 'Bare Metal Server']; // Names corresponding to each tab
const [isCopied, setIsCopied] = useState(false);
  const [value, setValue] = useState(0);
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
	authMethod:'kubeconfig',
	kubeconfig: '',
	serviceToken: '',
  });

  const submitForm = async () => {
		// Call the authentication function
	const { isAuthenticated } = await authenticateK8S(
			tabNames[value],
			formInputs.kubeconfig,
			formInputs.authMethod,
			snackbar
		  );
		if (isAuthenticated) {
			setTimeout(() => {
			  navigate('/dashboard');
			}, 1000); 
		  }
		  
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormInputChange = (inputName, inputValue) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: inputValue,
    }));
  };
  const handleCopyToClipboard = () => {
    setIsCopied(true);
	snackbar.openSnackbar('Paste In your terminal', 'success', 'Copied to clipboard');
    
  };
  
  const renderFormInputs = () => {
    switch (value) {
      case 0: // Google Cloud (GCP)
        return (
          <Stack spacing={2}>
		    <MDTypography variant="h5">
			 Google Cloud Guide For {operatingSystem} OS
			</MDTypography>
		   <Breadcrumbs separator={<BreadcrumbSeparator><RightAngleArrowIcon>&#8250;</RightAngleArrowIcon></BreadcrumbSeparator>}>
      {gcloudItems.map((item, index) => (
        <MDTypography  variant="h6" key={index}>
          {item}
        </MDTypography>
      ))}
    </Breadcrumbs>
		
		    <CopyToClipboard text={codeExample} onCopy={handleCopyToClipboard}>
			<div style={{ position: 'relative' }}>
			<Tooltip title="Copy">
              <ContentCopyIcon
               className='copyIcon'
              />
			  </Tooltip>
		     <CodeBlock>
      <span className='logoBlue'> gcloud </span>
      container clusters <span className='logoRed'>get-credentials</span>{' '}
      <span className='logoYellow'>CLUSTER_NAME</span>{' '}--zone{' '}<span className='logoYellow'>ZONE</span> cat
      <span className='logoGreen'> ~/.kube/config</span> | <span className='logoBlue'>{renderCopyCmd()} </span> 
    </CodeBlock>
			</div>
</CopyToClipboard>
	<MDTypography variant="h6">
	After run the above command, paste the output in Kubeconfig Content field below.
	</MDTypography>
			<TextField
			label="Kubeconfig Content"
  multiline
  rows={6}
  variant="outlined"
  fullWidth
  value={formInputs.kubeconfig}
  onChange={(e) => handleFormInputChange('kubeconfig', e.target.value)}
/>
            {/* Additional Google Cloud specific inputs */}
          </Stack>
        );
      case 1: // AWS ECS
        return (
          <Stack spacing={2}>
		    <MDTypography variant="h5">
			 AWS Guide	
			</MDTypography>
			<MDTypography variant="h6">
	After run the above command, paste the output in Kubeconfig Content field below.
	</MDTypography>
			<TextField
			label="Kubeconfig Content"
  multiline
  rows={6}
  variant="outlined"
  fullWidth
  value={formInputs.kubeconfig}
  onChange={(e) => handleFormInputChange('kubeconfig', e.target.value)}
/>
            {/* Additional AWS ECS specific inputs */}
          </Stack>
        );
      case 2: // Microsoft Azure AKS
        return (
          <Stack spacing={2}>
		    <MDTypography variant="h5">
			Microsoft Azure AKS Guide	
			</MDTypography>
			<MDTypography variant="h6">
	After run the above command, paste the output in Kubeconfig Content field below.
	</MDTypography>
			<TextField
			label="Kubeconfig Content"
  multiline
  rows={6}
  variant="outlined"
  fullWidth
  value={formInputs.kubeconfig}
  onChange={(e) => handleFormInputChange('kubeconfig', e.target.value)}
/>
            {/* Additional Azure AKS specific inputs */}
          </Stack>
        );
	case 3:
		return (
			<Stack spacing={2}>
				<MDTypography variant="h5">
				Bare Metal Server Guide
				</MDTypography>
				<MDTypography variant="h6">
	After run the above command, paste the output in Kubeconfig Content field below.
	</MDTypography>
			<TextField
			label="Kubeconfig Content"
  multiline
  rows={6}
  variant="outlined"
  fullWidth
  value={formInputs.kubeconfig}
  onChange={(e) => handleFormInputChange('kubeconfig', e.target.value)}
/>
			</Stack>
			)

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Enable Kubernetes cluster monitoring
                </MDTypography>
              </MDBox>
              <MDTypography variant="h6" py={3} px={4}>
                Select Your Provider
              </MDTypography>
			  <MDBox px={2}>
              <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<img width="150" src={google_cloud} />} />
                <Tab icon={<img width="50" height="50" src={awsEks} />} />
                <Tab icon={<img width="200" height="100" src={microsoftAzure} />} />
				<Tab icon={<img width="250" height="150" src={bareMetal} />} />
              </Tabs>
			  </MDBox>
              <MDBox display="flex" flexDirection="column" px={4} py={6}>
                {renderFormInputs()} {/* Render the appropriate form inputs based on the selected tab */}
              </MDBox>
			  <MDButton
			   variant="outlined"
              size="small"
              color={'success'}
			  onClick={submitForm}
			  >
							  Connect To  {tabNames[value]}
			  </MDButton>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
	  <MDSnackbar
        open={snackbar.isOpen}
        autoHideDuration={3000}
        onClose={snackbar.closeSnackbar}
        message={snackbar.message}
        icon={snackbar.icon}
        close={snackbar.closeSnackbar}
        title={snackbar.title}
        color={snackbar.type}
      >
        <p>{snackbar.message}</p>
      </MDSnackbar>
    </DashboardLayout>
  );
};

export default ClusterIntegration;
