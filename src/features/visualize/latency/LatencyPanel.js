import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { useFileController } from 'contexts/FileContext';
import VersionServiceLatency from 'features/analyse/reports/latency/VersionServiceLatency';
import CorrelationLatency from 'features/analyse/reports/latency/CorrelationLatency';
import noDataIcon from '../../../assets/svgs/page.svg';
import MDTypography from 'components/MDTypography';
import useLatencyData from './hooks/useLatencyData';

const NoDataComponent = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <MDTypography variant="body2" align="center">
        No data available
      </MDTypography>
      <img src={noDataIcon} alt="No data" width="70rem" />
      <MDTypography variant="body2">
        Message type is not request
      </MDTypography>
    </Stack>
  );
};

export default function LatencyPanel({ node, currentView }) {
  const [chartType, setChartType] = useState('line'); // Default chart type

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Manage cards states
  const [expandedTarget, setExpandedTarget] = useState('');

  // Getting related latency data
  const { state } = useFileController();
  const { fileStateToView } = state ?? {};
  const directions = fileStateToView?.directions;
  const tableData = useLatencyData(directions, node);

  const viewComponentMap = {
    VersionServiceLatency: <VersionServiceLatency data={tableData} chartType={chartType} />,
    CorrelationChart: <CorrelationLatency data={tableData} chartType={chartType} />,
  };

  const selectedComponent = tableData.length === 0 ? <NoDataComponent /> : viewComponentMap[currentView] || <NoDataComponent />;

  useEffect(() => {

  }, [node, expandedTarget]);

  return (
    <Box
      paddingLeft={1}
      paddingRight={1}
      style={{
        position: 'sticky',
        overflowY: 'auto',
        overflowX: 'none',
        height: '56vh',
        marginBottom: '1rem'
      }}
    >
      {tableData.length && (
        <RadioGroup
          row
          value={chartType}
          onChange={handleChartTypeChange}
          aria-label="chart-type"
        >
          <FormControlLabel value="line" control={<Radio />} label="Line Chart" />
          <FormControlLabel value="scatter" control={<Radio />} label="Scatter Plot" />
        </RadioGroup>
      )}
      {selectedComponent}
    </Box>
  );
}
