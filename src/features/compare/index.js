import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DonutComparisonChart from "./DonutComparisonCharts";
import FadeIn from "hooks/FadeIn";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import csvFile from "assets/svgs/csv-fileIcon.webp";
import { useFileController } from "contexts/FileContext";
import fileQuestion from "assets/svgs/fileQuestion.webp";
import NestedList from "./NestedList";
import { useMaterialUIController } from "contexts/UIContext";
import { Box } from "@mui/system";

const ComparisonResult = () => {
  const { state } = useFileController();
  const { selectedFilesToCompare } = state;
  const [controller, _] = useMaterialUIController();
  const { darkMode } = controller;

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
                  Comparison Result
                </MDTypography>
              </MDBox>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "26px",
                  padding: "2r</MDTypography>em",
                }}
              >
                <div
                  style={{
                    width: "160px",
                    textAlign: "center",
                  }}
                >
                  <img width="100" src={csvFile} alt="compare" />
                  <MDTypography
                    variant="h6"
                    color={darkMode ? "white" : "#344767"}
                  >
                    {selectedFilesToCompare[0]?.fileName}
                  </MDTypography>
                </div>
                <Box>
                  <CompareArrowsIcon
                    fontSize="large"
                    color={darkMode ? "white" : "#344767"}
                  />
                </Box>
                <div
                  style={{
                    position: "relative",
                    width: "160px",
                    textAlign: "center",
                  }}
                >
                  <FadeIn>
                    <img
                      width="100"
                      src={
                        selectedFilesToCompare.length === 2
                          ? csvFile
                          : fileQuestion
                      }
                      alt="compare"
                    />
                  </FadeIn>

                  <MDTypography
                    variant="h6"
                    color={darkMode ? "white" : "#344767"}
                  >
                    {selectedFilesToCompare.length === 2
                      ? selectedFilesToCompare[
                          selectedFilesToCompare.length - 1
                        ]?.fileName
                      : "go to file list to select  "}
                  </MDTypography>
                </div>
              </div>

              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                px={4}
                py={8}
              >
                <DonutComparisonChart fileNo={1} />
                <DonutComparisonChart fileNo={2} />
              </MDBox>

              <MDBox
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                px={2}
                py={2}
              >
                <NestedList fileNo={1} />
                <NestedList fileNo={2} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};
export default ComparisonResult;
