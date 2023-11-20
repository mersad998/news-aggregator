import { type FC } from 'react';

import { useStyles } from './feedsPageStyles';
import { FeedCard } from '../feedCard';
import { SearchBar } from '../searchBar';

import type { FeedsPageViewProps } from './feedsPageTypes';
import { Pagination } from '@mui/material';

const FeedsPageView: FC<FeedsPageViewProps> = (props) => {
  const { articles, totalCount, onSearch, onPageChange, onResourceSelect } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SearchBar onSearch={onSearch} onResourceSelect={onResourceSelect} />

      {articles.map((article, index) => (
        <FeedCard article={article} key={index} />
      ))}

      <Pagination
        count={totalCount}
        onChange={(_event, selectedPage) => {
          onPageChange(selectedPage);
        }}
      />
    </div>
  );
};

export default FeedsPageView;
