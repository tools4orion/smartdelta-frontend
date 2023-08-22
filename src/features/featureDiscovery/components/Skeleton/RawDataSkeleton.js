import {
	Stack,
	styled,
	Fade,
	Skeleton
  } from '@mui/material';
import MDBox from 'components/MDBox';
import { AutoSizer, Table, Column } from 'react-virtualized';
const columnStyle = {
    fontSize: '14px',
  };


const SkeletonWrapper = styled(Skeleton)(({ theme }) => ({
	backgroundColor: '#2A4365', // Light gray color
	width: 150,
	height: 22.75,
  }));
  const dummyColumnHeaders = ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6'];

const createDummyRowData = () => {
  const rowData = [];
  for (let i = 0; i < 6; i++) {
    const row = { id: `skeleton-${i}` };
    for (const property of dummyColumnHeaders) {
      row[property] = ''; // Add empty value for each property
    }
    rowData.push(row);
  }
  return rowData;
};

const dummyRowData = createDummyRowData(); 
  const RawDataSkeleton = () => {
	return (
	  <Stack>
		{/* Skeleton for file name */}
		<SkeletonWrapper style={{ position: 'fixed', top: 6, left: 520, color: 'white' }} variant="text" width={200} height={32} />
		{/* Skeleton for items found */}
		<SkeletonWrapper style={{ position: 'fixed', top: 40, left: 520, color: 'white' }} variant="text" width={200} height={24} />
		{/* You can add more Skeleton placeholders for other sections */}
		<MDBox style={{ width: '290vw', height: 800, overflow: 'auto', marginTop: 90 }}>
		  <AutoSizer>
			{({ width, height }) => (
			  <Table
				width={width}
				height={height}
				headerHeight={60}
				rowHeight={80}
				rowCount={dummyRowData.length}
				rowGetter={({ index }) => dummyRowData[index]}
				style={columnStyle}
			  >
				{dummyColumnHeaders.map((property) => (
				  <Column
					style={{ display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}
					key={property}
					headerRenderer={() => <SkeletonWrapper variant="text" />}
					cellRenderer={() => <SkeletonWrapper variant="text" />}
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
	);
  };
  
 

  export default RawDataSkeleton;