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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import React from "react";
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";


// import Billing from "layouts/billing";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import Visualizer from "features/visualize";

// @mui icons
import Icon from "@mui/material/Icon";
import SchemaIcon from '@mui/icons-material/Schema';

import FileManagementLayout from "pages/FileManagementLayout";
import { lazy, Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress'
import MDTypography from "components/MDTypography";


// ...
import MDBox from "components/MDBox";
import ClusterIntegration from "features/k8/ClusterIntegration";

const FeatureDiscovery = lazy(() => import('features/featureDiscovery'));

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "File Upload",
    key: "fileUpload",
    icon: <Icon fontSize="small">file_upload</Icon>,
    route: "/file-upload",
    component: <FileManagementLayout />,
  },
  {
    type: "collapse",
    name: "Feature Discovery",
    key: "feature-discovery",
    icon: <Icon fontSize="small">science</Icon>,
    route: "/feature-discovery",
    component: 
	<Suspense fallback={<>
		<LinearProgress/>
		<MDBox sx={{mx:'auto'}}>
		<MDTypography  style={{textAlign:'center' }} variant="h4">
			Loading, please wait ...
		</MDTypography>
		</MDBox>
	</>}>
		<FeatureDiscovery />
	</Suspense> ,
  },
  {
    type: "collapse",
    name: "Mapping Visualizer",
    key: "visualizer",
    icon: <Icon fontSize="small">schema</Icon>,
	route: "/visualizer",
    component: <Visualizer/>,
  },
  {
    type: "collapse",
    name: "Kubernetes Cluster",
    key: "k8Cluster",
    icon: <Icon fontSize="small">cloud</Icon>,
    route: "/k8Cluster",
    component: <ClusterIntegration/>,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
