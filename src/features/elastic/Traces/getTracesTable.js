import MDTypography from "components/MDTypography";
import { Tooltip } from "@mui/material";
import ServiceAction from "../actions/ServiceAction";
import TracesAction from "../actions/TracesAction";

const getTracesTable = (traces) => {
  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "ID", accessor: "id", align: "center" },
    { Header: "Timestamp", accessor: "timestamp", align: "center" },
    { Header: "Visualize Trace", accessor: "action", align: "center" },
  ];

  const rows =
    Object.values(traces)?.map((trace) => {
      const { name, id, timestamp } = trace || {};

      const shortenedName =
        name.length > 30 ? name.substring(0, 30) + "..." : name;
      return {
        name: (
          <Tooltip title={name}>
            <MDTypography
              component="a"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {shortenedName}
            </MDTypography>
          </Tooltip>
        ),
        id: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {id}
          </MDTypography>
        ),
        timestamp: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {new Date(timestamp).toLocaleString()}
          </MDTypography>
        ),
        action: <TracesAction name={name} selectedData={trace} />,
      };
    }) || [];

  return {
    columns,
    rows,
  };
};

export default getTracesTable;
