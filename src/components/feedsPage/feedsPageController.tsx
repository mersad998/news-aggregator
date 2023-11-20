import { memo, type FC, ChangeEvent } from 'react';

import LoadingBox from '../LoadingBox';
import FeedsPageView from './feedsPageView';
import useFetchData from './hooks/useFetchData';
import usePrepareData from './hooks/usePrepareData';
import { debounce } from './feedsPageHelper';

const FeedsPageController: FC = () => {
  const { setBulkQueryParameters } = useFetchData();
  const { data, isLoading, totalCount, onResourceSelect } = usePrepareData();

  if (isLoading) {
    return <LoadingBox />;
  }

  const onSearch = debounce((event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setBulkQueryParameters({ query: value });
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
