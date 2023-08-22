import React from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';

import 'react-virtualized/styles.css';
import '../index.css';

import MDBox from 'components/MDBox';
import HeaderRenderer from './HeaderRenderer';
import CellRenderer from './CellRenderer';

const RawTable = ({tableData, edgeProperties}) => {

  return (
	  <MDBox className='rawTableContainer'>
		<AutoSizer>
		  {({ width, height }) => (
			<Table
			  className='table'
			  width={width}
			  height={height}
			  headerHeight={60}
			  rowHeight={80}
			  rowCount={tableData.length}
			  rowGetter={({ index }) => tableData[index]}
			>
			  {edgeProperties.map((property) => (
				<Column
				  className='column'
				  key={property}
				  headerRenderer={HeaderRenderer}
				  cellRenderer={CellRenderer}
				  label={property}
				  dataKey={property}
				  flexGrow={1}
				/>
			  ))}
			</Table>
		  )}
		</AutoSizer>
	  </MDBox>
  );
};

export default RawTable;
