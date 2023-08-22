import MDBox from 'components/MDBox';

const CellRenderer = ({ cellData }) => {
	return (
	  <MDBox
		display="inline-block"
		width="max-content"
		color="text"
		sx={{ verticalAlign: "middle" }}
	  >
		{cellData}
	  </MDBox>
	);
  };

  export default  CellRenderer;