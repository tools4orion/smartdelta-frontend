import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";


import TransactionsChart from "./TransactionChart";
import getServiceTransactions from "../actions/getServiceTransactions";
import useLastPartOfUrl from "hooks/useLastPartOfUrl";


const Transactions = () => {
	const [durations, setDurations] = useState(null);
	const [timestamps, setTimestamps] = useState(null);
	const  lastPartOfUrl = useLastPartOfUrl();

	useEffect(async() => {
		const transactions = await getServiceTransactions(lastPartOfUrl);
		
		const durs = transactions.map(item => item.span.duration.us);
		setDurations(durs);
		const tims = setTimestamps( transactions.map(item => new Date(item['@timestamp']).getTime()));
		setTimestamps(tims);
console.log('Index DURATIONS:')
    console.log(durations);
	console.log('ındec TIMESTAMPS:')
	console.log(timestamps);
		console.log('TRANSACTUINS:')
		console.log(transactions);
	}, []);


	return(
		
			<DashboardLayout>
			  
			  <MDBox mt={12}>
			  <Card
				sx={{
				  mt: -8,
				  py: 2,
				  px: 2,
				}}
			  >
				<TransactionsChart timestamps={timestamps} durations={durations} />
			  </Card>
			  </MDBox>
			  </DashboardLayout>


	)
}

export default Transactions;