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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

import dıa4m3 from "assets/svgs/dıa4m_last.svg";
// Material Dashboard 2 React context
import {useMaterialUIController} from "contexts/UIContext";
import {  setMiniSidenav, setWhiteSidenav } from "contexts/UIContext/uiActions";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { IconButton } from "@mui/material";
import { setToggleAppSidebar } from "contexts/UIContext/uiActions";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, whiteSidenav, darkMode, expanded  } = controller;

  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
console.log(location.pathname)

  let textColor = "white";

  if (whiteSidenav && !darkMode) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  if(location.pathname === "/feature-discovery") return null;
  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
			isExpanded={expanded}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse isExpanded={expanded} name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider key={key} light={(!darkMode && !whiteSidenav) || (darkMode && whiteSidenav)} />
      );
    }

    return returnValue;
  });
const sidenavWidth = expanded ? '10rem' : '4.4rem';
  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ whiteSidenav, miniSidenav, darkMode }} isExpanded={expanded} >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer", width:sidenavWidth }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (<MDBox component="img" src={brand} alt="Brand" width={expanded ? "2rem" : '1rem' } />
		  )
		 }
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
		  {expanded && (
			<MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
		  )}

          </MDBox>

		
        </MDBox>
		
      </MDBox>
	  <MDBox sx={{ml:!expanded ? 1 : 4 }} component="img" src={dıa4m3} alt="Brand" width={expanded ? "5.5rem" : '2.75rem'} />
	  <IconButton onClick={()=>setToggleAppSidebar(dispatch, !expanded)} sx={{position:'absolute', top:0, right: expanded ? 5 : '', left:!expanded ? 2 : ''}}  >
		 	{expanded ? <FirstPageIcon color='white'/> :  <LastPageIcon color='white'/>  }
		  </IconButton>
      <Divider light={(!darkMode && !whiteSidenav) || (darkMode && whiteSidenav)} />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
