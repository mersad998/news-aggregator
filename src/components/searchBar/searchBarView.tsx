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
import { useTranslation } from 'react-i18next';
import { Button, FormControl, InputLabel, Popover, TextField } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import { useStyles } from './searchBarStyle';
import { resourceSelectItems, MenuProps } from './searchBarHelper';

import type { SearchBarViewProps } from './searchBarTypes';

const SearchBarView: FC<SearchBarViewProps> = (props) => {
  const { selectedResources, onSearch, onResourceSelect } = props;

  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="resource-select-label">{t('searchBar.selectResources')}</InputLabel>
        <Select
          style={{ marginInline: 4, flex: 1 }}
          value={selectedResources}
          onChange={onResourceSelect}
          input={<OutlinedInput id="select-multiple-chip" label={t('searchBar.selectResources')} />}
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
          <TextField onChange={onSearch} id="bulk" label={t('searchBar.searchAnyThing')} variant="standard" />
        </Box>

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button {...bindTrigger(popupState)} variant="outlined" sx={{ marginTop: 2 }} startIcon={<SettingsIcon />}>
                {t('searchBar.customizeYourFeeds')}
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
                  <TextField onChange={onSearch} id="author" label={t('searchBar.author')} variant="standard" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 2 }}>
                  <CategoryIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField onChange={onSearch} id="category" label={t('searchBar.category')} variant="standard" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 2 }}>
                  <PublicIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField onChange={onSearch} id="sources" label={t('searchBar.sources')} variant="standard" />
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
