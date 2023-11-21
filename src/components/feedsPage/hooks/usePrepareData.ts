import { useSelector } from 'react-redux';
import { DisplayableArticle, ReduxState } from '../feedsPageTypes';
import { NewsResources } from '../../../core/dataProvider/dataProviderTypes';
import { DATE_FORMAT, debounce, mergeArticles, sortArrayByValue } from '../feedsPageHelper';
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

  // gather all data from redux store in separate variables
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

  // merge data from all resources
  const mergedData = mergeArticles({
    newsApiData,
    theGuardianData,
    newYorkTimesData,
  });

  // all articles should be sorted by date
  mergedData.sort((a, b) => {
    const dateA = moment(a.date, DATE_FORMAT);
    const dateB = moment(b.date, DATE_FORMAT);

    return dateA.isBefore(dateB) ? 1 : -1;
  });

  // in these three resources only newsApiData has category parameter
  // so if category is selected as a parameter, sort articles by category
  if (newsApiData?.parameters.category) {
    sortArrayByValue(mergedData, 'title', newsApiData.parameters.category);
  }

  // in these three resources no one accept sourceName and author in free version
  // so if sourceName or author is selected as a parameter, sort articles by tag
  if (theGuardianData?.parameters.tag) {
    sortArrayByValue(mergedData, 'sourceName', theGuardianData.parameters.tag);
    sortArrayByValue(mergedData, 'author', theGuardianData.parameters.tag);
  }

  // filter by resource is client side filtering
  const filteredData = mergedData.filter((article) => selectedResources.includes(article.resource));

  // calculate total count
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
