import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
// import getServices from "../actions/getServices";
import ServiceList from "./ServiceList";
// import LogList from "../Logs/LogList";

const Services = () => {
  const [data, setData] = useState(null);
  //const { columns, rows } = getServicesTable(data);

  useEffect(async () => {
    // const data = await getServices();
    // setData(data);
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={12}>
        <Card
          sx={{
            mt: -8,
            py: 2,
            px: 2,
          }}
        >
          <ServiceList data={data} />
        </Card>
      </MDBox>
    </DashboardLayout>
  );
};

export default Services;
