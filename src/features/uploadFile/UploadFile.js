import React, { useState } from "react";
import { useFileController } from "contexts/FileContext";
import { useNavigate } from "react-router-dom";

import MDProgress from "../../components/MDProgress";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import MDBox from "components/MDBox";
import { Card } from "@mui/material";
import MDTypography from "../../components/MDTypography";

const UploadFile = () => {
  const { state, uploadFile, dispatch } = useFileController();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadStarted, setIsUploadStarted] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    let formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploadStarted(true);
    const responseData = await uploadFile(dispatch, formData, setUploadProgress);

    if (responseData) navigate("/dataset", { state: { result: responseData } });

    setIsUploadStarted(false);
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
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
          <MDButton onClick={handleUpload}>Upload</MDButton>
        </MDBox>
        <MDTypography style={{ fontSize: 12 }}>
          Maximum upload size is 10 MB
        </MDTypography>
      </MDBox>
      {isUploadStarted && <MDProgress value={uploadProgress} label="Uploading..." />}
    </Card>
  );
};

export default UploadFile;
