import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, Skeleton, Stack, Tooltip, Typography, } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import LightTooltip from 'shared/tooltips/LightTooltip';
import TimelineItem from 'examples/Timeline/TimelineItem';
import MDTypography from 'components/MDTypography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ApexCharts from 'react-apexcharts';
import MDBox from 'components/MDBox';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from 'react-copy-to-clipboard';


import Breadcrumbs from '@mui/material/Breadcrumbs';

import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { formatDate } from 'utils/formatDate';
import useSnackbar from 'hooks/useSnackbar';
import MDSnackbar from 'components/MDSnackbar';
import CopyIconOnHover from './CopyOnHover';
import MDButton from 'components/MDButton';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import getAIAssistance from '../actions/getAIAssistance';
import FadeIn from 'hooks/FadeIn';
import genMeaningfulTitle from './genMeaningfulTitle';
const colorMap = ['success', 'error', 'info', 'primary'];

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
	backgroundColor: '#2A4365'
  }));

function CustomSeparator({errorNo, stackTraceNo}) {
	const breadcrumbs = [
	  <MDTypography>
		Error #{ errorNo +1 }
	  </MDTypography>,
	  <MDTypography>
		Stack Trace #{stackTraceNo + 1}
	  </MDTypography>,
	];
   
   
	return (
	  <Stack spacing={2}>
		<Breadcrumbs
		  separator={<NavigateNextIcon fontSize="small" />}
		  aria-label="breadcrumb"
		>
		  {breadcrumbs}
		</Breadcrumbs>
	  </Stack>
	);
   }
   
   
   
   
   
   
   const Accordion = styled((props) => (
	  <MuiAccordion disableGutters elevation={0} square {...props} />
	))(({ theme }) => ({
	  border: `1px solid ${theme.palette.divider}`,
	  '&:not(:last-child)': {},
	  '&:before': {
		display: 'none',
	  },
	 
	  borderRadius: 4,
	}));
	const AccordionSummary = styled((props) => (
	  <MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	  />
	))(({ theme }) => ({
	  backgroundColor:
		theme.palette.mode === 'dark' ? '#1a2035' : '#1a2035',
	  flexDirection: 'row-reverse',
	  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	  },
	  '& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	  },
	  borderRadius: 4,
	}));
	 const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	  padding: theme.spacing(2),
	  border: '1px solid white',
	  maxHeight: 'max-content',
	  backgroundColor: '#1a2035',
	  borderRadius: 4,
	}));
	const bgStyles = {
	  background: '#360033',
	  /* fallback for old browsers */
	  background: '-webkit-linear-gradient(to right, #0b8793, #360033)',
	  /* Chrome 10-25, Safari 5.1-6 */
	  background: 'linear-gradient(to right, #0b8793, #360033)',
	  mt: 2,
	  mb:2
	  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	};
   

const ErrorItem = ({index,error,isGptStepperVisible, activeIndex, diagnosis,steps, note, handleAIAssistanceClick, isLoading }) => {
	return(
		<Accordion key={index}>
		<CopyIconOnHover
			  text={error.span.id}
			  command={`Copy All Stack Traces of Error ${index + 1}`}
			>
          <AccordionSummary>

            <Tooltip title={error.message}><MDTypography variant="h6">{ error.message.substring(0,40) }... </MDTypography>
			</Tooltip>
			<MDTypography variant="h6" color='secondary' > &nbsp;&nbsp;&nbsp;  { formatDate(error.event.ingested)} </MDTypography>
			
            <MDTypography>{error.error.message}</MDTypography>

          </AccordionSummary>
		  </CopyIconOnHover>
          <AccordionDetails>
            <Box sx={{ padding: '1rem', width: '100%' }}>
			
       
			<CopyIconOnHover
			  text={error.trace.id}
			  command="Copy Transaction Id"
			>
			<MDTypography variant="button" fontWeight="medium" color={ "white" } sx={{ display: 'block', marginTop: '0.5rem' }}>
					   Trace id:  {error.trace.id}
						</MDTypography>
		
			</CopyIconOnHover>

			<CopyIconOnHover
			  text={error.span.id}
			  command="Copy Span Id"
			>
			<MDTypography variant="button" fontWeight="medium" color={ "white" } sx={{ display: 'block', marginTop: '0.5rem' }}>
					   Span id:  {error.span.id}
						</MDTypography>
		
			</CopyIconOnHover>

			
						<MDTypography  variant="button" fontWeight="medium" sx={{ display: 'block', marginTop: '0.5rem' }}>
					   Event ingested at:  { formatDate(error.event.ingested)}
						</MDTypography>
<Tooltip title={`View diagnosis and steps to troubleshoot Error #${index + 1}`} >
						<MDButton
              color="dark"
              variant="gradient"
              sx={bgStyles}
			  fullWidth
			  onClick={ handleAIAssistanceClick}
			 
            
            >
              
			{isLoading ? <> Hang Tight! Assistant on work... &#128640;</> : <>GET AI ASSISTANCE &#128171;</> }  
            </MDButton>
			</Tooltip>
			
			<MDBox p={2}>
			{isLoading && 
			<FadeIn>
			<div>	
			<Stack>
			<StyledSkeleton variant="text" width={'100%'} height={81} />
			
			<div style={{ display: 'flex', width:'50%' }}>
			<StyledSkeleton  variant="circular" width={40} height={40} />
			
			<StyledSkeleton
           
              height={10}
              width="40%"
              style={{ marginBottom: 6 }}
            />
				<StyledSkeleton
             
              height={10}
              width="40%"
             
            />
			
			 
			</div>
			<StyledSkeleton  variant="text" width={'100%'} height={81} />
          

			<StyledSkeleton   variant="text" width={'100%'} height={81} />
			
			<div style={{ display: 'flex', width:'50%' }}>
			<StyledSkeleton variant="circular" width={40} height={40} />
			
			<StyledSkeleton
              animation="wave"
              height={10}
              width="40%"
              style={{ marginBottom: 6 }}
            />
				<StyledSkeleton
             
              height={10}
              width="40%"
             
            />
			
			 
			</div>
			<StyledSkeleton   variant="text" width={'100%'} height={81} />
         
          </Stack>
		  </div>
		  </FadeIn>
			} 
			
			{isGptStepperVisible &&  <FadeIn><div><MDTypography 
							  variant="button" color={ "white" }
							 >
			&#10024; Diagnosis: {diagnosis}			
          </MDTypography></div></FadeIn>
                          }
				{isGptStepperVisible &&  steps.map((step, index) => (
		
        <TimelineItem
          key={index}
          color={colorMap[index % colorMap.length]} // Cycling through colors
          icon="check_circle" // Assuming you have icons for each step
          title={`Step ${step.stepNumber}`}
          dateTime={new Date().toLocaleString()} // You can replace this with the actual date/time
          description={step.description}
          lastItem={index === steps.length - 1} // Determine if it's the last item
        />
      ))}

	  {isGptStepperVisible &&  <MDTypography 
							  variant="button" color={ "white" }
							 >
		&#128221; Note: {note}			
          </MDTypography>
                          }
	  </MDBox>

			
			
              <MDTypography variant="h6">Stack Trace:</MDTypography>
			 
              {error.error.exception.map((exp, i) => (
                <div key={i}>
				 
                  {exp.stacktrace.map((trace, j) => (
                    <MDBox  key={`${i}-${j}`}>
					<CopyIconOnHover
			  text={trace.function + ' in ' + trace.abs_path + ':' + trace.line?.number + ' ' + trace.context?.pre?.join(' ') + ' ' + trace.context?.post?.join(' ')}
			  command={`Copy Stack Trace ${j + 1}`}
			>
					<CustomSeparator errorNo={index} stackTraceNo={j} />

                      <Tooltip title={`Line: ${trace.line?.number}, Line Context: ${trace.line?.context}`}>
					  <MDTypography variant="button" fontWeight="medium" color={ "white" }
					  sx={{marginTop: '0.5rem' }}
					  >
					  {trace.function} in {trace.abs_path}:{trace.line?.number}
        </MDTypography>
                        
                      </Tooltip>
                      <MDTypography component="span" sx={{ display: 'block', p:4 }}>
                        {trace.context?.pre?.map((line, k) => (
                          <MDTypography key={`pre-${k}`} variant="body2" sx={{ marginLeft: '1.5rem', color: '#CCCCCC'  }}>
                            {line}
                          </MDTypography>
                        ))}
                        {trace.context?.post?.map((line, k) => (
							<MDTypography 
							key={`post-${k}`}  variant="button" color={ "secondary" }
							 sx={{ marginLeft: '1.5rem'}}>
							
							{line}
          </MDTypography>
                          
                        ))}
                      </MDTypography>
					  
					  <Divider />
					  </CopyIconOnHover>
                    </MDBox>
                  ))}
                </div>
              ))}
            </Box>
			
          </AccordionDetails>
		
        </Accordion>
	)
}

export default ErrorItem;