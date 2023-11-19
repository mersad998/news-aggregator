import {
  NYTimesArticleInterface,
  NewsApiArticleInterface,
  TheGuardianArticleInterface,
} from '../../components/dashboard/newsTypes';
import { NewsResources } from '../dataProvider/dataProviderTypes';

export interface ResourceState<T> {
  data: T | null;
  hasError: boolean;
  isLoading: boolean;
}

export interface ResourcesState {
  [NewsResources.NewsApi]: ResourceState<NewsApiArticleInterface>;
  [NewsResources.TheGuardian]: ResourceState<TheGuardianArticleInterface>;
  [NewsResources.NewYorkTimes]: ResourceState<NYTimesArticleInterface>;
}
