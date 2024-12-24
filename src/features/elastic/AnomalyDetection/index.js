import { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AnomalyList from "./AnomalyList";
import AnomalyChart from "./AnomalyChart";
import setupMl from "../actions/setupMl";

const Anomalies = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData } = await setupMl(); // Destructure the `data` property from the response
        setData(fetchedData || []);
        if (!fetchedData || fetchedData.length === 0) {
          setText("No anomalies found");
        } else {
          setText(""); // Reset the text if data is present
        }
      } catch (error) {
        console.error("Error fetching anomalies:", error);
        setText("Failed to load anomalies");
      }
    };

    fetchData();
  }, []);

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
                  Anomalies
                </MDTypography>
              </MDBox>

              {/* Show the chart and table only if data is not empty */}
              {data.length > 0 ? (
                <>
                  <AnomalyChart data={data} />
                  <AnomalyList data={data} />
                </>
              ) : (
                <MDTypography
                  variant="h6"
                  color="text"
                  fontWeight="medium"
                  mt={4}
                  mb={2}
                  ml={4}
                >
                  {text}
                </MDTypography>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Anomalies;
