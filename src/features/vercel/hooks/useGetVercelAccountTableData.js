import MDTypography from "../../../components/MDTypography";
import { IconButton } from "@mui/material";
export const useGetVercelAccountTableData = (
  vercelUserlist,
  inputVercelToken,
  handleToken
) => {
  const columns = [
    { Header: "Username", accessor: "username", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  let vercelUserlistData = [];
  vercelUserlistData = [...vercelUserlistData, vercelUserlist];
  // console.log("vercelUserlistData", vercelUserlistData[0]?.token);

  const rows =
    vercelUserlistData?.map((accounts) => {
      const { username, email, actions } = accounts || {};

      return {
        username: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {username}
          </MDTypography>
        ),
        email: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {email}
          </MDTypography>
        ),
        actions: (
          <IconButton onClick={() => handleToken(vercelUserlistData[0]?.token)}>
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
    }) || [];

  return {
    columns,
    rows,
  };
};
