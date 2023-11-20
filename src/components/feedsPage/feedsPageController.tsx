import { memo, type FC, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import LoadingBox from '../LoadingBox';
import FeedsPageView from './feedsPageView';
import { mergeAndSortArticles } from './feedsPageHelper';

import { NewsResources } from '../../core/dataProvider/dataProviderTypes';
import useFetchData from './hooks/useFetchData';

import type { ReduxState } from './feedsPageTypes';

const FeedsPageController: FC = () => {
  const { setBulkQueryParameters } = useFetchData();

  const newsApiData = useSelector<{ resources: ReduxState }>((state) => state.resources[NewsResources.NewsApi]) as ReduxState[NewsResources.NewsApi];
  const theGuardianData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.TheGuardian],
  ) as ReduxState[NewsResources.TheGuardian];
  const newYorkTimesData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewYorkTimes],
  ) as ReduxState[NewsResources.NewYorkTimes];

  if (newsApiData?.isLoading && theGuardianData?.isLoading && newYorkTimesData?.isLoading) {
    return <LoadingBox />;
  }

  const mergedData = mergeAndSortArticles({
    newsApiData,
    theGuardianData,
    newYorkTimesData,
  });

  const onSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setBulkQueryParameters({ query: value });
  };

  const onPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setBulkQueryParameters({ page: +value });
  };

  const onPageSizeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setBulkQueryParameters({ perPage: +value });
  };

  return <FeedsPageView articles={mergedData} onSearch={onSearch} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />;
};

export default memo(FeedsPageController, () => true);
