import React, { useState } from 'react';

const useCardState = (arrayLength) => {
	const [hovered, setHovered] = useState(Array(arrayLength).fill(false));
	const [expandedCards, setExpandedCards] = useState(Array(arrayLength).fill(false));
	
	return {
	  hovered,
	  expandedCards,
	  setHovered,
	  setExpandedCards,
	};
  };
  
 export default useCardState;