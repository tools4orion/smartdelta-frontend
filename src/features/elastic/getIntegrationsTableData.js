import MDTypography from "../../components/MDTypography";

export const getTableData = (integrations) => {
  const columns = [
    { Header: "Deployment", accessor: "deployment", align: "left" },
    { Header: "Status", accessor: "status", align: "left" },
    { Header: "Version", accessor: "version", align: "center" },
    { Header: 'Cloud Provider & Region', accessor: "cloud", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  let integrationData = [];
  integrationData = [...integrationData, integrations];

  const rows = integrationData?.map((integration) => {
    const { cloud, version, name } = integration || {};
    const { region, provider } = cloud || {};

    return {
      deployment: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {name}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Active
        </MDTypography>
      ),
      version: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {version}
        </MDTypography>
      ),
      cloud: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {provider} - {region}
        </MDTypography>
      ),
      actions: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Open
        </MDTypography>
      ),
    };
  }) || [];

  return {
    columns,
    rows,
  };
};
