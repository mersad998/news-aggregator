import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>(() => ({
  container: {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    minHeight: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0px',
    padding: '4px 0px',
    border: '1px solid gray',
    borderRadius: 4,
    paddingInline: 8,
    boxSizing: 'border-box',
  },
}));
