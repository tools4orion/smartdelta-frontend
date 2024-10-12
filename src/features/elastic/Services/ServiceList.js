import DataTable from "examples/Tables/DataTable";
import getServicesTable from "./getServicesTable";

const ServiceList = ({ data }) => {
  const { columns, rows } = getServicesTable(data);

  return (
    <DataTable
      table={{ columns, rows }}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      noEndBorder
    />
  );
};

export default ServiceList;
