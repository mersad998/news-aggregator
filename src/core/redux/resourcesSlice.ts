import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  NewsApiArticleInterface,
  TheGuardianArticleInterface,
  NYTimesArticleInterface,
} from '../../components/feedsPage/newsTypes';
import { ResourcesState } from './types';
import { NewsResources } from '../dataProvider/dataProviderTypes';
import NYTMockData from '../../core/NYTMockData.json';

// ---------------------------------- action interfaces ----------------------------------
interface SetDataPayload<T> {
  resourceName: keyof ResourcesState;
  data: T;
}

interface SetErrorPayload {
  resourceName: keyof ResourcesState;
}

// ---------------------------------- initial data ----------------------------------
const initialState: ResourcesState = {
  [NewsResources.NewsApi]: {
    data: null,
    hasError: false,
    isLoading: true,
  },
  [NewsResources.TheGuardian]: {
    data: null,
    hasError: false,
    isLoading: true,
  },
  [NewsResources.NewYorkTimes]: {
    data: null,
    hasError: false,
    isLoading: true,
  },
};

// ---------------------------------- slice ----------------------------------
const resourcesSlice = createSlice({
  name: 'newsResources',
  initialState,
  reducers: {
    setData: <T extends NewsApiArticleInterface | TheGuardianArticleInterface | NYTimesArticleInterface>(
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
  },
});

// ---------------------------------- actions ----------------------------------
export const { setData, setError } = resourcesSlice.actions;

// ---------------------------------- selectors ----------------------------------
export const selectResource =
  (resourceName: keyof ResourcesState) =>
  (state: { resources: ResourcesState }): ResourcesState[keyof ResourcesState] => {
    return state.resources?.[resourceName];
  };

export default resourcesSlice.reducer;
