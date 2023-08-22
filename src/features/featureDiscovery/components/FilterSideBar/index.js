import React, { useState } from "react";
import PropTypes from "prop-types";
import FilterSideBarRoot from "./FilterSideBarRoot";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { Box, Divider, Pagination, Icon } from "@mui/material";
import MDInput from "components/MDInput";

const FilterSideBar = ({ isOpen, filterKeywords, setFilterKeywords, edgeProperties }) => {
  const inputsPerPage = 4; // Number of inputs to display per page
  const totalInputs = 17; // Total number of inputs
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleKeywordChange = (event, column) => {
    const { value } = event.target;
    setFilterKeywords(prevFilterKeywords => ({
      ...prevFilterKeywords,
      [column]: value,
    }));
  };

  const renderInputs = () => {
    const startIndex = (currentPage - 1) * inputsPerPage;
    const endIndex = startIndex + inputsPerPage;
    const inputs = [];

    for (let i = startIndex; i < endIndex; i++) {
      if (i < edgeProperties.length) {
        const columnName = edgeProperties[i];

        inputs.push(
          <MDBox mt={2} key={columnName}>
            <MDTypography variant="h6">{columnName}</MDTypography>
            <MDInput
              value={filterKeywords[columnName]}
              onChange={event => handleKeywordChange(event, columnName)}
            />
          </MDBox>
        );
      } else {
        break; // Break the loop if all inputs have been rendered
      }
    }

    return inputs;
  };

  return (
    <FilterSideBarRoot variant="permanent" isOpen={isOpen}>
      <MDBox display="flex" justifyContent="space-between" alignItems="baseline" pt={4} pb={0.5} px={3}>
        <Icon>close</Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Filter by Keyword</MDTypography>
          <MDTypography variant="button" color="text">
            Enter keywords to filter each column.
          </MDTypography>
        </MDBox>
        {renderInputs()}
        <Divider />

        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(totalInputs / inputsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="secondary"
            />
          </Box>
        </MDBox>
        <Divider />
      </MDBox>
    </FilterSideBarRoot>
  );
};

FilterSideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  filterKeywords: PropTypes.object.isRequired,
  setFilterKeywords: PropTypes.func.isRequired,
  edgeProperties: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterSideBar;
