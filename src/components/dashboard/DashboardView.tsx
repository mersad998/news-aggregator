import { type FC } from 'react';
import { Typography } from '@mui/material';

import { useStyles } from './DashboardStyles';

import type { DashboardViewProps } from './DashboardTypes';

const DashboardView: FC<DashboardViewProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>This is Dashboard page (articles will be displayed here)</Typography>
    </div>
  );
};

export default DashboardView;
