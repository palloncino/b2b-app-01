import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Box } from '@mui/material';

function FilterBar({ filtersConfig, onFilterChange }) {
  const handleTextChange = (event) => {
    onFilterChange('search', event.target.value);
  };

  const handleCategoryChange = (event) => {
    onFilterChange('category', event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Search by keyword"
              variant="outlined"
              onChange={handleTextChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              onChange={handleCategoryChange}
            >
              {filtersConfig.find(filter => filter.name === 'category').options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterBar;
