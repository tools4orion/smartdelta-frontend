import MDTypography from "components/MDTypography";


const getLogsTable = (services) => {
	const columns = [
		{ Header: "Timestamp", accessor: "timestamp", align: "left" },
		{ Header: "Message", accessor: "message", align: "left" }
	  ];

	  const rows = services?.map((service) => {
		const { timestamp,message } = service || {};
	
		return {
		  timestamp: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {timestamp}
			</MDTypography>
		  ),
		  message: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {message}
			</MDTypography>
		  )
		};
	  }) || [];
	
	  return {
		columns,
		rows,
	  };
	};
	



export default getLogsTable;

