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
  page: number;
  pageSize: number;
  q?: string;
}

export interface TheGuardianParameters {
  page: number;
  perPage: number;
  q?: string;
}

export interface NewYorkTimesParameters {
  page: number;
  pageSize: number;
  q?: string;
}

// required options to call fetch data function
export interface FetchDataOptions {
  resource: NewsResources.NewYorkTimes | NewsResources.TheGuardian | NewsResources.NewsApi;
  parameters?: NewsApiParameters | TheGuardianParameters | NewYorkTimesParameters;
  valueKeyName?: string;
}

export type FetchData = (options: FetchDataOptions, reduxHelper: any) => Promise<AxiosResponse['data']>;
