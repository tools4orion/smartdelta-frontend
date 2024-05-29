import React from "react";
import { Card, Grid, MenuItem, InputLabel, IconButton, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import getErrors from "../actions/getErrors";
import useLastPartOfUrl from "hooks/useLastPartOfUrl";
import ErrorStackTrace from "./ErrorStackTrace";
import gptEndpoints from "network/endpoints/gpt";
import ErrorTreeMap from "./ErrorTreeMap";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getDateForFilter } from "utils/getDateForFilter";
import { StyledSkeleton } from "./ErrorItem";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChipsArray from "features/featureDiscovery/components/ChipsArray";
import { isKeywordValid } from "features/featureDiscovery";
import MDTypography from "components/MDTypography";

const Errors = () => {
	const [data, setData] = useState(null);
	const [text, setText] = useState('');
	const lastPartOfUrl = useLastPartOfUrl();
	const [date, setDate] = React.useState(4);
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [filters, setFilters] = useState({traceId:'',spanId:'',textToInclude:''});

	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
  

    const chipsData = Object.entries(filters)
    .filter(([column, keyword]) => isKeywordValid(keyword))
    .map(([column, keyword]) => ({ column, keyword }));
	const handleChange = (event) => {
		setDate(event.target.value);
	  }
	  console.log('CHIPS DATA: ', chipsData)

	const output = data?.length > 0 ? (<><ErrorTreeMap errors={data} /><ErrorStackTrace errors={data} /></>):<MDTypography>No Error found</MDTypography>;
	
	useEffect(async() => {
		setIsLoading(true);
			const formattedDate = getDateForFilter(date);
			const data = await getErrors(lastPartOfUrl, formattedDate,filters);
			setData(data);
			setIsLoading(false);
			console.log(data);
			if(data.length === 0) setText('No Errors found');
		
	
		
}, [setDate, date, filters]);
  return(
	<MDBox mt={12}>
	   <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={date}
          label="Date"
          onChange={handleChange}
		  sx={{
              height: '42px'
            }}
        >
          <MenuItem value={1}>Last 15 Minute</MenuItem>
          <MenuItem value={2}>Last 1 Hour</MenuItem>
          <MenuItem value={3}>Last 24 Hours</MenuItem>
		  <MenuItem value={4}>Last 7 Days</MenuItem>
		  <MenuItem value={5}>This Month</MenuItem>
        </Select>
     
      </FormControl>
	  <Tooltip title="Filter">
	  <IconButton variant="outlined" onClick={handleClickOpen}>
	  <FilterAltIcon color="white" />
      </IconButton>
	  </Tooltip>
	  <ChipsArray data={chipsData} setFilterKeywords={setFilters} />
	  <MDBox component="form" role="form" >
      <Dialog
	
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
			console.log("FORMJSONNNNNN: ");
			console.log(formJson);
			setFilters(formJson);
    
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{backgroundColor:'#1A2035'}}  >Filters</DialogTitle>
        <DialogContent sx={{backgroundColor:'#1A2035'}} >
          <DialogContentText>
            Filter Errors by one or multiple fields below
          </DialogContentText>
          <TextField
            
			color="warning"
           
            margin="dense"
            id="name"
            name="traceId"
            label="Trace Id"
            type="text"
            fullWidth
          
          />
		    <TextField
            
			color="warning"
        
            margin="dense"
            id="name"
            name="spanId"
            label="Span Id"
            type="text"
            fullWidth
          
          />
		    <TextField
            
			color="warning"
    
            margin="dense"
            id="name"
            name="textToInclude"
            label="Include in Log Message"
            type="text"
            fullWidth
          
          />
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#1A2035'}}  >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Apply</Button>
        </DialogActions>
      </Dialog>
	  </MDBox>
    </div>
	
	{isLoading ? <><StyledSkeleton variant="text" width={'95%'} height={500} />
	<StyledSkeleton variant="text" width={'100%'} height={100} />
	<StyledSkeleton variant="text" width={'100%'} height={100} />
	<StyledSkeleton variant="text" width={'100%'} height={100} />
	<StyledSkeleton variant="text" width={'100%'} height={100} /></> :( output
		
	)}
	

			
			  </MDBox>
		

  )


};
export default Errors;