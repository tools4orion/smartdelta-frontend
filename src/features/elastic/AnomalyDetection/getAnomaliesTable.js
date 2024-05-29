import MDTypography from "components/MDTypography";
import { formatDate } from "utils/formatDate";

export const getUnicode = (anomalyScore) => {
    if (anomalyScore >= 75) {
        return '&#128308;';
    } else if (anomalyScore >= 50) {
        return '&#128993;';
    } else if (anomalyScore >= 25) {
        return '&#128993;';
    } else if (anomalyScore >= 3) {
        return '&#128309;';
    } else {
        return '&#9898;';
    }
};

const getAnomaliesTable = (anomalies) => {
	const columns = [
		{ Header: "Anomaly Score", accessor: "score", align: "left" },
		{ Header: "Anomaly", accessor: "anomaly", align: "left" },
		{ Header: "Start Time", accessor: "startTime", align: "left" },
		{ Header: "Data Set", accessor: "dataSet", align: "left" }

	  ];
	
	  const rows = anomalies?.map((row) => {
		const { score,message, win_start, type } = row || {};
	
		return {
		  score: (
			<>
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			<span dangerouslySetInnerHTML={{ __html: getUnicode(score) }} /> { score }
			</MDTypography>
			</>
		  ),
		  anomaly: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  { message }
			</MDTypography>
		  ),
		  startTime: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {win_start}
			</MDTypography>
		  ),
		  dataSet: (
			<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
			  {type}
			</MDTypography>
		  )
		};
	  }) || [];
	
	  return {
		columns,
		rows,
	  };
	};
	



export default getAnomaliesTable;

