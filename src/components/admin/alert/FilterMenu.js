import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const FilterMenu = ({ anchorEl, handleFilterClose, handleFilterChange, cameraOptions }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
      {cameraOptions.map((option) => (
        <MenuItem key={option.value} onClick={() => handleFilterChange(option.value)}>
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default FilterMenu;