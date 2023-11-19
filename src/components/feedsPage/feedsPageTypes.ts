import { NewsResources } from '../../core/dataProvider/dataProviderTypes';
import { NYTimesArticleInterface, NewsApiArticleInterface, TheGuardianArticleInterface } from './newsTypes';

export interface ReduxState {
  [NewsResources.NewsApi]?: {
    data: NewsApiArticleInterface | null;
    hasError: boolean;
    isLoading: boolean;
  };

  [NewsResources.TheGuardian]?: {
    data: TheGuardianArticleInterface | null;
    hasError: boolean;
    isLoading: boolean;
  };

  [NewsResources.NewYorkTimes]?: {
    data: NYTimesArticleInterface | null;
    hasError: boolean;
    isLoading: boolean;
  };
}

export interface FeedsPageViewProps {
  articles: DisplayableArticle[];
}

export interface DisplayableArticle {
  resource: NewsResources.NewsApi | NewsResources.TheGuardian | NewsResources.NewYorkTimes;
  date: string;
  title: string;
  description: string;
  author: string;
  url: string;
  images: string[];
  sourceName: string;
}
