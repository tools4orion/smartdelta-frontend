import MDTypography from "components/MDTypography";
import { Tooltip } from "@mui/material";
import ServiceAction from "../actions/ServiceAction";
// import aws from "assets/svgs/aws-icon.svg";
import lambda from "assets/svgs/lambda.svg";
import TracesTableAction from "../actions/TracesTableAction";

const getServicesTable = (services) => {
  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Environment", accessor: "environment", align: "left" },
    { Header: "Framework", accessor: "framework", align: "center" },
    { Header: "Runtime", accessor: "runtime", align: "center" },
    { Header: "Version", accessor: "version", align: "center" },
    { Header: "Traces", accessor: "traces", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const rows =
    services?.map((service) => {
      const { runtime, environment, framework, name, version } = service || {};
      console.log(service);
      const shortenedName =
        name.length > 30 ? name.substring(0, 37) + "..." : name;

      return {
        name: (
          <Tooltip title={name}>
            <MDTypography
              component="a"
              //   href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {shortenedName}
            </MDTypography>
          </Tooltip>
        ),
        environment: (
          <MDTypography
            component="a"
            // href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {environment}
          </MDTypography>
        ),
        framework: (
          <>
            {framework.name === "AWS Lambda" && (
              <img
                width="24"
                height="24"
                src={lambda}
                alt="AWS Lambda"
                style={{ paddingRight: "5px", verticalAlign: "middle" }}
              />
            )}
            <MDTypography
              component="a"
              //   href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {framework.name}
            </MDTypography>
          </>
        ),
        version: (
          <MDTypography
            component="a"
            // href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {version}
          </MDTypography>
        ),
        runtime: (
          <>
            {runtime.name.includes("nodejs") && (
              <img
                width="30"
                height="30"
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPG1hc2sgaWQ9ImEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjUiIHk9IjQiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyNCI+CiAgICA8cGF0aCBkPSJNMTYuMTAxIDQuMTVhMS4xNTEgMS4xNTEgMCAwMC0xLjEzOSAwTDUuNTYgOS41NzljLS4zNTguMjAxLS41NTkuNTgtLjU1OS45ODN2MTAuODc4YzAgLjQwMi4yMjMuNzgyLjU1OS45ODNsOS40MDMgNS40MjdhMS4xNTIgMS4xNTIgMCAwMDEuMTQgMGw5LjQwMy01LjQyN2MuMzU3LS4yMDEuNTU5LS41ODEuNTU5LS45ODNWMTAuNTZjMC0uNDAyLS4yMjQtLjc4Mi0uNTU5LS45ODNsLTkuNDA0LTUuNDI3eiIgZmlsbD0iI2ZmZiIvPgogIDwvbWFzaz4KICA8ZyBtYXNrPSJ1cmwoI2EpIj4KICAgIDxwYXRoIGQ9Ik0xNi4xMDEgNC4xNWExLjE1MSAxLjE1MSAwIDAwLTEuMTM5IDBMNS41NiA5LjU3OWMtLjM1OC4yMDEtLjU1OS41OC0uNTU5Ljk4M3YxMC44NzhjMCAuNDAyLjIyMy43ODIuNTU5Ljk4M2w5LjQwMyA1LjQyN2ExLjE1MiAxLjE1MiAwIDAwMS4xNCAwbDkuNDAzLTUuNDI3Yy4zNTctLjIwMS41NTktLjU4MS41NTktLjk4M1YxMC41NmMwLS40MDItLjIyNC0uNzgyLS41NTktLjk4M2wtOS40MDQtNS40Mjd6IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CiAgICA8cGF0aCBkPSJNMjUuNTI3IDkuNTc3TDE2LjA4IDQuMTVhMS41NSAxLjU1IDAgMDAtLjI5LS4xMTJMNS4yIDIyLjE3NWMuMDg4LjEwNy4xOTQuMTk4LjMxMy4yNjhsOS40NDggNS40MjhjLjI2OC4xNTcuNTgxLjIwMS44NzEuMTEyTDI1Ljc3MyA5LjhhMS4xNzMgMS4xNzMgMCAwMC0uMjQ2LS4yMjN6IiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXIpIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI1LjU1IDIyLjQyMmMuMjY3LS4xNTcuNDY4LS40MjUuNTU4LS43MTVMMTUuNzQ0IDQuMDE3Yy0uMjY4LS4wNDUtLjU1OS0uMDIzLS44MDQuMTMzTDUuNTU5IDkuNTU2bDEwLjExOCAxOC40NWMuMTQ3LS4wMjQuMjktLjA3LjQyNC0uMTM0bDkuNDQ4LTUuNDV6IiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXIpIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI1LjU1IDIyLjQyMmwtOS40MjYgNS40MjhhMS4zNDkgMS4zNDkgMCAwMS0uNDI0LjEzNGwuMTc4LjMzNSAxMC40NTMtNi4wNTN2LS4xMzRsLS4yNjgtLjQ0N2MtLjA0NC4zMTMtLjI0NS41OC0uNTE0LjczN3oiIGZpbGw9InVybCgjcGFpbnQzX2xpbmVhcikiLz4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjUuNTUgMjIuNDIybC05LjQyNiA1LjQyOGExLjM0OSAxLjM0OSAwIDAxLS40MjQuMTM0bC4xNzguMzM1IDEwLjQ1My02LjA1M3YtLjEzNGwtLjI2OC0uNDQ3Yy0uMDQ0LjMxMy0uMjQ1LjU4LS41MTQuNzM3eiIgZmlsbD0idXJsKCNwYWludDRfbGluZWFyKSIvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjE5LjM2MyIgeTE9IjguMTk3IiB4Mj0iOS4wNTYiIHkyPSIyNC4zOTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzQxODczRiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4zMjkiIHN0b3AtY29sb3I9IiM0MThCM0QiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjM1IiBzdG9wLWNvbG9yPSIjNDE5NjM3Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjkzMiIgc3RvcC1jb2xvcj0iIzNGQTkyRCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzRkFFMkEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXIiIHgxPSIxNC4xMDQiIHkxPSIxNy4yNzMiIHgyPSIzOS45MTgiIHkyPSIzLjI0OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4xMzgiIHN0b3AtY29sb3I9IiM0MTg3M0YiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNDAzIiBzdG9wLWNvbG9yPSIjNTRBMDQ0Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjcxNCIgc3RvcC1jb2xvcj0iIzY2Qjg0OCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii45MDgiIHN0b3AtY29sb3I9IiM2Q0MwNEEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXIiIHgxPSI0LjY1NyIgeTE9IjE2IiB4Mj0iMjYuNDE2IiB5Mj0iMTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMDkyIiBzdG9wLWNvbG9yPSIjNkNDMDRBIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjI4NiIgc3RvcC1jb2xvcj0iIzY2Qjg0OCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41OTciIHN0b3AtY29sb3I9IiM1NEEwNDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuODYyIiBzdG9wLWNvbG9yPSIjNDE4NzNGIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDNfbGluZWFyIiB4MT0iNC42NTciIHkxPSIyNS4wMiIgeDI9IjI2LjQxNiIgeTI9IjI1LjAyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iLjA5MiIgc3RvcC1jb2xvcj0iIzZDQzA0QSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yODYiIHN0b3AtY29sb3I9IiM2NkI4NDgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNTk3IiBzdG9wLWNvbG9yPSIjNTRBMDQ0Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjg2MiIgc3RvcC1jb2xvcj0iIzQxODczRiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQ0X2xpbmVhciIgeDE9IjI5LjU4NiIgeTE9IjcuNjgzIiB4Mj0iMjQuMDczIiB5Mj0iMzYuNTY4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM0MTg3M0YiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMzI5IiBzdG9wLWNvbG9yPSIjNDE4QjNEIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjYzNSIgc3RvcC1jb2xvcj0iIzQxOTYzNyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii45MzIiIHN0b3AtY29sb3I9IiMzRkE5MkQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM0ZBRTJBIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+Cg=="
                class="euiIcon euiButtonIcon__icon css-13e8g5a-euiIcon-l-inherit"
                aria-hidden="true"
                style={{ verticalAlign: "middle" }}
              />
            )}
            <MDTypography
              component="a"
              //   href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {runtime.name}
            </MDTypography>
          </>
        ),
        traces: <TracesTableAction name={name} />,
        action: <ServiceAction name={name} />,
      };
    }) || [];

  return {
    columns,
    rows,
  };
};

export default getServicesTable;
