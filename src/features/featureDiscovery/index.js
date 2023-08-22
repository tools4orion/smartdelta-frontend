import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
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
  Box,
  Fade
} from '@mui/material';
import 'react-virtualized/styles.css';
import './index.css';
import SearchBar from './components/SearchBar';
import FilterSideBar from './components/FilterSideBar/index';

import ChipsArray from './components/ChipsArray';
import MDTypography from 'components/MDTypography';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import RawDataSkeleton from './components/Skeleton/RawDataSkeleton';
import RawTable from './components/RawTable';
import { useLocation } from 'react-router-dom';


const AnalysisModalContent = lazy(() => import('features/analyse/AnalysisModalContent'));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  height: '33.875rem',
  minHeight: '33.875rem',
  bgcolor: '#f0f2f5',
};

const isKeywordValid = (keyword) => {
  return keyword !== null && keyword !== '';
};

const FeatureDiscovery = () => {
  const location = useLocation();
  const { state: routeState } = location;
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
  const [isVisible, setIsVisible] = React.useState(false);
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    // Only set the initial filter keywords if fileStateToView is null
    if (!fileStateToView) {
      setFilterKeywords(initialFilterKeywords);
    }
	setIsVisible(fileStateToView );
  }, [fileStateToView]);

  useEffect(() => {
    if (routeState && routeState.filterData) {
      // Set the filterKeywords state based on the passed state
      setFilterKeywords(routeState.filterData);
    }else{
		setFilterKeywords(initialFilterKeywords);
	}
    setIsVisible(fileStateToView);
  }, [routeState, fileStateToView]);

 
  const chipsData = Object.entries(filterKeywords)
    .filter(([column, keyword]) => isKeywordValid(keyword))
    .map(([column, keyword]) => ({ column, keyword }));

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
          <Suspense fallback={<div>Loading...</div>}>
		  <Fade in={open} appear='false' timeout={1200}>
		  <div>
            <AnalysisModalContent />
			</div>
			</Fade>
          </Suspense>
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

      {fileStateToView ? (
		<>
		<Fade in={isVisible} appear='false' timeout={1200}>
		<div>
        <RawTable tableData={tableData} edgeProperties={edgeProperties} />
		<MDTypography sx={{ position: 'fixed',  top: '0.375rem',
  left: '32.5rem',  color: '#EDF2F7' }} variant="h5" color="success">
        {fileName}
      </MDTypography>
	  <MDTypography
      sx={{
        position: 'fixed',
        top: '2.5rem', // Equivalent to 40px
        left: '33.4375rem', // Equivalent to 535px
        color: '#BEE3F8',
      }}
      variant="h6"
    >
      {tableData.length} items found
    </MDTypography>
		<FilterSideBar
        isOpen={isFilterIconClicked}
        edgeProperties={edgeProperties}
        filterKeywords={filterKeywords}
        setFilterKeywords={setFilterKeywords}
      />
	  </div>
		</Fade>
		</>
      ) : (
       <RawDataSkeleton/>
      )}
    </>
  );
};

export default FeatureDiscovery;
