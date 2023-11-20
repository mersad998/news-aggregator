import { type FC } from 'react';

import { useStyles } from './feedsPageStyles';
import { FeedCard } from '../feedCard';
import { SearchBar } from '../searchBar';

import type { FeedsPageViewProps } from './feedsPageTypes';

const FeedsPageView: FC<FeedsPageViewProps> = (props) => {
  const { articles, onSearch, onPageChange, onPageSizeChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SearchBar onSearch={onSearch} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />

      {articles.map((article) => (
        <FeedCard article={article} />
      ))}
    </div>
  );
};

export default FeedsPageView;
