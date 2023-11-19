import { type FC } from 'react';

import { useStyles } from './DashboardStyles';

import type { DashboardViewProps } from './DashboardTypes';
import { FeedCard } from '../feedCard';

const DashboardView: FC<DashboardViewProps> = (props) => {
  const { articles } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {articles.map((article) => (
        <FeedCard article={article} />
      ))}
    </div>
  );
};

export default DashboardView;
