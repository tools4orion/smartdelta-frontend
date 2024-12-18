import MDTypography from "../../../components/MDTypography";
import { IconButton } from "@mui/material";

export const useGetVercelAccountTableData = (
  vercelUserlist,
  handleOpenProjects
) => {
  const columns = [
    { Header: "Username", accessor: "username", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  const rows = (vercelUserlist || []).map((user) => {
    const { username, email } = user;
    return {
      username: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {username}
        </MDTypography>
      ),
      email: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {email}
        </MDTypography>
      ),
      actions: (
        <IconButton onClick={() => handleOpenProjects(email)}>
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Open
          </MDTypography>
        </IconButton>
      ),
    };
  });

  return {
    columns,
    rows,
  };
};
