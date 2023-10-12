import { useContext } from 'react';
import FilterContext from './FilterContext';
import { Button } from '@mui/material';

const ApplyButton = () => {
  const { applyFilters } = useContext(FilterContext);
  return <Button sx={{textAlign: "center", width: "100%"}} onClick={applyFilters}> Apply </Button>
};

export default ApplyButton;