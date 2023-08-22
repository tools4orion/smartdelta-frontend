import MDBox from 'components/MDBox';
const HeaderRenderer = ({ label }) => {
	return (
	  <MDBox
		display="inline-block"
		width="max-content"
		color="text"
		sx={{ verticalAlign: "middle", minWidth:'150px', maxWidth:'200px' }}
	  >
		{label}
	  </MDBox>
	);
  };

export default HeaderRenderer;
  