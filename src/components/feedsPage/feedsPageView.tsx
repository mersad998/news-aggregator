import { type FC } from 'react';

import { useStyles } from './feedsPageStyles';
import { FeedCard } from '../feedCard';
import { SearchBar } from '../searchBar';

import type { FeedsPageViewProps } from './feedsPageTypes';

const FeedsPageView: FC<FeedsPageViewProps> = (props) => {
  const { articles } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SearchBar />

      {articles.map((article) => (
        <FeedCard article={article} />
      ))}
    </div>
  );
};

export default FeedsPageView;
