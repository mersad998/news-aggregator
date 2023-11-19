import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,

    paddingInline: '1rem',
    '@media (min-width: 800px)': {
      paddingInline: '8rem',
    },
  },
}));
