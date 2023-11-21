import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material';

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
    minHeight: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 0),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    paddingInline: theme.spacing(1),
    boxSizing: 'border-box',

    '@media (min-width: 800px)': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
}));
