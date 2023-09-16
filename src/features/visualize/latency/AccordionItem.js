import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import LightTooltip from 'shared/tooltips/LightTooltip';
import TimelineItem from 'examples/Timeline/TimelineItem';
import MDTypography from 'components/MDTypography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {},
	'&:before': {
	  display: 'none',
	},
	maxWidth: 280,
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

  const severityLabelColors = {
	critical: '#FEB2B2',
	high: '#FBB6CE',
	medium: '#FF9800',
	low: '#9AE6B4',
  };

  const severityColors = {
    critical: 'error',
    high: 'primary',
    medium: 'warning',
    low: 'success',
  };

const AccordionItem = ({ expanded, onChange, title, data}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
    >
      <AccordionSummary aria-controls="panel-content" id="panel-header">
        <MDTypography variant="h6">{title}</MDTypography>
      </AccordionSummary>
      <AccordionDetails>
        <MDTypography>
          {data.map((item, itemIndex) => (
            <div key={itemIndex}>
              <LightTooltip
                title={
                  <div>
                    <div>Severity: <span style={{ color: severityLabelColors[item.severity] }}>{item.severity}</span></div>
                    <div>Deviation: {item.deviation.toFixed(2)}ms</div>
                  </div>
                }
              >
                <div style={{ cursor: 'pointer' }}>
                  <TimelineItem
                    color={severityColors[item.severity]}
                    icon="network_check"
                    title={`${item.terminatingMS} - ${item.latency}`}
                    dateTime={item.timestamp}
                    lastItem
                        />
                </div>
              </LightTooltip>
            </div>
          ))}
        </MDTypography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
