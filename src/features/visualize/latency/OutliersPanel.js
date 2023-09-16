import React from 'react';
import MDTypography from 'components/MDTypography';

import { Chip, Stack } from '@mui/material';
import useOutliers from './hooks/useOutliers';
import { useFileController } from 'contexts/FileContext';
import AccordionItem from './AccordionItem';

const OutliersPanel = () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { state } = useFileController();
  const { fileStateToView } = state ?? {};
  const directions = fileStateToView?.directions;
  const outliers = useOutliers(directions);

  return (
    <Stack spacing={2} sx={{ height: '70vh', overflowY: 'auto', padding: '24px' }} >
      <Stack>
        <MDTypography variant="body2">Outliers</MDTypography>
        <Chip size="small" sx={{ width: 64, backgroundColor: '#FFB74D' }} label="0.01%" />
      </Stack>
      {Object.entries(outliers).map(([key, value], index) => {
        if (value.length > 0) {
          return (
            <AccordionItem
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              title={`${key} Outliers(${value.length})`}
              data={value}
            />
          );
        }
        return null;
      })}
    </Stack>
  );
};

export default OutliersPanel;
