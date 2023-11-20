import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { NewsApiArticleInterface, TheGuardianArticleInterface, NYTimesArticleInterface } from '../../components/feedsPage/newsTypes';
import { ResourcesState } from './types';
import { NewsApiParameters, NewsResources, NewYorkTimesParameters, TheGuardianParameters } from '../dataProvider/dataProviderTypes';
import NYTMockData from '../../core/NYTMockData.json';

// ---------------------------------- action interfaces ----------------------------------
interface SetDataPayload<T> {
  resourceName: keyof ResourcesState;
  data: T;
}

interface SetErrorPayload {
  resourceName: keyof ResourcesState;
}

interface SetBulkParametersPayload {
  [NewsResources.NewsApi]: Partial<NewsApiParameters>;
  [NewsResources.TheGuardian]: Partial<TheGuardianParameters>;
  [NewsResources.NewYorkTimes]: Partial<NewYorkTimesParameters>;
}

// ---------------------------------- initial data ----------------------------------
const initialState: ResourcesState = {
  [NewsResources.NewsApi]: {
    data: null,
    hasError: false,
    isLoading: true,
    parameters: {
      page: 1,
      pageSize: 10,
    },
  },
  [NewsResources.TheGuardian]: {
    data: null,
    hasError: false,
    isLoading: true,
    parameters: {
      page: 1,
      perPage: 10,
    },
  },
  [NewsResources.NewYorkTimes]: {
    data: null,
    hasError: false,
    isLoading: true,
    parameters: {
      page: 1,
      pageSize: 10,
    },
  },
};

// ---------------------------------- slice ----------------------------------
const resourcesSlice = createSlice({
  name: 'newsResources',
  initialState,
  reducers: {
    setData: <
      T extends
        | Omit<NewsApiArticleInterface, 'parameters'>
        | Omit<TheGuardianArticleInterface, 'parameters'>
        | Omit<NYTimesArticleInterface, 'parameters'>,
    >(
      state: ResourcesState,
      action: PayloadAction<SetDataPayload<T>>,
    ) => {
      const { resourceName, data } = action.payload;
      state[resourceName].data = data;
      state[resourceName].isLoading = false;
    },

    setError: (state, action: PayloadAction<SetErrorPayload>) => {
      const { resourceName } = action.payload;
      // TODO : this is correct
      // state[resourceName].hasError = true;
      // state[resourceName].isLoading = false;
      // fixme: this is temporary
      state[resourceName].data = NYTMockData.response as any;
      state[resourceName].isLoading = false;
    },

    setParameter: () => {
      // it can be implemented in the future (for single resource)
    },

    setBulkParameters: (state, action: PayloadAction<SetBulkParametersPayload>) => {
      state[NewsResources.NewsApi].parameters = { ...state.NEWS_API.parameters, ...action.payload[NewsResources.NewsApi] };
      state[NewsResources.TheGuardian].parameters = {
        ...state.THE_GUARDIAN.parameters,
        ...action.payload[NewsResources.TheGuardian],
      };
      state[NewsResources.NewYorkTimes].parameters = {
        ...state.NEW_YORK_TIMES.parameters,
        ...action.payload[NewsResources.NewYorkTimes],
      };
    },
  },
});

// ---------------------------------- actions ----------------------------------
export const { setData, setError, setBulkParameters } = resourcesSlice.actions;
export default resourcesSlice.reducer;
