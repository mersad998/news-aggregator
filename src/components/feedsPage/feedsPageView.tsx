import { type FC } from 'react';

import { useStyles } from './feedsPageStyles';
import { FeedCard } from '../feedCard';
import { SearchBar } from '../searchBar';

import type { FeedsPageViewProps } from './feedsPageTypes';

const FeedsPageView: FC<FeedsPageViewProps> = (props) => {
  const { articles, onSearch, onPageChange, onPageSizeChange, onResourceSelect } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SearchBar onSearch={onSearch} onResourceSelect={onResourceSelect} />

      {articles.map((article, index) => (
        <FeedCard article={article} key={index} />
      ))}
    </div>
  );
};

export default FeedsPageView;
