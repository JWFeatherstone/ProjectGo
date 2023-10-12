import { useContext } from 'react';
import FilterContext from './FilterContext';
import { ListItem, ListItemIcon, ListItemButton, ListItemText, Checkbox } from '@mui/material';

const Filter = ({ name }) => {
  const { selectedFilters, toggleFilter } = useContext(FilterContext);
  return (
    <ListItem
    key={name}
    disablePadding
    sx={{height: "26px"}}
    >
    <ListItemButton role={undefined} dense sx={{height: "26px"}}>
        <ListItemIcon>
          <Checkbox
          edge="start"
          checked={!!selectedFilters[name]}
          onChange={() => toggleFilter(name)}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': name }}
          />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

export default Filter;
