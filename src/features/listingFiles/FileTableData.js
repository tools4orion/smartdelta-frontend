/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDBadge from "../../components/MDBadge";
import { formatDate } from "../../utils/formatDate";
import Action from "./listItem/Action";
import FileName from "./listItem/FileName";

export const  getFileTableData = (attachments) => {
	let rows = [];
	console.log(attachments)
	if (attachments && attachments.length > 0) {
		rows = attachments.map((attachment) => ({
			fileName: <FileName name={attachment.fileName} />,
			fileDescription: <Action fileName={attachment.path} />,
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
				{parseFloat((attachment.fileSize/ 1024).toFixed(1))} MB
			  </MDTypography>
			),
			deleteButton: (
			  <MDBox ml={-1}>
				<MDBadge badgeContent="X" variant="gradient" size="sm" />
			  </MDBox>
			),
		  })); 
	}
  
  return {
    columns: [
      { Header: "File Name", accessor: "fileName", align: "left" },
      {
        Header: "Visualize",
        accessor: "fileDescription",
        /* width: "45%", */ align: "left",
      },
      { Header: "File ID", accessor: "fileId", align: "center" },
      { Header: "Created Date", accessor: "createdDate", align: "center" },
      { Header: "Created By", accessor: "createdBy", align: "center" },
      { Header: "File Size", accessor: "fileSize", align: "center" },
      { Header: "Delete File", accessor: "deleteButton", align: "center" },
    ],

    rows: rows,
  };
}
