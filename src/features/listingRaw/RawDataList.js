/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import { useFileController } from '../../contexts/FileContext';
import { useRawData } from './useRawData';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from 'react-csv';
import {
  Zoom,
  IconButton,
  Tooltip,
  Stack,
  Box,
} from '@mui/material';
import 'react-virtualized/styles.css';
import './index.css';
import SearchBar from './SearchBar';
import FilterSideBar from './FilterSideBar/index';
import ChipsArray from './ChipsArray';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import HeaderRenderer from './components/HeaderRenderer';
import CellRenderer from './components/CellRenderer';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import AnalysisModalContent from 'features/analyse/AnalysisModalContent';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  height: 542,
  minHeight: 542,
  bgcolor: 'background.paper',


};

const isKeywordValid = (keyword) => {
  return keyword !== null && keyword !== '';
};

const RawDataList = () => {
  const { fileStateToView } = useFileController().state;
  const { directions, fileName } = fileStateToView || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterKeywords, setFilterKeywords] = useState({});
  const [isFilterIconClicked, setIsFilterIconClicked] = useState(false);
  const { edgeProperties, tableData } = useRawData(
    directions,
    searchQuery,
    filterKeywords,
    sortDirection
  );

  const toggleFilterIcon = () => {
    setIsFilterIconClicked(!isFilterIconClicked);
  };

  const handleSortClick = useCallback(() => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === 'asc' ? 'desc' : 'asc'
    );
  }, []);

  const initialFilterKeywords = edgeProperties.reduce((acc, property) => {
    return {
      ...acc,
      [property]: '',
    };
  }, {});

  useEffect(() => {
    setFilterKeywords(initialFilterKeywords);
  }, []);

  const chipsData = Object.entries(filterKeywords)
    .filter(([column, keyword]) => isKeywordValid(keyword))
    .map(([column, keyword]) => ({ column, keyword }));

  const columnStyle = {
    fontSize: '14px',
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
		keepMounted 
      >
        <Box sx={style}>
          <AnalysisModalContent />
        </Box>
      </Modal>
      <Box sx={{ position: 'fixed', left: 1, top: 5 }}>
        <SearchBar setSearchQuery={setSearchQuery} />
        <Tooltip TransitionComponent={Zoom} title={isFilterIconClicked ? 'Hide Filters' : 'Show Filters'}>
          <IconButton color="info" onClick={toggleFilterIcon}>
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Sort'} TransitionComponent={Zoom}>
          <IconButton color="info" onClick={handleSortClick}>
            <SortIcon />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title={'Download All'}>
          <IconButton>
            <CSVLink data={tableData} headers={edgeProperties}>
              <FileDownloadIcon />
            </CSVLink>
          </IconButton>
        </Tooltip>
        <Button onClick={handleOpen}>Analysis Report</Button>
      </Box>
      <ChipsArray data={chipsData} setFilterKeywords={setFilterKeywords} />
      <MDTypography sx={{ position: 'fixed', top: 6, left: 520, color: '#EDF2F7' }} variant="h5" color="success">
        {fileName}
      </MDTypography>
      <MDTypography sx={{ position: 'fixed', top: 40, left: 535, color: '#BEE3F8' }} variant="h6">
        {tableData.length} items found
      </MDTypography>
      <FilterSideBar
        isOpen={isFilterIconClicked}
        edgeProperties={edgeProperties}
        filterKeywords={filterKeywords}
        setFilterKeywords={setFilterKeywords}
      />
      <Stack>
        <MDBox style={{ width: '290vw', height: 800, overflow: 'auto', marginTop: 90 }}>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                width={width}
                height={height}
                headerHeight={60}
                rowHeight={80}
                rowCount={tableData.length}
                rowGetter={({ index }) => tableData[index]}
                style={columnStyle}
              >
                {edgeProperties.map((property) => (
                  <Column
                    style={{ display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}
                    key={property}
                    headerRenderer={HeaderRenderer}
                    cellRenderer={CellRenderer}
                    label={property}
                    dataKey={property}
                    width={350}
                    flexGrow={1}
                  />
                ))}
              </Table>
            )}
          </AutoSizer>
        </MDBox>
      </Stack>
    </>
  );
};

export default RawDataList;
