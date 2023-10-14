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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "contexts/UIContext";
import { Tooltip } from "@mui/material";

function SidenavCollapse({ icon, name, isExpanded, active, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, whiteSidenav, darkMode, sidenavColor, expanded } = controller;

  return (
    <ListItem component="li">
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
            whiteSidenav,
            darkMode,
            sidenavColor,
          })
        }
      >
	  <Tooltip title={name} placement="right">
        <ListItemIcon sx={(theme) => collapseIconBox(theme, { whiteSidenav, darkMode, active, expanded })}>
          {typeof icon === "string" ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
		  
        </ListItemIcon>
		</Tooltip>
			{isExpanded ? <ListItemText
          primary={name}
          sx={(theme) =>
            collapseText(theme, {
              miniSidenav,
              whiteSidenav,
              active,
            })
          }
        /> : ''}
        
      </MDBox>
    </ListItem>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default SidenavCollapse;
