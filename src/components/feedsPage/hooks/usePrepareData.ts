import { useSelector } from 'react-redux';
import { DisplayableArticle, ReduxState } from '../feedsPageTypes';
import { NewsResources } from '../../../core/dataProvider/dataProviderTypes';
import { DATE_FORMAT, debounce, mergeArticles } from '../feedsPageHelper';
import moment from 'moment';
import { useState } from 'react';
import { allSelectableResources } from '../../searchBar/searchBarHelper';

interface UsePrepareData {
  data: DisplayableArticle[];
  isLoading: boolean;
  onResourceSelect: (selectedResources: string[]) => void;
  totalCount: number;
}

const usePrepareData = (): UsePrepareData => {
  const [selectedResources, setSelectedResources] = useState<string[]>(allSelectableResources);

  // get data from redux store
  const newsApiData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewsApi],
  ) as ReduxState[NewsResources.NewsApi];

  const theGuardianData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.TheGuardian],
  ) as ReduxState[NewsResources.TheGuardian];

  const newYorkTimesData = useSelector<{ resources: ReduxState }>(
    (state) => state.resources[NewsResources.NewYorkTimes],
  ) as ReduxState[NewsResources.NewYorkTimes];

  // app should be loading only when all of resources are in loading state and there is no data in redux store
  const isLoading = !!newsApiData?.isLoading && !!theGuardianData?.isLoading && !!newYorkTimesData?.isLoading;

  const onResourceSelect = debounce((selectedResources: string[]): void => {
    setSelectedResources((allSelectableResources as string[]).filter((resource) => selectedResources.includes(resource)));
  }, 500);

  // merge and sort data
  const mergedData = mergeArticles({
    newsApiData,
    theGuardianData,
    newYorkTimesData,
  });
  console.log('newsApiData: ', newsApiData);
  console.log('theGuardianData: ', theGuardianData);
  console.log('newYorkTimesData: ', newYorkTimesData);

  mergedData.sort((a, b) => {
    const dateA = moment(a.date, DATE_FORMAT);
    const dateB = moment(b.date, DATE_FORMAT);

    return dateA.isBefore(dateB) ? 1 : -1;
  });

  const filteredData = mergedData.filter((article) => selectedResources.includes(article.resource));

  const totalCount =
    (newsApiData?.data?.totalResults ?? 0) + (theGuardianData?.data?.total ?? 0) + (newYorkTimesData?.data?.meta.time ?? 0);

  return {
    data: filteredData,
    isLoading,
    onResourceSelect,
    totalCount,
  };
};

export default usePrepareData;
