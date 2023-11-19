// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData as fetchDataAPI } from '../dataProvider'; // Import your API function
import { ResourcesState } from './types';
import { setData, setError } from './resourcesSlice';

interface FetchDataPayload {
  resourceName: keyof ResourcesState;
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (payload: FetchDataPayload, { dispatch }) => {
    const { resourceName } = payload;

    try {
      const data = await fetchDataAPI(resourceName); // Adjust the API call as needed
      dispatch(setData({ resourceName, data }));
      return data;
    } catch (error) {
      dispatch(setError({ resourceName }));
      throw error; // Re-throw the error for the component to handle if needed
    }
  }
);
