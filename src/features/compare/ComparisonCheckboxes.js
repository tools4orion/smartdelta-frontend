import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFileController } from "contexts/FileContext";
import { useEdgeProperties } from "features/featureDiscovery/useRawData";
import EditIcon from "@mui/icons-material/Edit";
import MDTypography from "components/MDTypography";
import Select from "@mui/material/Select";
import { useRawData } from "features/featureDiscovery/useRawData";

const ComparisonCheckboxes = ({
  selectedFieldsAndTypes,
  setSelectedFieldsAndTypes,
}) => {
  const { state } = useFileController();
  const { selectedFilesToCompare } = state;
  const file1Cols = useEdgeProperties(
    selectedFilesToCompare[0]?.directions || null
  );
  const file2Cols = useEdgeProperties(
    selectedFilesToCompare[1]?.directions || null
  );

  const file1Rows = useRawData(
    selectedFilesToCompare[0]?.directions || null,
    "",
    {},
    "asc"
  );
  console.log(file1Rows);
  const intersection = file1Cols.filter((value) => file2Cols.includes(value));
  const [hoveredCheckbox, setHoveredCheckbox] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [age, setAge] = useState("");
  const [selectedFieldName, setSelectedFieldName] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDialogOpen = (fieldName) => {
    setSelectedFieldName(fieldName);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveType = () => {
    setSelectedFieldsAndTypes((prevSelectedTypes) => {
      const updatedTypes = prevSelectedTypes.map((item) =>
        item.fieldName === selectedFieldName
          ? { ...item, selectedType: age }
          : item
      );
      if (!updatedTypes.find((item) => item.fieldName === selectedFieldName)) {
        updatedTypes.push({ fieldName: selectedFieldName, selectedType: age });
      }
      return updatedTypes;
    });
    handleDialogClose();
  };
  const bgStyles = {
    background: "#360033",
    /* fallback for old browsers */
    background: "-webkit-linear-gradient(to right, #0b8793, #360033)",
    /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to right, #0b8793, #360033)",
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  };
  const typeToColor = {
    String: "#FFB74D",
    Integer: "#F06292",
    Float: "#81C784",
    Timestamp: "#D6BCFA",
    Boolean: "#AED581",
    JSON: "#4DB6AC",
    Exception: "#FF8A65",
  };

  console.log("selectedFieldsAndTypes:: ", selectedFieldsAndTypes);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormGroup>
        <FormGroup>
          {intersection.map((columnName) => (
            <div
              key={columnName}
              style={{ position: "relative" }}
              onMouseEnter={() => setHoveredCheckbox(columnName)}
              onMouseLeave={() => setHoveredCheckbox(null)}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFieldsAndTypes((prevSelectedTypes) => [
                          ...prevSelectedTypes,
                          { fieldName: columnName, selectedType: null },
                        ]);
                      } else {
                        setSelectedFieldsAndTypes((prevSelectedTypes) =>
                          prevSelectedTypes.filter(
                            (item) => item.fieldName !== columnName
                          )
                        );
                      }
                    }}
                  />
                }
                label={columnName}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "#FFFFFF",
                  },
                }}
              />
              {selectedFieldsAndTypes.find(
                (item) => item.fieldName === columnName
              )?.selectedType && (
                <Chip
                  label={
                    selectedFieldsAndTypes.find(
                      (item) => item.fieldName === columnName
                    )?.selectedType
                  }
                  onDelete={() => {
                    setSelectedFieldsAndTypes((prevSelectedTypes) =>
                      prevSelectedTypes.map((item) =>
                        item.fieldName === columnName
                          ? { ...item, selectedType: null }
                          : item
                      )
                    );
                  }}
                  style={{
                    position: "absolute",
                    top: 3,
                    left:
                      selectedFieldsAndTypes.find(
                        (item) => item.fieldName === columnName
                      )?.selectedType.length > 7
                        ? -110
                        : -90,
                    color: "#333",
                    backgroundColor:
                      typeToColor[
                        selectedFieldsAndTypes.find(
                          (item) => item.fieldName === columnName
                        )?.selectedType
                      ],
                  }}
                />
              )}
              {hoveredCheckbox === columnName &&
                selectedFieldsAndTypes.find(
                  (item) => item.fieldName === columnName
                ) && (
                  <IconButton
                    onClick={() => handleDialogOpen(columnName)}
                    style={{
                      position: "absolute",
                      top: -2,
                      right:
                        columnName.length > 15
                          ? -90
                          : columnName.length > 10
                          ? -50
                          : -20,
                      color: "white",
                    }}
                  >
                    <EditIcon />
                    <MDTypography variant="h6" color="white">
                      Add Type
                    </MDTypography>
                  </IconButton>
                )}
            </div>
          ))}
        </FormGroup>
      </FormGroup>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={bgStyles}>Select Type</DialogTitle>
        <DialogContent sx={bgStyles}>
          {/* Customize the content of the dialog based on your requirements */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              shrink
              htmlFor="demo-select-small"
              sx={{ color: "white" }}
            >
              Type
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="age"
              onChange={handleChange}
              sx={{
                height: "32px",
                "& .MuiSelect-outlined": {
                  borderColor: "#FFFFFF",
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"String"}>String</MenuItem>
              <MenuItem value={"Integer"}>Integer</MenuItem>
              <MenuItem value={"Float"}>Float</MenuItem>
              <MenuItem value={"Timestamp"}>Timestamp</MenuItem>
              <MenuItem value={"Boolean"}>Boolean</MenuItem>
              <MenuItem value={"JSON"}>JSON</MenuItem>
              <MenuItem value={"Exception"}>Exception/Stack Trace</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={bgStyles}>
          <Button sx={{ color: "#FFFFFF" }} onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button sx={{ color: "#FFFFFF" }} onClick={handleSaveType}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ComparisonCheckboxes;
