import DataTable from "examples/Tables/DataTable";
import getAnomaliesTable from "./getAnomaliesTable";

const AnomalyList = ({data}) =>{
	const { columns, rows } = getAnomaliesTable(data);

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

export default AnomalyList;