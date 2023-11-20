import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { NewYorkTimesParameters, NewsApiParameters, NewsResources, TheGuardianParameters } from '../../../core/dataProvider/dataProviderTypes';
import { fetchData } from '../../../core/dataProvider';
import { setBulkParameters } from '../../../core/redux/resourcesSlice';
import { ReduxState } from '../feedsPageTypes';
import { useEffect } from 'react';

type SetBulkQueryParameters = (parameters: { query?: string; page?: number; perPage?: number }) => void;

interface UseFetchData {
  setBulkQueryParameters: SetBulkQueryParameters;
}

const useFetchData = (): UseFetchData => {
  const dispatch: ThunkDispatch<void, void, AnyAction> = useDispatch();

  const newsApiCurrentParameters = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewsApi]?.parameters,
  ) as NewsApiParameters;

  const theGuardianCurrentParameters = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.TheGuardian]?.parameters,
  ) as TheGuardianParameters;

  const newYorkTimesCurrentParameters = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewYorkTimes]?.parameters,
  ) as NewYorkTimesParameters;

  const fetchNewsApiDada = (): void => {
    dispatch(
      fetchData({
        resource: NewsResources.NewsApi,
        parameters: newsApiCurrentParameters as NewsApiParameters | undefined,
      }),
    );
  };

  const fetchTheGuardianDada = (): void => {
    dispatch(
      fetchData({
        resource: NewsResources.TheGuardian,
        valueKeyName: 'response',
        parameters: theGuardianCurrentParameters as TheGuardianParameters | undefined,
      }),
    );
  };

  const fetchNewYorkTimesDada = (): void => {
    dispatch(
      fetchData({
        resource: NewsResources.NewYorkTimes,
        valueKeyName: 'response',
        parameters: newYorkTimesCurrentParameters as NewYorkTimesParameters | undefined,
      }),
    );
  };

  useEffect(() => {
    fetchNewsApiDada();
  }, [newsApiCurrentParameters.q, newsApiCurrentParameters.page, newsApiCurrentParameters.pageSize]);

  useEffect(() => {
    fetchTheGuardianDada();
  }, [theGuardianCurrentParameters.q, theGuardianCurrentParameters.page, theGuardianCurrentParameters.perPage]);

  useEffect(() => {
    fetchNewYorkTimesDada();
  }, [newYorkTimesCurrentParameters.q, newYorkTimesCurrentParameters.page, newYorkTimesCurrentParameters.pageSize]);

  const setBulkQueryParameters: SetBulkQueryParameters = (newParameters) => {
    console.log('newParameters: ', newParameters);
    if ('query' in newParameters) {
      // search has been changed
      dispatch(
        setBulkParameters({
          [NewsResources.NewsApi]: { q: newParameters.query },
          [NewsResources.TheGuardian]: { q: newParameters.query },
          [NewsResources.NewYorkTimes]: { q: newParameters.query },
        }),
      );
    } else if ('page' in newParameters) {
      // pagination has been changed
      dispatch(
        setBulkParameters({
          [NewsResources.NewsApi]: { page: newParameters.page },
          [NewsResources.TheGuardian]: { page: newParameters.page },
          [NewsResources.NewYorkTimes]: { page: newParameters.page },
        }),
      );
    } else if ('perPage' in newParameters) {
      // perPage has been changed
      dispatch(
        setBulkParameters({
          [NewsResources.NewsApi]: { pageSize: newParameters.perPage },
          [NewsResources.TheGuardian]: { perPage: newParameters.perPage },
          [NewsResources.NewYorkTimes]: { pageSize: newParameters.perPage },
        }),
      );
    } else {
      throw new Error('Invalid parameters');
    }
  };

  return { setBulkQueryParameters };
};

export default useFetchData;
