import { type FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FormControl, InputLabel, TextField } from '@mui/material';

import { useStyles } from './searchBarStyle';
import { MenuProps, resourceSelectItems } from './searchBarHelper';

import type { SearchBarViewProps } from './searchBarTypes';

const SearchBarView: FC<SearchBarViewProps> = (props) => {
  const { selectedResources, onSearch, onResourceSelect } = props;

  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="resource-select-label">select resources</InputLabel>
        <Select
          style={{ marginInline: 4, flex: 1 }}
          value={selectedResources}
          onChange={onResourceSelect}
          input={<OutlinedInput id="select-multiple-chip" label="select resources" />}
          labelId="resource-select-label"
          MenuProps={MenuProps}
          multiple
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {resourceSelectItems.map((resource) => (
            <MenuItem key={resource.value} value={resource.value} style={{ fontWeight: theme.typography.fontWeightRegular }}>
              {resource.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField onChange={onSearch} placeholder="search anything" />
    </div>
  );
};

export default SearchBarView;
