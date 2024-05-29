import DataTable from "examples/Tables/DataTable";
import getLogsTable from "./getLogsTable";


const LogList = ({data}) =>{
	const { columns, rows } = getLogsTable(data);

		return (
			<div>
			<DataTable
			  table={{ columns, rows }}
			  isSorted={false}
			  entriesPerPage={false}
			  showTotalEntries={false}
			  noEndBorder
			/>
			</div>
		);
}

export default LogList;