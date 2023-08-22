import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import SendIcon from '@mui/icons-material/Send';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

import {
  Box,
  CardContent,
  Typography,
  Stack,
  Tooltip,
  Fade
} from '@mui/material';
import FadeIn from 'hooks/FadeIn';
import { useFileController } from 'contexts/FileContext';
import { useRawData } from 'features/featureDiscovery/useRawData';
import TabPanel from './detailCard/TabPanel';

import {
  calculateErrorRateAndStatusPercentages
} from 'features/analyse/reports/DistributionErrorRate';
import { useNavigate } from 'react-router-dom';
import { getUniqueProtocols } from 'features/analyse/reports/getUniqueProtocols';
import { VerticalTabs } from './detailCard/VerticalTabs';
import {
  AnimatedDashedLine,
  CardContainer,
  CardItem,
  CustomTabs,
  DetailIcon,
  RotateIcon
} from './detailCard/CardComponent';
import MDTypography from 'components/MDTypography';

export default function DetailPanel({ data, node }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [filterKeywords, setFilterKeywords] = useState({});
  const { incomingMessages, sentMessages } = data || {};

  const [expandedTarget, setExpandedTarget] = useState('');
  const selectedArrayLength = value === 0 ? sentMessages.length : incomingMessages.length;
  const [hovered, setHovered] = useState(Array(selectedArrayLength).fill(false));
  const [expandedCards, setExpandedCards] = useState(Array(selectedArrayLength).fill(false));

  const { state } = useFileController();
  const { fileStateToView } = state ?? {};
  const directions = fileStateToView?.directions;

  const { edgeProperties, tableData } = useRawData(
    directions,
    '',
    filterKeywords,
    'asc'
  );
  console.log(tableData);

  const navigateToDetail = () => {
    navigate('/feature-discovery', { state: { filterData: filterKeywords } });
  };

  const handleExpandCard = (index, target) => {
    setExpandedCards(prevExpanded => {
      const updatedExpanded = prevExpanded.map((expanded, i) => i === index);

      const expandedIndex = updatedExpanded.indexOf(true);
      if (expandedIndex !== -1) {
        updatedExpanded[expandedIndex] = false;
      }

      updatedExpanded[index] = !prevExpanded[index];
      setExpandedTarget(updatedExpanded[index] ? target : null);

      return updatedExpanded;
    });
  };

  const handleHover = (index, isHovered) => {
    setHovered(prevState => {
      const updatedHovered = [...prevState];
      updatedHovered[index] = isHovered;
      return updatedHovered;
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setExpandedCards(Array(selectedArrayLength).fill(false));
    setExpandedTarget('');
  };

  function getTerminatingMSValue() {
    if (value === 0 && expandedTarget) return expandedTarget;
    return node;
  }

  function getOriginatingMSValue() {
    if (value === 0) return node;
    if (expandedTarget) return expandedTarget;
    return '';
  }

  function getDefaultValue() {
    return '';
  }

  const initialFilterKeywords = Object.fromEntries(
    edgeProperties.map(key =>
      key === 'originatingMS'
        ? [key, getOriginatingMSValue()]
        : key === 'terminatingMS'
        ? [key, getTerminatingMSValue()]
        : [key, getDefaultValue()]
    )
  );

  const {
    errorRatePercentage,
    statusCodePercentages
  } = calculateErrorRateAndStatusPercentages(tableData);
  console.log(statusCodePercentages);
  const {
    errorStatusCodePercentages,
    successStatusCodePercentages
  } = statusCodePercentages;
  const RateChips =
    errorRatePercentage === 0
      ? successStatusCodePercentages
      : errorStatusCodePercentages;
  const usedProtocols = getUniqueProtocols(tableData);
  console.log(usedProtocols);

  useEffect(() => {
    // Only set the initial filter keywords if fileStateToView is null
    setFilterKeywords(initialFilterKeywords);
  }, [node, expandedTarget]);

  return (
    <Box paddingLeft={1} paddingRight={1}>
      <CustomTabs value={value} onChange={handleChange}>
        <Tab icon={<SendIcon />} iconPosition="top" label="Sent" />
        <Tab icon={<MoveToInboxIcon />} label="Incoming" />
      </CustomTabs>
      <TabPanel value={value} index={0}>
        <CardContainer>
          {sentMessages.map((message, index) => (
            <CardItem
              key={index}
              borderColor={message.style.stroke}
              hovered={hovered[index]}
              isExpanded={expandedCards[index]}
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
              className={expandedCards[index] ? 'expanded' : ''}
            >
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="h6">Target: {message.target}</Typography>
                  <RotateIcon
                    hovered={hovered[index]}
                    expanded={expandedCards[index]}
                    onClick={() => handleExpandCard(index, message.target)}
                  />
                  <Tooltip
                    title={'Discover'}
                    placement="left"
                    TransitionComponent={Fade}
                  >
                    <DetailIcon
                      hovered={hovered[index]}
                      expanded={expandedCards[index]}
                      onClick={() => navigateToDetail()}
                    />
                  </Tooltip>
                </div>
                <Stack>
                  <Typography variant="h6">
                    {message.style.strokeWidth * 10} Calls
                  </Typography>
                  <AnimatedDashedLine color={message.style.stroke} />
                  {expandedCards[index] && (
                    <FadeIn>
                      <div>
                        <VerticalTabs
                          statusCodePercentages={RateChips}
                          errorRate={errorRatePercentage}
                          usedProtocols={usedProtocols}
                        />
                      </div>
                    </FadeIn>
                  )}
                </Stack>
              </CardContent>
            </CardItem>
          ))}
        </CardContainer>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <CardContainer>
          {incomingMessages.map((message, index) => (
            <CardItem
              hovered={hovered[index]}
              isExpanded={expandedCards[index]}
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
              className={expandedCards[index] ? 'expanded' : ''}
              key={index}
              borderColor={message.style.stroke}
            >
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <MDTypography variant="h6">From: {message.source}</MDTypography>
                  <RotateIcon
                    hovered={hovered[index]}
                    expanded={expandedCards[index]}
                    onClick={() => handleExpandCard(index, message.source)}
                  />
                  <Tooltip
                    title={'Discover'}
                    placement="left"
                    TransitionComponent={Fade}
                  >
                    <DetailIcon
                      hovered={hovered[index]}
                      expanded={expandedCards[index]}
                      onClick={() => navigateToDetail()}
                    />
                  </Tooltip>
                </div>
                <Stack>
                  <Typography variant="h6">
                    {message.style.strokeWidth * 10} Calls
                  </Typography>
                  <AnimatedDashedLine color={message.style.stroke} />
                  {expandedCards[index] && (
                    <FadeIn>
                      <div>
                        <VerticalTabs
                          statusCodePercentages={RateChips}
                          errorRate={errorRatePercentage}
                          usedProtocols={usedProtocols}
                        />
                      </div>
                    </FadeIn>
                  )}
                </Stack>
              </CardContent>
            </CardItem>
          ))}
        </CardContainer>
      </TabPanel>
    </Box>
  );
}
