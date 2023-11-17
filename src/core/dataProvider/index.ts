import axios from 'axios';

import { createQueryParameters, getBaseUrlByResourceName } from './dataProviderHelpers';

import type { ApiKeyInformation, FetchData } from './dataProviderTypes';

export const fetchData: FetchData = async (options) => {
  const { source, parameters } = options;

  const { baseUrl, apiKey } = getBaseUrlByResourceName(source);

  const apiKeyInformation = {
    [apiKey.key]: apiKey.value,
  } as ApiKeyInformation;

  const queryParameters = createQueryParameters(parameters, apiKeyInformation);

  const response = await axios.get(`${baseUrl}${queryParameters}`).catch((error) => {
    throw error;
  });

  return response?.data;
};
