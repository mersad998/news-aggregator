import { memo, useEffect, type ReactElement } from 'react';

import DashboardView from './DashboardView';
import { fetchData } from '../../core/dataProvider';

import {
  NewsResources,
  type NewsApiParameters,
  type TheGuardianParameters,
} from '../../core/dataProvider/dataProviderTypes';

const DashboardController = (): ReactElement => {
  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async (): Promise<void> => {
    const newsApiData = await fetchData({
      source: NewsResources.NewsApi,
      parameters: {
        from: '2023-10-17',
        q: 'Apple',
        sortBy: 'popularity',
      } as NewsApiParameters,
    });

    const theGuardianData = await fetchData({
      source: NewsResources.TheGuardian,
      parameters: {
        q: 'debate',
        page: 2,
      } as TheGuardianParameters,
    });

    console.log({ newsApiData, theGuardianData });
  };

  return <DashboardView />;
};

export default memo(DashboardController, () => true);
