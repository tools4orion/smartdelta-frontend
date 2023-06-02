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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "File Name", accessor: "fileName", align: "left" },
      {
        Header: "File Description",
        accessor: "fileDescription",
        /* width: "45%", */ align: "left",
      },
      { Header: "File ID", accessor: "fileId", align: "center" },
      { Header: "Created Date", accessor: "createdDate", align: "center" },
      { Header: "Created By", accessor: "createdBy", align: "center" },
      { Header: "File Size", accessor: "fileSize", align: "center" },
      { Header: "Delete File", accessor: "deleteButton", align: "center" },
    ],

    rows: [
      {
        fileName: <Author name="File1" />,
        fileDescription: <Job title="Manager" description="Organization" />,
        fileId: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            230418
          </MDTypography>
        ),
        createdDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        createdBy: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
        fileSize: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            234 MB
          </MDTypography>
        ),
        deleteButton: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="X" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        fileName: <Author name="File2" />,
        fileDescription: <Job title="Programator" description="Developer" />,
        fileId: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            110119
          </MDTypography>
        ),
        createdDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        createdBy: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
        fileSize: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            754 MB
          </MDTypography>
        ),
        deleteButton: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="X" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
    ],
  };
}
