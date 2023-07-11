/* eslint-disable no-console */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import Tables from "layouts/file-table";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    const fileUploadUrl = "http://localhost:3002/attachment/upload";
    data.append("file", selectedFile);
    axios
      .post(fileUploadUrl, data)
      .then((response) => {
        console.log(response.data);
        // TODO: async await ekleyip bu sayfada file upload loading eklemeliyim
        navigate("/visualizer", { state: { result: response.data } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Upload your &apos;.csv&apos; files
                </MDTypography>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                py={6}
              >
                <MDBox display="flex" justifyContent="center" alignItems="center">
                  <MDInput
                    type="file"
                    InputProps={{
                      inputProps: {
                        accept: ".csv",
                      },
                    }}
                    name="file"
                    onChange={onChangeHandler}
                  />
                  <MDButton onClick={onClickHandler}>Upload</MDButton>
                </MDBox>
                <MDTypography style={{ fontSize: 12 }}>Maximum upload size is 10 MB</MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <Tables />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FileUpload;
