import { memo, type FC, ChangeEvent } from 'react';

import LoadingBox from '../LoadingBox';
import FeedsPageView from './feedsPageView';
import useFetchData from './hooks/useFetchData';
import usePrepareData from './hooks/usePrepareData';
import { debounce } from './feedsPageHelper';

const FeedsPageController: FC = () => {
  const { setBulkQueryParameters } = useFetchData();
  const { data, isLoading, onResourceSelect } = usePrepareData();

  if (isLoading) {
    return <LoadingBox />;
  }

  const onSearch = debounce((event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setBulkQueryParameters({ query: value });
  }, 500);

  const onPageChange = debounce((event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setBulkQueryParameters({ page: +value });
  }, 500);

  const onPageSizeChange = debounce((event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setBulkQueryParameters({ perPage: +value });
  }, 500);

  return (
    <FeedsPageView
      articles={data}
      onSearch={onSearch}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onResourceSelect={onResourceSelect}
    />
  );
};

export default memo(FeedsPageController, () => true);
