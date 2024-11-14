import React, { useState } from "react";
import { Stack, TextField, Breadcrumbs, Tooltip, styled } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MDTypography from "components/MDTypography";
import { getOperatingSystem } from "utils/getOS";
import CopyToClipboard from "react-copy-to-clipboard";
import "../index.css";

import useSnackbar from "hooks/useSnackbar";
import MDSnackbar from "components/MDSnackbar";

const BreadcrumbSeparator = styled("span")({
  color: "white",
  margin: "0 8px",
});

const RightAngleArrowIcon = styled("span")({
  fontSize: "24px",
  transform: "rotate(90deg)",
  marginLeft: "4px",
});

const CodeBlock = styled("pre")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  color: "#AAAAAA",
  borderRadius: theme.spacing(1),
  fontFamily: "monospace",
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
  overflowX: "auto",
}));

const AuthFormInputs = ({ selectedTab, formInputs, handleFormInputChange }) => {
  const [isCopied, setIsCopied] = useState(false);
  const snackbar = useSnackbar();
  const { isOpen, closeSnackbar, message, icon, title, type } = snackbar;


  const getProviderName = () => {
    const providers = [
      "Google Cloud",
      "AWS ECS",
      "Microsoft Azure AKS",
      "Bare Metal Server",
      "Local Server",
    ];
    return providers[selectedTab];
  };

  const codeExample =
    getProviderName() === "Google Cloud"
      ? "gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${REGION} && cat ~/.kube/config | xsel -ib"
      : "cat ~/.kube/config | pbcopy";

  const gcloudItems = [
    "Copy the command below to get auth credentials",
    "Paste in Terminal",
  ];

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    snackbar.openSnackbar(
      "Paste In your terminal",
      "success",
      "Copied to clipboard"
    );
  };

  const renderCopyCmd = (operatingSystem) => {
    const copyCommands = {
      Linux: "xsel -ib",
      "Mac OS": "pbcopy",
      Windows: "clip",
    };

    return copyCommands[operatingSystem] || "xsel -ib";
  };


  return (
    <Stack spacing={2}>
      <MDTypography variant="h5">
        {getProviderName()} Guide For {getOperatingSystem()}
      </MDTypography>
      <Breadcrumbs
        separator={
          <BreadcrumbSeparator>
            <RightAngleArrowIcon>&#8250;</RightAngleArrowIcon>
          </BreadcrumbSeparator>
        }
      >
        {gcloudItems.map((item, index) => (
          <MDTypography variant="h6" key={index}>
            {item}
          </MDTypography>
        ))}
      </Breadcrumbs>
      <CopyToClipboard text={codeExample} onCopy={handleCopyToClipboard}>
        <div style={{ position: "relative" }}>
          <Tooltip title="Copy">
            <ContentCopyIcon className="copyIcon" />
          </Tooltip>
          {getProviderName() === "Google Cloud" ? (
          <CodeBlock>
            <span className="logoBlue"> gcloud </span>
            container clusters <span className="logoRed">get-credentials</span>{" "}
            <span className="logoYellow">CLUSTER_NAME</span> --zone{" "}
            <span className="logoYellow">ZONE</span> cat
            <span className="logoGreen"> ~/.kube/config</span> |{" "}
            <span className="logoBlue">{renderCopyCmd(getOperatingSystem())}</span>
          </CodeBlock>
        ) : (
          <CodeBlock>
            <span className="logoBlue">cat</span> {" "}
            ~/.kube/config {" "}
            <span className="logoGreen">| pbcopy</span>
            </CodeBlock>
        )}
        </div>
      </CopyToClipboard>
      <TextField
        label="Kubeconfig Content"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={formInputs.kubeconfig}
        onChange={(e) => handleFormInputChange("kubeconfig", e.target.value)}
      />
      <MDSnackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={message}
        icon={icon}
        close={closeSnackbar}
        title={title}
        color={type}
      >
        <p>{snackbar.message}</p>
      </MDSnackbar>
    </Stack>
  );
};

export default AuthFormInputs;
