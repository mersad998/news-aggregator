import { memo, useEffect, type FC } from 'react';

import FeedsPageView from './feedsPageView';

import { useDispatch, useSelector } from 'react-redux';

import { mergeAndSortArticles } from './feedsPageHelper';
import LoadingBox from '../LoadingBox';
import { selectResource } from '../../core/redux/resourcesSlice';
import { fetchData } from '../../core/dataProvider';
import {
  NewYorkTimesParameters,
  NewsApiParameters,
  NewsResources,
  TheGuardianParameters,
} from '../../core/dataProvider/dataProviderTypes';

import { ReduxState } from './feedsPageTypes';

const FeedsPageController: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(
      fetchData({
        resource: NewsResources.NewsApi,
        parameters: {
          from: '2023-11-05',
          q: 'Apple',
          sortBy: 'popularity',
        } as NewsApiParameters,
      }),
    );
    dispatch<any>(
      fetchData({
        resource: NewsResources.TheGuardian,
        parameters: {
          q: 'debate',
          page: 2,
        } as TheGuardianParameters,
        valueKeyName: 'response',
      }),
    );
    dispatch<any>(
      fetchData({
        resource: NewsResources.NewYorkTimes,
        parameters: {
          q: 'debate',
        } as NewYorkTimesParameters,
        valueKeyName: 'response',
      }),
    );
  }, []);

  const newsApiData = useSelector(selectResource(NewsResources.NewsApi)) as ReduxState[NewsResources.NewsApi];
  const theGuardianData = useSelector(selectResource(NewsResources.TheGuardian)) as ReduxState[NewsResources.TheGuardian];
  const newYorkTimesData = useSelector(selectResource(NewsResources.NewYorkTimes)) as ReduxState[NewsResources.NewYorkTimes];

  if (newsApiData?.isLoading && theGuardianData?.isLoading && newYorkTimesData?.isLoading) {
    return <LoadingBox />;
  }

  const mergedData = mergeAndSortArticles({
    newsApiData,
    theGuardianData,
    newYorkTimesData,
  });

  return <FeedsPageView articles={mergedData} />;
};

export default memo(FeedsPageController, () => true);
