import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchData } from './actions';

import type {
  NewsApiArticleInterface,
  TheGuardianArticleInterface,
  NYTimesArticleInterface,
} from '../../components/feedsPage/newsTypes';
import { ResourcesState } from './types';
import { NewsResources } from '../dataProvider/dataProviderTypes';

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
      state[resourceName].hasError = true;
      state[resourceName].isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      const { resourceName } = action.meta.arg;
      state[resourceName].isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { resourceName } = action.meta.arg;
      state[resourceName].isLoading = false;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      const { resourceName } = action.meta.arg;
      state[resourceName].isLoading = false;
    });
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
