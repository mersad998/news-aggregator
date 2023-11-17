import type { AxiosResponse } from 'axios';

// declare all news websites as an enum to prevent misspelling entire app
export enum NewsResources {
  NewsApi = 'NEWS_API',
  TheGuardian = 'THE_GUARDIAN',
}

export type ApiKeyInformation = { key: string; value: string };

export type GetBaseUrlByResourceName = (resource: NewsResources) => {
  baseUrl: string;
  apiKey: ApiKeyInformation;
};

export interface NewsApiParameters {
  q: string;
  from: string;
  sortBy: string;
}

export interface TheGuardianParameters {
  q: string;
  page: number;
}

// required options to call fetch data function
export interface FetchDataOptions {
  source: NewsResources;
  parameters: NewsApiParameters | TheGuardianParameters;
}

export type FetchData = (options: FetchDataOptions) => Promise<AxiosResponse['data'] | void>;
