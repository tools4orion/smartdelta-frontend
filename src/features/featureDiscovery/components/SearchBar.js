import React, { useState } from 'react';
import {  IconButton, Tooltip,  styled, TextField, InputAdornment, Zoom } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')({
	display: 'inline-flex',
	alignItems: 'center',
	marginBottom: 20,
  });
  
  const SearchIconButton = styled(IconButton)(({ theme, isSearchOpen }) => ({
	borderRadius: '50%',
	padding: theme.spacing(0.5),
	backgroundColor: isSearchOpen ? theme.palette.error.main : theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	transition: 'background-color 0.3s ease',
	'&:hover': {
	  backgroundColor: isSearchOpen ? theme.palette.error.dark : theme.palette.primary.dark,
	},
  }));
  
  const SearchInputContainer = styled('div')(({ isOpen, width }) => ({
	position: 'relative',
	height: '100%',
	width: isOpen ? width : 0,
	transition: 'width 0.3s ease',
  }));
  
  const SearchBar = ({setSearchQuery}) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [inputWidth, setInputWidth] = useState(0);

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	  };
	  
  
	const handleSearchIconClick = () => {
	  setIsSearchOpen(!isSearchOpen);
	  setInputWidth(isSearchOpen ? 0 : 200); // Set the desired width of the search input container
	};
  
	return (
	  <SearchContainer>
	  <SearchInputContainer isOpen={isSearchOpen} width={inputWidth}>
		  <TextField
			id="input-with-icon-textfield"
			InputProps={{
			  startAdornment: (
				isSearchOpen && (
				<InputAdornment position="start">
				  <SearchIcon/>
				</InputAdornment>
				)
			  ),
			}}
			onChange={handleSearchInputChange}
			variant="standard"
			autoFocus
			placeholder="Search..."
			fullWidth
		  />
		</SearchInputContainer>
		<Tooltip  TransitionComponent={Zoom}  title={isSearchOpen ? 'Hide search' : 'Show search'}>
		  <SearchIconButton
			onClick={handleSearchIconClick}
			aria-label={isSearchOpen ? 'Hide search' : 'Show search'}
			isSearchOpen={isSearchOpen}
		  >
			{isSearchOpen ? <SearchOffIcon /> : <SearchIcon />}
		  </SearchIconButton>
		</Tooltip>
		
	  </SearchContainer>
	);
  };
  export default SearchBar;