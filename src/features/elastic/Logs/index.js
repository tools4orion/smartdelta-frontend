import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import getServiceLogs from "../actions/getServiceLogs";
import LogList from "./LogList";
import useLastPartOfUrl from "hooks/useLastPartOfUrl";

const Logs = () => {
	const [data, setData] = useState(null);
	const lastPartOfUrl = useLastPartOfUrl();
	
	useEffect(async() => {
			const data= await getServiceLogs(lastPartOfUrl);
			setData(data);

	}, []);
	return(
		
			<>
	
			  <MDBox mt={12}>
			  <Card
				sx={{
				  mt: -8,
				  py: 2,
				  px: 2,
				}}
			  >
			  <LogList data={data} />
			  </Card>
			  </MDBox>
			  </>


	)
}

export default Logs;