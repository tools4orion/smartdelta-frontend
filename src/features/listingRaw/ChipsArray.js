import { Box, Chip, styled } from "@mui/material";
import React from "react";

const ListItem = styled('li')(({ theme }) => ({
	margin: theme.spacing(0.5),
  }));

  const getRandomColor = () => {
	const colors = ["#FF8A65", "#FFB74D", "#AED581", "#81C784", "#4DB6AC", "#4DD0E1", "#64B5F6", "#7986CB", "#9575CD", "#F06292"];
	return colors[Math.floor(Math.random() * colors.length)];
  };
  export default function ChipsArray({ data, setFilterKeywords }) {
	const handleDelete = (column) => () => {
		setFilterKeywords((prevFilterKeywords) => ({
		  ...prevFilterKeywords,
		  [column]: ""
		}));
	  };
  
	return (
	  <Box
		sx={{
		  display: 'flex',
		  flexWrap: 'wrap',
		  listStyle: 'none',
		  p: 0.5,
		  m: 0,
		  position:'fixed',
		  top:50,
		  left:2
		}}
		component="ul"
	  >
		{data.map(({ column, keyword }) => (
		  <ListItem key={column}>
			<Chip
			  label={`${column}: ${keyword}`}
			  onDelete={handleDelete(column)}
			  sx={{
              backgroundColor: getRandomColor(),
              color: "#fff",}}
			/>
		  </ListItem>
		))}
	  </Box>
	);
  }
  