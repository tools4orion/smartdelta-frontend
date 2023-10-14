import { Sidebar ,Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import dıa4m3 from "assets/svgs/dıa4m_last.svg";
import MDBox from 'components/MDBox';
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import brandWhite from "assets/images/sd-white-logo.png"; // brand logo
import { useLocation, NavLink } from "react-router-dom";
import brandDark from "assets/images/sd-black-logo.png";
import MDTypography from 'components/MDTypography';
import { useMaterialUIController } from 'contexts/UIContext';
import { Divider, Link } from '@mui/material';
import SidenavCollapse from 'examples/Sidenav/SidenavCollapse';
import SidenavRoot from 'examples/Sidenav/SidenavRoot';
import SidebarRoot from './SidebarRoot';


function CustomProSidebar({brandName, routes, ...rest }) {
	const [controller, dispatch] = useMaterialUIController();
	const { miniSidenav, whiteSidenav, darkMode } = controller;
	const location = useLocation();
	const collapseName = location.pathname.replace("/", "");
	let textColor = "white";

	if (whiteSidenav && !darkMode) {
	  textColor = "dark";
	} else if (whiteSidenav && darkMode) {
	  textColor = "inherit";
	}

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
			  />
			</Link>
		  ) : (
			<NavLink key={key} to={route}>
			  <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
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
	
  
 return(
<SidebarRoot {...rest} variant="permanent" ownerState={{ whiteSidenav, miniSidenav, darkMode }}>
  <MDBox component={NavLink} to="/" display="flex" alignItems="center">
  <MDBox component="img" src={brandDark} alt="Brand" width="2rem" />
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>


  <MDBox sx={{ml:4}} component="img" src={dıa4m3} alt="Brand" width="5.5rem" />

	{/*
	image to be added here
	*/}

  <Menu iconShape="square">
    {renderRoutes}
  </Menu>
</SidebarRoot>
 );
}

export default CustomProSidebar;