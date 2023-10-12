import { useState, useCallback } from 'react';
import FilterContext from './FilterContext';
import { List, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';

const FilterGroup = ({ groupName, children, onApply }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = useCallback((filterName) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  }, []);

  const applyFilters = () => {
    onApply(groupName, selectedFilters);
  };

  return (
    <FilterContext.Provider value={{ selectedFilters, toggleFilter, applyFilters }}>
      <Accordion className="filter-accordion">
        <AccordionSummary sx={{display: "flex", justifyContent: "center", minHeight: "30px", maxHeight: "30px"}}>
          <Typography variant="h4" sx={{width: "100%", fontFamily: "JetBrains Mono"}} align="center">
            {groupName}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
              {children}
            </List>
        </AccordionDetails>
      </Accordion>
    </FilterContext.Provider>
  );
};

export default FilterGroup;