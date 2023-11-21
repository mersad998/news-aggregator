import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingInline: theme.spacing(2),
    '@media (min-width: 800px)': {
      paddingInline: theme.spacing(16),
    },
  },
}));
