import moment from 'moment';
import { NewsResources } from '../../core/dataProvider/dataProviderTypes';
import type { ReduxState, DisplayableArticle } from './feedsPageTypes';
import { NYTimesArticleInterface, NewsApiArticleInterface, TheGuardianArticleInterface } from './newsTypes';

const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';

const extractCompatibleDataFromNewsApiData = (data?: NewsApiArticleInterface | null): DisplayableArticle[] => {
  if (!data) return [];

  return data.articles.map((article) => ({
    resource: NewsResources.NewsApi,
    date: moment(new Date(article.publishedAt)).format(DATE_FORMAT),
    title: article.title,
    description: article.description,
    author: article.author,
    url: article.url,
    images: [article.urlToImage],
    sourceName: article.source.name,
  }));
};
const extractCompatibleDataFromTheGuardianData = (data?: TheGuardianArticleInterface | null): DisplayableArticle[] => {
  if (!data) return [];

  return data.results.map((article) => ({
    resource: NewsResources.TheGuardian,
    date: moment(new Date(article.webPublicationDate)).format(DATE_FORMAT),
    title: article.webTitle,
    description: 'for more details click on the button below',
    author: article.sectionName,
    url: article.webUrl,
    images: [],
    sourceName: article.sectionName,
  }));
};
const extractCompatibleDataFromNewYorkTimesData = (data?: NYTimesArticleInterface | null): DisplayableArticle[] => {
  if (!data) return [];

  return data.docs.map((article) => ({
    resource: NewsResources.NewYorkTimes,
    date: moment(new Date(article.pub_date)).format(DATE_FORMAT),
    title: article.headline.main,
    description: article.lead_paragraph,
    author: article.byline.original,
    url: article.web_url,
    images: [],
    sourceName: article.source,
  }));
};

export const mergeAndSortArticles = (data: {
  newsApiData: ReduxState[NewsResources.NewsApi];
  theGuardianData: ReduxState[NewsResources.TheGuardian];
  newYorkTimesData: ReduxState[NewsResources.NewYorkTimes];
}): DisplayableArticle[] => {
  const { newsApiData, theGuardianData, newYorkTimesData } = data;

  const mergedData: DisplayableArticle[] = [
    ...extractCompatibleDataFromNewsApiData(newsApiData?.data).slice(0, 10),
    ...extractCompatibleDataFromTheGuardianData(theGuardianData?.data),
    ...extractCompatibleDataFromNewYorkTimesData(newYorkTimesData?.data),
  ];

  mergedData.sort((a, b) => {
    const dateA = moment(a.date, DATE_FORMAT);
    const dateB = moment(b.date, DATE_FORMAT);
    return dateA.isBefore(dateB) ? 1 : -1;
  });

  return mergedData;
};
