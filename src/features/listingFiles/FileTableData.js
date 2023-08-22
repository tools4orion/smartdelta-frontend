import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDBadge from "../../components/MDBadge";
import { formatDate } from "../../utils/formatDate";
import Action from "./listItem/Action";
import FileName from "./listItem/FileName";
import EntityAction from "./listItem/EntityAction";
import MlAction from "./listItem/MlAction";


export const getFileTableData = (attachments) => {
  // Prepare the columns for the table
  const columns = [
    { Header: "File Name", accessor: "fileName", align: "left" },
    { Header: "Visualize", accessor: "fileDescription", align: "left" },
    { Header: "Feature Discovery", accessor: "featureDiscovery", align: "center" },
    {Header:'Predict Trends', accessor: "mlDsAnalysis", align: "center"},
    { Header: "Created Date", accessor: "createdDate", align: "center" },
    { Header: "Created By", accessor: "createdBy", align: "center" },
    { Header: "File Size", accessor: "fileSize", align: "center" },
    { Header: "Delete File", accessor: "deleteButton", align: "center" },
  ];

  // Prepare the rows for the table
  const rows = attachments?.map((attachment) => {
    const fileSizeInMB = parseFloat((attachment.fileSize / 1024).toFixed(1));

    return {
      fileName: <FileName name={attachment.fileName} />,
      fileDescription: <Action fileName={attachment.path} />,
      featureDiscovery: <EntityAction fileName={attachment.path} />,
	  mlDsAnalysis: <MlAction fileName={attachment.path} />,
      fileId: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {attachment.path}
        </MDTypography>
      ),
      createdDate: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {formatDate(attachment.createdAt)}
        </MDTypography>
      ),
      createdBy: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {attachment.owner}
        </MDTypography>
      ),
      fileSize: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {fileSizeInMB} MB
        </MDTypography>
      ),
      deleteButton: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="X" variant="gradient" size="sm" />
        </MDBox>
      ),
    };
  }) || [];

  return {
    columns,
    rows,
  };
};
