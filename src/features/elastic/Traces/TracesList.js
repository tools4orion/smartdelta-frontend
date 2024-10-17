import DataTable from "examples/Tables/DataTable";
import getTracesTable from "./getTracesTable";

const TracesList = ({ data }) => {
  const { columns, rows } = getTracesTable(data);

  return (
    <DataTable
      table={{ columns, rows }}
      isSorted={true}
      entriesPerPage={false}
      showTotalEntries={true}
      noEndBorder
    />
  );
};

export default TracesList;
