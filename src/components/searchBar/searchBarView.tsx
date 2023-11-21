import { type FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import { Button, FormControl, InputLabel, Popover, TextField } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import { useStyles } from './searchBarStyle';
import { MenuProps, resourceSelectItems } from './searchBarHelper';

import type { SearchBarViewProps } from './searchBarTypes';

const SearchBarView: FC<SearchBarViewProps> = (props) => {
  const { selectedResources, onSearch, onResourceSelect } = props;

  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControl sx={{ m: 1 }}>
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

      <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField onChange={onSearch} id="bulk" label="search anything" variant="standard" />
        </Box>

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button {...bindTrigger(popupState)} variant="outlined" sx={{ marginTop: 2 }} startIcon={<SettingsIcon />}>
                Customize your feeds
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 2 }}>
                  <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField onChange={onSearch} id="author" label="author" variant="standard" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 2 }}>
                  <CategoryIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField onChange={onSearch} id="category" label="category" variant="standard" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 2 }}>
                  <PublicIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField onChange={onSearch} id="sources" label="sources" variant="standard" />
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  );
};

export default SearchBarView;
