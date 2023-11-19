import { type FC } from 'react';

import { useStyles } from './feedsPageStyles';

import type { FeedsPageViewProps } from './feedsPageTypes';
import { FeedCard } from '../feedCard';

const FeedsPageView: FC<FeedsPageViewProps> = (props) => {
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

export default FeedsPageView;
