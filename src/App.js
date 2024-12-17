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

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "contexts/UIContext";
import {
  setMiniSidenav,
  setOpenConfigurator,
} from "contexts/UIContext/uiActions";

// Images
import brandWhite from "assets/images/sd-white-logo.png"; // brand logo
import brandDark from "assets/images/sd-black-logo.png";
import { useFileController } from "contexts/FileContext";
import elasticApmEndpoints from "network/endpoints/elasticApm";
import ElasticDashboard from "features/elastic/ElasticDashboard";
import ReactFlowWrapperTrace from "features/visualize/TraceLayout";
import TraceVisualizer from "features/visualize/TraceVisualizer";
import Traces from "features/elastic/Traces";
import MicroservicesMonitoring from "features/k8/PodsMicroservicesPage";
import VercelProjectsPanel from "features/vercel/components/VercelProjects";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { fileStateToView } = useFileController().state;
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={whiteSidenav ? brandDark : brandWhite}
            brandName="Smart Delta"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route
          path="/elastic-dashboard/:serviceName"
          element={<ElasticDashboard />}
        />
        <Route
          path="/elastic-services-traces/:serviceName"
          element={<Traces />}
        />
        <Route
          path="/elastic-services-trace-visualize/:serviceName"
          element={<TraceVisualizer />}
        />
        <Route
          path="/k8s-cluster-comparisons"
          element={<MicroservicesMonitoring />}
        />
        <Route
          path="/vercel-deployment-management/vercel-projects"
          element={<VercelProjectsPanel />}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
