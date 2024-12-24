import MDTypography from "components/MDTypography";

export const getUnicode = (anomalyScore) => {
  if (anomalyScore >= 75) {
    return "&#128308;"; // Red dot
  } else if (anomalyScore >= 50) {
    return "&#128993;"; // Yellow dot
  } else {
    return "&#9898;"; // Blue dot
  }
};

const getAnomaliesTable = (anomalies) => {
  const columns = [
    { Header: "Anomaly Score", accessor: "score", align: "left" },
    { Header: "Anomaly", accessor: "anomaly", align: "left" },
    { Header: "Start Time", accessor: "startTime", align: "left" },
    { Header: "Data Set", accessor: "dataSet", align: "left" },
  ];

  const rows =
    anomalies?.map((anomaly) => ({
      score: (
        <MDTypography
          component="span"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <span
            dangerouslySetInnerHTML={{ __html: getUnicode(anomaly.score) }}
          />{" "}
          {anomaly.score}
        </MDTypography>
      ),
      anomaly: (
        <MDTypography
          component="span"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {anomaly.message}
        </MDTypography>
      ),
      startTime: (
        <MDTypography
          component="span"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {new Date(anomaly.win_start).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </MDTypography>
      ),
      dataSet: (
        <MDTypography
          component="span"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {anomaly.type || "unknown"}
        </MDTypography>
      ),
    })) || [];

  return { columns, rows };
};

export default getAnomaliesTable;
