import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MDButton from 'components/MDButton';
import csvFile from 'assets/svgs/csv-fileIcon.webp';
import fileQuestion from 'assets/svgs/fileQuestion.webp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFileController } from 'contexts/FileContext';
import MDTypography from 'components/MDTypography';
import FadeIn from 'hooks/FadeIn';
import ComparisonCheckboxes from './ComparisonCheckboxes';
import { useRawData } from 'features/featureDiscovery/useRawData';
import analysisEndpoints from 'network/endpoints/analysis';


const ComparisonDialog = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { dispatch, toggleComparisonBox, displayComparisonResult , removeCompareFile, state } = useFileController();
  const { selectedFilesToCompare, isComparisonBoxVisible } = state;
  const dialogText = isLoading
    ? null
    : selectedFilesToCompare.length == 2
    ? `Compare ${selectedFilesToCompare[0].fileName} vs ${selectedFilesToCompare[1].fileName}`
    : selectedFilesToCompare.length == 1
    ? 'Choose a log file to pair with "' + selectedFilesToCompare[0].fileName + '"'
    : 'Please select a pair of log files from the file list to compare';
	const file1Rows= useRawData(selectedFilesToCompare[0]?.directions || null, '', {}, 'asc');
	console.log(file1Rows);
	const file2Rows =  useRawData(selectedFilesToCompare[1]?.directions || null, '', {}, 'asc');
	console.log(file2Rows);
  const handleClose = async() => {
    toggleComparisonBox(dispatch, false);
	const comparisonData = {
		filePath1: selectedFilesToCompare[0]?.path,
		filePath2: selectedFilesToCompare[1]?.path,
	  };
	 const { data } = await analysisEndpoints.compareFiles(comparisonData);
	 displayComparisonResult(dispatch, data);
	 

  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const bgStyles = {
    background: '#360033',
    /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #0b8793, #360033)',
    /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #0b8793, #360033)',
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  };


  return (
    <Dialog
      fullScreen={fullScreen}
      open={isComparisonBoxVisible}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle sx={bgStyles} id="responsive-dialog-title">
        {"Compare Log Files"}
      </DialogTitle>
      <DialogContent sx={bgStyles}>
        <DialogContentText>{dialogText}</DialogContentText>
        {selectedFilesToCompare.length === 0 ? null : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              background: '#360033',
              /* fallback for old browsers */
              background: '-webkit-linear-gradient(to right, #0b8793, #360033)',
              /* Chrome 10-25, Safari 5.1-6 */
              background: 'linear-gradient(to right, #0b8793, #360033)',
              /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}
          >
            <div style={{ position: 'relative', width: '160px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img width="100" src={csvFile} alt="compare" />
              {isHovered && (
                <IconButton
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                  }}
                  onClick={() => {
                    removeCompareFile(dispatch, selectedFilesToCompare[0]?.fileName);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <MDTypography variant="h6" color="white">
                {selectedFilesToCompare[0]?.fileName}
              </MDTypography>
            </div>
            <CompareArrowsIcon fontSize="large" color="white" style={{ marginRight: '48px' }} />
            <div style={{ position: 'relative', width: '160px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <FadeIn>
                <img width="100" src={selectedFilesToCompare.length === 2 ? csvFile : fileQuestion} alt="compare" />
              </FadeIn>
              {selectedFilesToCompare.length === 2 && isHovered && (
                <IconButton
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                  }}
                  onClick={() => {
                    removeCompareFile(dispatch, selectedFilesToCompare[selectedFilesToCompare.length - 1]?.fileName);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <MDTypography variant="h6" color="white">
                {selectedFilesToCompare.length === 2
                  ? selectedFilesToCompare[selectedFilesToCompare.length - 1]?.fileName
                  : 'go to file list to select  '}
              </MDTypography>
            </div>
          </div>
        )}
        <ComparisonCheckboxes/>
        {selectedFilesToCompare.length === 2 && (
          <FormControl style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '1rem' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Specify How to Compare</FormLabel>
            <RadioGroup name="row-radio-buttons-group" style={{ paddingLeft: '2rem' }}>
              <FormControlLabel value="female" control={<Radio />} label="compare trends" />
              <FormControlLabel value="male" control={<Radio />} label="find anomaly big differences" />
              <FormControlLabel value="other" control={<Radio />} label="compare most frequent messages" />
            </RadioGroup>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions sx={bgStyles}>
        <MDButton onClick={handleClose} autoFocus>
          Compare
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

export default ComparisonDialog;
