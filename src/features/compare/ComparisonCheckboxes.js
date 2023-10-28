import React from 'react';
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useFileController } from "contexts/FileContext";
import { useEdgeProperties } from "features/featureDiscovery/useRawData";

const ComparisonCheckboxes = () => {
  const { state } = useFileController();
  const { selectedFilesToCompare } = state;
  const file1Cols = useEdgeProperties(selectedFilesToCompare[0]?.directions || null);
  const file2Cols = useEdgeProperties(selectedFilesToCompare[1]?.directions || null);
  const intersection = file1Cols.filter((value) => file2Cols.includes(value));

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormGroup>
        <FormGroup>
          {intersection.map((columnName) => (
            <FormControlLabel key={columnName} control={<Checkbox />} label={columnName} />
          ))}
        </FormGroup>
      </FormGroup>
    </div>
  );
};

export default ComparisonCheckboxes;
