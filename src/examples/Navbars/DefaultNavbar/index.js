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

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function DefaultNavbar({ light }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Container>
      <MDBox
        py={1}
        px={{ xs: 4, sm: 3, lg: 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow="md"
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { white, background }, functions: { rgba } }) => ({
          backgroundColor: rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: `saturate(200%) blur(30px)`,
        })}
      >
        <MDBox component={Link} to="/" py={0.75} lineHeight={1} pl={{ xs: 0, lg: 1 }}>
          <MDTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Smart Delta
          </MDTypography>
        </MDBox>
        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <DefaultNavbarLink icon="donut_large" name="dashboard" route="/dashboard" light={light} />
          <DefaultNavbarLink icon="person" name="profile" route="/profile" light={light} />
        </MDBox>
      </MDBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  light: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  light: PropTypes.bool,
};

export default DefaultNavbar;
