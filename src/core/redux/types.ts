import {
  NYTimesArticleInterface,
  NewsApiArticleInterface,
  TheGuardianArticleInterface,
} from '../../components/feedsPage/newsTypes';
import {
  NewYorkTimesParameters,
  NewsApiParameters,
  NewsResources,
  TheGuardianParameters,
} from '../dataProvider/dataProviderTypes';

export interface ResourceState<T> {
  data: T | null;
  hasError: boolean;
  isLoading: boolean;
  parameters: NewsApiParameters | TheGuardianParameters | NewYorkTimesParameters;
}

export interface ResourcesState {
  [NewsResources.NewsApi]: ResourceState<NewsApiArticleInterface>;
  [NewsResources.TheGuardian]: ResourceState<TheGuardianArticleInterface>;
  [NewsResources.NewYorkTimes]: ResourceState<NYTimesArticleInterface>;
}
