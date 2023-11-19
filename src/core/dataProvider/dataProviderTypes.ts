import type { AxiosResponse } from 'axios';

// declare all news websites as an enum to prevent misspelling entire app
export enum NewsResources {
  NewsApi = 'NEWS_API',
  TheGuardian = 'THE_GUARDIAN',
  NewYorkTimes = 'NEW_YORK_TIMES',
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

export interface NewYorkTimesParameters {
  q: string;
}

// required options to call fetch data function
export interface FetchDataOptions {
  resource: NewsResources.NewYorkTimes | NewsResources.TheGuardian | NewsResources.NewsApi;
  parameters: NewsApiParameters | TheGuardianParameters | NewYorkTimesParameters;
  valueKeyName?: string;
}

export type FetchData = (options: FetchDataOptions, reduxHelper: any) => Promise<AxiosResponse['data']>;
