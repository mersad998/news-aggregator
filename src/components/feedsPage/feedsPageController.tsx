import { memo, type FC, ChangeEvent } from 'react';

import LoadingBox from '../LoadingBox';
import FeedsPageView from './feedsPageView';
import useFetchData from './hooks/useFetchData';
import usePrepareData from './hooks/usePrepareData';
import { debounce } from './feedsPageHelper';
import { NewsResources } from '../../core/dataProvider/dataProviderTypes';

const FeedsPageController: FC = () => {
  const { setBulkQueryParameters, setQueryParameterToResource } = useFetchData();
  const { data, isLoading, totalCount, onResourceSelect } = usePrepareData();

  if (isLoading) {
    return <LoadingBox />;
  }

  // it will use both for bulk search and search by (category, author, sources) for each resource
  // in case of bulk search, it will use the same query for all resources
  // otherwise, it will use the query for the supported resource
  const onSearch = debounce((event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    const id = event.target.id as string;

    if (id === 'bulk') {
      setBulkQueryParameters({ query: value });
    } else if (id === 'category') {
      setQueryParameterToResource({ country: value }, NewsResources.NewsApi);
    } else if (id === 'author' || id === 'sources') {
      setQueryParameterToResource({ tag: value }, NewsResources.TheGuardian);
    }
  }, 500);

  const onPageChange = debounce((page: number): void => {
    setBulkQueryParameters({ page });
  }, 500);
  const onPageSizeChange = debounce((pageSize: number): void => {
    setBulkQueryParameters({ perPage: +pageSize });
  }, 500);

  return (
    <FeedsPageView
      articles={data}
      onSearch={onSearch}
      totalCount={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onResourceSelect={onResourceSelect}
    />
  );
};

export default memo(FeedsPageController, () => true);
