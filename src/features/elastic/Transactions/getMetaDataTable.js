import MDTypography from "components/MDTypography";

import {
	Tooltip,

  } from '@mui/material';
import ServiceAction from "../actions/ServiceAction";

const getMetaDataTable = (services) => {
	const columns = [
		{ Header: "Name", accessor: "name", align: "left" },
		{ Header: "Environment", accessor: "environment", align: "left" },
		{ Header: "Framework", accessor: "framework", align: "center" },
		{ Header: "Runtime", accessor: "runtime", align: "center" },
		{ Header: "Version", accessor: "version", align: "center" },
		{ Header: "Action", accessor: "action", align: "center" },
	  ];
	
	
	
	  const rows = services?.map((service) => {
		const { runtime ,environment, framework , name, version } = service || {};
		console.log(service);
		const shortenedName = name.length > 30 ? name.substring(0, 37) + "..." : name;
	
	
		return {
		  name: (
			<Tooltip title={name} >
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {shortenedName}
			</MDTypography>
			</Tooltip>
		  ),
		  environment: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {environment}
			</MDTypography>
		  ),
		  framework: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			 {framework.name}
			</MDTypography>
		  ),
		  version: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {version}
			</MDTypography>
		  ),
		  runtime: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {runtime.name}
			</MDTypography>
		  ),
		  action: (
			<ServiceAction name={ name } />
		  ),
		};
	  }) || [];
	
	  return {
		columns,
		rows,
	  };
	};
	



export default getTransactionsTable;

