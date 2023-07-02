import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SendIcon from '@mui/icons-material/Send';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';

const AnimatedDashedLine = ({ color }) => (
  <svg width="100%" height="3" viewBox="0 0 100 3" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="0"
      y1="1.5"
      x2="100"
      y2="1.5"
      stroke={color}
      strokeWidth="3"
      strokeDasharray="7"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="-30"
        dur="2s"
        repeatCount="indefinite"
      />
    </line>
  </svg>
);

const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.info.dark,
    height: 3,
    borderRadius: 5,
  },
}));

const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  maxWidth:286
});

const CardItem = styled(Card)(({ theme, borderColor }) => ({
  margin: theme.spacing(1),
  minWidth: 200,
  maxWidth: 280,
  maxHeight: 90,
  border: `2px solid ${borderColor}`, // Update the border color based on the message color
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow to the card
  transition: 'transform 0.2s ease-in-out', // Add a smooth transition on hover
  '&:hover': {
    transform: 'scale(1.04)', // Enlarge the card slightly on hover
  },
}));

const TabPanel = ({ value, index, children }) => {
  return value === index ? <div>{children}</div> : null;
};

export default function DetailPanel({ data }) {
  const [value, setValue] = React.useState(0);
  const { incomingMessages, sentMessages } = data || {};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box paddingLeft={1} paddingRight={1}>
      <CustomTabs value={value} onChange={handleChange}>
        <Tab icon={<SendIcon />} iconPosition="top" label="Sent" />
        <Tab icon={<MoveToInboxIcon />} label="Incoming" />
        <Tab icon={<SmsFailedOutlinedIcon />} label="Failure" />
      </CustomTabs>

      <TabPanel value={value} index={0}>
        <CardContainer>
          {sentMessages.map((message, index) => (
            <CardItem key={index} borderColor={message.style.stroke}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
				  Target:  {message.target}
				  </Typography>
                </div>
				<Stack>
					    <Typography variant="h6">{message.style.strokeWidth * 10}</Typography>
						<AnimatedDashedLine color={message.style.stroke} />
				</Stack>
              </CardContent>
            </CardItem>
          ))}
        </CardContainer>
      </TabPanel>

      {/* Add TabPanel for "Incoming" and "Failure" tabs with their respective content */}
      <TabPanel value={value} index={1}>
        <CardContainer>
          {incomingMessages.map((message, index) => (
            <CardItem key={index} borderColor={message.style.stroke}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '260px'  }}>
                  <Typography variant="h6">From: {message.source}</Typography>
                  <Stack>
                    <Typography variant="h6">{message.style.strokeWidth * 10}</Typography>
                    <AnimatedDashedLine color={message.style.stroke} />
                  </Stack>
                </div>
              </CardContent>
            </CardItem>
          ))}
        </CardContainer>
      </TabPanel>

      <TabPanel value={value} index={2}>
        {/* Add your rendering logic for the "Failure" tab content here */}
      </TabPanel>
    </Box>
  );
}
