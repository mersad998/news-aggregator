import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';
import { HEADER_HEIGHT } from '../../core/constants';

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 10px',
    borderBottom: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    }`,
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: `${theme.palette.primary.light}`,
  },
}));
