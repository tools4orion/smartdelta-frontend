import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import VersionControlIcon from "../../../assets/svgs/version-control.svg";
import CorrelationIcon from "../../../assets/svgs/correlation.svg";
import OverviewIcon from "../../../assets/svgs/analysis.svg";
import UserGuideTour from "features/userTours/UserGuideTour";

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontSize: theme.typography.body2.fontSize, // Use body2 font size from theme
  },
  color: "white",
}));

const options = [
  {
    value: "VersionServiceLatency",
    icon: VersionControlIcon,
    iconWidth: "50",
    alt: "version",
    primary: "Latency-Time along Version",
    secondary: "",
  },
  {
    value: "CorrelationChart",
    icon: CorrelationIcon,
    iconWidth: "32",
    alt: "correlation",
    primary: "Correlation with Service Action",
    secondary: "",
  },
  {
    value: "TopologyOverview",
    icon: OverviewIcon,
    iconWidth: "36",
    alt: "overview",
    primary: "Topology Outliers",
    secondary: "",
  },
];

const SidebarOptions = ({ onClick }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 300 }}>
      <nav aria-label="main mailbox folders">
        <List>
          {options.map((option, index) => (
            <ListItem className={option.value} key={index}>
              <ListItemButton onClick={() => onClick(option.value)}>
                <ListItemIcon>
                  <img
                    src={option.icon}
                    width={option.iconWidth}
                    alt={option.alt}
                  />
                </ListItemIcon>
                <CustomListItemText
                  primary={option.primary}
                  secondary={option.secondary}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <UserGuideTour guideKey="latency-menu" />
    </Box>
  );
};

export default SidebarOptions;
