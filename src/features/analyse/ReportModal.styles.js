const styles = {
	container: {
	  width: '60vw',
	  flexGrow: 1,
	},
	paper: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	  height: 50,
	  bgcolor: 'background.default',
	},
	swipeableViews: {
	  position: 'relative',
	  borderImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%) 1',
	  borderStyle: 'solid',
	  borderBottomWidth: '2px',
	  borderLeftWidth: '0',
	  borderRightWidth: '0',
	  borderTopWidth: '0', // Remove top border
	  boxShadow: '0 2px 10px 5px rgba(65, 88, 208, 0.5)', // Adjusted box shadow
	  '::before': {
		content: '""',
		position: 'absolute',
		top: '-2px',
		left: '0',
		right: '0',
		height: '2px',
		background: 'transparent',
	  },
	},
	componentBox: {
	  marginTop: 10,
	  height: '100%',
	  display: 'block',
	  maxWidth: '100%',
	  overflow: 'hidden',
	  width: '100%',
	  minHeight: 400,
	  px: 4,
	},
  };
  
  export default styles;
  