import * as React from "react";
import PropTypes from "prop-types";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import StackedLineChart from "@mui/icons-material/StackedLineChart";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { useMaterialUIController } from "contexts/UIContext";

import Box from "@mui/material/Box";
import {
  Card,
  Grid,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import elasticApmEndpoints from "network/endpoints/elasticApm";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";

import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import breakpoints from "assets/theme/base/breakpoints";

// ... (previous imports)
import aws from "../../assets/svgs/aws-icon.svg";
import lambda from "../../assets/svgs/lambda.svg";
import MDButton from "components/MDButton";
import setupMl from "./actions/setupMl";
import getServiceLogs from "./actions/getServiceLogs";
import Logs from "./Logs";

import SetupMlDialog from "./AnomalyDetection/SetupMlDialog";
import TransactionsChart from "./Transactions/TransactionChart";
import useLastPartOfUrl from "hooks/useLastPartOfUrl";
import Errors from "./Errors";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ElasticDashboard = () => {
  const [value, setValue] = useState(0);
  const lastPartOfUrl = useLastPartOfUrl();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => {
    setIsVisible(false);
  };
  const handleOpen = () => {
    setIsVisible(true);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMlSetup = async () => {
    handleOpen();
    const { data } = await setupMl();
  };
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [controller, dispatch] = useMaterialUIController();

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const [dataState, setState] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await elasticApmEndpoints.getMetrics(lastPartOfUrl);
      setState(data);
      const logs = await getServiceLogs(lastPartOfUrl);
      console.log("LOGS: ");
      console.log(logs);
    };

    fetchMetrics();
  }, []);

  const { darkMode } = controller;

  const renderSparklineChart = (data, title, yaxisLabel) => {
    const seriesData = data.map((entry) => ({
      x: new Date(entry.timestamp).getTime(),
      y: entry.duration || entry.billedDuration || entry.freeMemory,
      formattedDate: new Date(entry.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }));

    const chartOptions = {
      chart: {
        id: title.toLowerCase().replace(" ", "_"),
        group: "sparklineGroup",
        type: "area",
        height: 200,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: yaxisLabel,
          style: {
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        },
        labels: {
          style: {
            colors: darkMode ? "#FFFFFF" : "#000000",
            fontSize: "12px",
            fontWeight: "normal",
          },
        },
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return new Date(val).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });
          },
        },
      },
    };

    return (
      <Card>
        <Typography
          variant="h6"
          gutterBottom
          style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
        >
          {title}
        </Typography>
        <ReactApexChart
          options={chartOptions}
          series={[{ name: title, data: seriesData }]}
          type="area"
          height={200}
        />
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <>
        <MDBox mt={8}>
          <Card
            sx={{
              mt: -8,
              py: 2,
              px: 2,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <MDAvatar alt="profile-image" size="xl" shadow="sm" />
              </Grid>
              <Grid item>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography variant="h5" fontWeight="medium">
                    {lastPartOfUrl}
                  </MDTypography>
                  <MDButton onClick={handleMlSetup} variant="text" color="info">
                    SETUP ML
                  </MDButton>
                  <IconButton
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <img
                      width="30"
                      height="30"
                      alt=""
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPG1hc2sgaWQ9ImEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjUiIHk9IjQiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyNCI+CiAgICA8cGF0aCBkPSJNMTYuMTAxIDQuMTVhMS4xNTEgMS4xNTEgMCAwMC0xLjEzOSAwTDUuNTYgOS41NzljLS4zNTguMjAxLS41NTkuNTgtLjU1OS45ODN2MTAuODc4YzAgLjQwMi4yMjMuNzgyLjU1OS45ODNsOS40MDMgNS40MjdhMS4xNTIgMS4xNTIgMCAwMDEuMTQgMGw5LjQwMy01LjQyN2MuMzU3LS4yMDEuNTU5LS41ODEuNTU5LS45ODNWMTAuNTZjMC0uNDAyLS4yMjQtLjc4Mi0uNTU5LS45ODNsLTkuNDA0LTUuNDI3eiIgZmlsbD0iI2ZmZiIvPgogIDwvbWFzaz4KICA8ZyBtYXNrPSJ1cmwoI2EpIj4KICAgIDxwYXRoIGQ9Ik0xNi4xMDEgNC4xNWExLjE1MSAxLjE1MSAwIDAwLTEuMTM5IDBMNS41NiA5LjU3OWMtLjM1OC4yMDEtLjU1OS41OC0uNTU5Ljk4M3YxMC44NzhjMCAuNDAyLjIyMy43ODIuNTU5Ljk4M2w5LjQwMyA1LjQyN2ExLjE1MiAxLjE1MiAwIDAwMS4xNCAwbDkuNDAzLTUuNDI3Yy4zNTctLjIwMS41NTktLjU4MS41NTktLjk4M1YxMC41NmMwLS40MDItLjIyNC0uNzgyLS41NTktLjk4M2wtOS40MDQtNS40Mjd6IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CiAgICA8cGF0aCBkPSJNMjUuNTI3IDkuNTc3TDE2LjA4IDQuMTVhMS41NSAxLjU1IDAgMDAtLjI5LS4xMTJMNS4yIDIyLjE3NWMuMDg4LjEwNy4xOTQuMTk4LjMxMy4yNjhsOS40NDggNS40MjhjLjI2OC4xNTcuNTgxLjIwMS44NzEuMTEyTDI1Ljc3MyA5LjhhMS4xNzMgMS4xNzMgMCAwMC0uMjQ2LS4yMjN6IiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXIpIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI1LjU1IDIyLjQyMmMuMjY3LS4xNTcuNDY4LS40MjUuNTU4LS43MTVMMTUuNzQ0IDQuMDE3Yy0uMjY4LS4wNDUtLjU1OS0uMDIzLS44MDQuMTMzTDUuNTU5IDkuNTU2bDEwLjExOCAxOC40NWMuMTQ3LS4wMjQuMjktLjA3LjQyNC0uMTM0bDkuNDQ4LTUuNDV6IiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXIpIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI1LjU1IDIyLjQyMmwtOS40MjYgNS40MjhhMS4zNDkgMS4zNDkgMCAwMS0uNDI0LjEzNGwuMTc4LjMzNSAxMC40NTMtNi4wNTN2LS4xMzRsLS4yNjgtLjQ0N2MtLjA0NC4zMTMtLjI0NS41OC0uNTE0LjczN3oiIGZpbGw9InVybCgjcGFpbnQzX2xpbmVhcikiLz4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjUuNTUgMjIuNDIybC05LjQyNiA1LjQyOGExLjM0OSAxLjM0OSAwIDAxLS40MjQuMTM0bC4xNzguMzM1IDEwLjQ1My02LjA1M3YtLjEzNGwtLjI2OC0uNDQ3Yy0uMDQ0LjMxMy0uMjQ1LjU4LS41MTQuNzM3eiIgZmlsbD0idXJsKCNwYWludDRfbGluZWFyKSIvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjE5LjM2MyIgeTE9IjguMTk3IiB4Mj0iOS4wNTYiIHkyPSIyNC4zOTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzQxODczRiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4zMjkiIHN0b3AtY29sb3I9IiM0MThCM0QiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjM1IiBzdG9wLWNvbG9yPSIjNDE5NjM3Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjkzMiIgc3RvcC1jb2xvcj0iIzNGQTkyRCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzRkFFMkEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXIiIHgxPSIxNC4xMDQiIHkxPSIxNy4yNzMiIHgyPSIzOS45MTgiIHkyPSIzLjI0OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4xMzgiIHN0b3AtY29sb3I9IiM0MTg3M0YiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNDAzIiBzdG9wLWNvbG9yPSIjNTRBMDQ0Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjcxNCIgc3RvcC1jb2xvcj0iIzY2Qjg0OCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii45MDgiIHN0b3AtY29sb3I9IiM2Q0MwNEEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXIiIHgxPSI0LjY1NyIgeTE9IjE2IiB4Mj0iMjYuNDE2IiB5Mj0iMTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMDkyIiBzdG9wLWNvbG9yPSIjNkNDMDRBIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjI4NiIgc3RvcC1jb2xvcj0iIzY2Qjg0OCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41OTciIHN0b3AtY29sb3I9IiM1NEEwNDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuODYyIiBzdG9wLWNvbG9yPSIjNDE4NzNGIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDNfbGluZWFyIiB4MT0iNC42NTciIHkxPSIyNS4wMiIgeDI9IjI2LjQxNiIgeTI9IjI1LjAyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iLjA5MiIgc3RvcC1jb2xvcj0iIzZDQzA0QSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yODYiIHN0b3AtY29sb3I9IiM2NkI4NDgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNTk3IiBzdG9wLWNvbG9yPSIjNTRBMDQ0Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjg2MiIgc3RvcC1jb2xvcj0iIzQxODczRiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQ0X2xpbmVhciIgeDE9IjI5LjU4NiIgeTE9IjcuNjgzIiB4Mj0iMjQuMDczIiB5Mj0iMzYuNTY4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM0MTg3M0YiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMzI5IiBzdG9wLWNvbG9yPSIjNDE4QjNEIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjYzNSIgc3RvcC1jb2xvcj0iIzQxOTYzNyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii45MzIiIHN0b3AtY29sb3I9IiMzRkE5MkQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM0ZBRTJBIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+Cg=="
                      class="euiIcon euiButtonIcon__icon css-13e8g5a-euiIcon-l-inherit"
                      aria-hidden="true"
                    ></img>
                  </IconButton>
                  <IconButton
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <img width="24" height="24" src={lambda} />
                  </IconButton>
                  <IconButton
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <img width="24" height="24" src={aws} />
                  </IconButton>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <MDTypography sx={{ p: 1 }}>Service</MDTypography>
                    <MDTypography sx={{ p: 2 }}>Service version</MDTypography>
                  </Popover>
                </MDBox>
              </Grid>

              <Grid item xs={12} md={6} lg={6} sx={{ ml: "auto" }}>
                <Tabs
                  orientation={tabsOrientation}
                  value={value}
                  onChange={handleChange}
                >
                  <Tab
                    {...a11yProps(0)}
                    label="Metrics"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        <StackedLineChart />
                      </Icon>
                    }
                  />
                  <Tab
                    {...a11yProps(1)}
                    label="Logs"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        <TextSnippetIcon />
                      </Icon>
                    }
                  ></Tab>
                  <Tab
                    {...a11yProps(2)}
                    label="Transactions"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        <WaterfallChartIcon />
                      </Icon>
                    }
                  />
                  <Tab
                    {...a11yProps(3)}
                    label="Errors"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        <ErrorOutlineIcon />
                      </Icon>
                    }
                  />
                </Tabs>
              </Grid>
            </Grid>
          </Card>
        </MDBox>

        <CustomTabPanel value={value} index={0}>
          <Grid item xs={12} md={4}>
            {dataState &&
              renderSparklineChart(
                dataState.sparklineData.functionDuration,
                "Function Duration",
                "Duration"
              )}
          </Grid>
          <Grid item xs={12} md={4}>
            {dataState &&
              renderSparklineChart(
                dataState.sparklineData.billedDuration,
                "Billed Duration",
                "Billed Duration"
              )}
          </Grid>
          <Grid item xs={12} md={4}>
            {dataState &&
              renderSparklineChart(
                dataState.sparklineData.memoryUsage,
                "Memory Usage",
                "Free Memory"
              )}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Logs />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TransactionsChart />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Errors />
        </CustomTabPanel>
        <SetupMlDialog isVisible={isVisible} handleClose={handleClose} />
      </>
    </DashboardLayout>
  );
};

export default ElasticDashboard;
