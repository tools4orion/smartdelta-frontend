import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { useFileController } from "contexts/FileContext";
import MDTypography from "components/MDTypography";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import { Box } from "@mui/system";
import { useMaterialUIController } from "contexts/UIContext";

const NestedList = ({ fileNo }) => {
  const { state } = useFileController();
  const { selectedFilesToCompare, comparisonResult } = state;
  const [controller, _] = useMaterialUIController();
  const { darkMode } = controller;

  const [openStates, setOpenStates] = useState(
    Array(
      comparisonResult?.result[`file${fileNo}`]?.clusters[0]?.message_instances
        .length || 0
    ).fill(false)
  );

  const handleToggle = (index) => {
    const updatedStates = [...openStates];
    updatedStates[index] = !updatedStates[index];
    setOpenStates(updatedStates);
  };

  const getColor = (index) => {
    const colors = ["#008FFB", "#00E396", "#FEB019"];
    return colors[index % colors.length];
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: darkMode ? "#1a2035" : "#f0f2f5",
            padding: "8px",
          }}
        >
          <MDTypography variant="h6" textAlign="center">
            {selectedFilesToCompare[fileNo - 1]?.fileName}
          </MDTypography>
        </Box>
      }
    >
      {comparisonResult &&
        comparisonResult?.result[
          `file${fileNo}`
        ].clusters[0].message_instances.map((instance, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={() => handleToggle(index)}>
              <ListItemIcon>
                <BubbleChartIcon sx={{ color: getColor(index) }} />
              </ListItemIcon>
              <MDTypography
                variant="button"
                fontWeight="medium"
              >{`Occurrence: ${instance.occurrence_percentage.toFixed(
                2
              )}%`}</MDTypography>
              {openStates[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {instance.fields.map((field, fieldIndex) => (
                  <ListItemButton key={fieldIndex} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <TripOriginIcon sx={{ color: getColor(index) }} />
                    </ListItemIcon>

                    <ListItemText
                      sx={{
                        fontSize: "0.12rem",
                        color: darkMode ? "#CCCCFF" : "#000000",
                        p: 1,
                        fontFamily: `Roboto,Helvetica,Arial,sans-serif`,
                      }}
                      primary={`${Object.keys(field)[0]}: ${
                        Object.values(field)[0]
                      }`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
    </List>
  );
};

export default NestedList;
