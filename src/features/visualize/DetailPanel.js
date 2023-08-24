import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import SendIcon from '@mui/icons-material/Send';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

import {
  Box
} from '@mui/material';
import { useFileController } from 'contexts/FileContext';
import { useRawData } from 'features/featureDiscovery/useRawData';
import TabPanel from './detailCard/TabPanel';


import { useNavigate } from 'react-router-dom';

import {
  CardContainer,
  CustomTabs,
} from './detailCard/CardComponent';

import DetailCardItem from './detailCard/DetailCardItem';
import useCardState from './detailCard/useCardState';

const SENT_TAB_INDEX = 0;
const INCOMING_TAB_INDEX = 1;

export default function DetailPanel({ data, node }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [filterKeywords, setFilterKeywords] = useState({});
  const { incomingMessages, sentMessages } = data || {};

  // Manage cards states
  const [expandedTarget, setExpandedTarget] = useState('');
  const selectedArrayLength = value === 0 ? sentMessages.length : incomingMessages.length;
  const { hovered, expandedCards, setHovered, setExpandedCards } = useCardState(selectedArrayLength);

  // Getting raw interaction data
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

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setExpandedCards(Array(selectedArrayLength).fill(false));
    setExpandedTarget('');
  };

  const getTerminatingMSValue = () => (value === SENT_TAB_INDEX && expandedTarget) ? expandedTarget : node;
  const getOriginatingMSValue = () => (value === SENT_TAB_INDEX ) ? node : (expandedTarget || '');
  const getDefaultValue = () => '';

  const initialFilterKeywords = Object.fromEntries(
    edgeProperties.map(key =>
      key === 'originatingMS'
        ? [key, getOriginatingMSValue()]
        : key === 'terminatingMS'
        ? [key, getTerminatingMSValue()]
        : [key, getDefaultValue()]
    )
  );

  const sentMessageItems = sentMessages.map((message, index) => (
	<DetailCardItem
	  key={index}
	  label="Target"
	  message={message}
	  index={index}
	  hovered={hovered}
	  expanded={expandedCards[index]}
	  borderColor={message.style.stroke}
	  handleHover={handleHover}
	  handleExpandCard={handleExpandCard}
	  navigateToDetail={navigateToDetail}
	  tableData={tableData}
	/>
  ));

  const incomingMessageItems = incomingMessages.map((message, index) => (
	<DetailCardItem
	  key={index}
	  label="From"
	  message={message}
	  index={index}
	  hovered={hovered}
	  expanded={expandedCards[index]}
	  borderColor={message.style.stroke}
	  handleHover={handleHover}
	  handleExpandCard={handleExpandCard}
	  navigateToDetail={navigateToDetail}
	  tableData={tableData}
	/>
  ));
  
  useEffect(() => {
    setFilterKeywords(initialFilterKeywords);
  }, [node, expandedTarget]);

 
  return (
    <Box paddingLeft={1} paddingRight={1}>
      <CustomTabs value={value} onChange={handleTabChange}>
        <Tab icon={<SendIcon />} iconPosition="top" label="Sent" />
        <Tab icon={<MoveToInboxIcon />} label="Incoming" />
      </CustomTabs>
      <TabPanel value={value} index={SENT_TAB_INDEX}>
        <CardContainer>
          {sentMessageItems}
        </CardContainer>
      </TabPanel>
      <TabPanel value={value} index={INCOMING_TAB_INDEX}>
        <CardContainer>
          {incomingMessageItems}
        </CardContainer>
      </TabPanel>
    </Box>
  );
}
