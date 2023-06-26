import { lazy, Suspense } from 'react';
import HomePage from 'interface/Home';
import PrivacyPage from 'interface/PrivacyPage';
import ReportLayout from 'interface/report';
import {
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import NotFound from 'interface/NotFound';
import RouterErrorBoundary from 'interface/RouterErrorBoundary';
import {
  AboutTab,
  CharacterTab,
  DefaultTab,
  EventsTab,
  OverviewTab,
  StatisticsTab,
  TimelineTab,
} from 'interface/report/Results/ResultsContent';

import AppLayout from './AppLayout';

const CharacterPage = lazy(
  () => import(/* webpackChunkName: 'CharacterPage' */ 'interface/CharacterPage'),
);
const GuildPage = lazy(() => import(/* webpackChunkName: 'GuildPage' */ 'interface/GuildPage'));
const News = lazy(() => import(/* webpackChunkName: 'News' */ 'interface/News'));
const NewsPage = lazy(() => import(/* webpackChunkName: 'News' */ 'interface/NewsPage'));
const SpecList = lazy(() => import(/* webpackChunkName: 'SpecList' */ 'interface/SpecList'));
const Premium = lazy(() => import(/* webpackChunkName: 'PremiumPage' */ 'interface/PremiumPage'));
const AboutPage = lazy(() => import(/* webpackChunkName: 'AboutPage' */ 'interface/AboutPage'));
const HelpWanted = lazy(
  () => import(/* webpackChunkName: 'HelpWantedPage' */ 'interface/HelpWantedPage'),
);
const ContributorPage = lazy(
  () => import(/* webpackChunkName: 'ContributorPage' */ 'interface/ContributorPage'),
);
const Search = lazy(() => import(/* webpackChunkName: 'Search' */ 'interface/Search'));

const appRoutes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />} errorElement={<RouterErrorBoundary />}>
    <Route path="character/:region/:realm/:name" element={<CharacterPage />} />
    <Route path="guild/:region/:realm/:name" element={<GuildPage />} />
    <Route path="report/:reportCode/:fightId?/:player?/:build?" element={<ReportLayout />}>
      <Route index element={<OverviewTab />} />
      <Route path="overview" element={<OverviewTab />} />
      <Route path="statistics" element={<StatisticsTab />} />
      <Route path="timeline" element={<TimelineTab />} />
      <Route path="events" element={<EventsTab />} />
      <Route path="character" element={<CharacterTab />} />
      <Route path="about" element={<AboutTab />} />
      <Route path=":resultTab" element={<DefaultTab />} />
    </Route>
    <Route path="privacy" element={<PrivacyPage />} />
    <Route element={<HomePage />}>
      <Route index element={<News />} />
      <Route path="news">
        <Route path=":articleId" element={<NewsPage />} />
        <Route index element={<News />} />
      </Route>
      <Route path="specs" element={<SpecList />} />
      <Route path="premium" element={<Premium />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="help-wanted" element={<HelpWanted />} />
      <Route path="contributor/:id" element={<ContributorPage />} />
      <Route path="search/:searchTerm?" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>,
);

const router =
  process.env.NODE_ENV === 'test' ? createMemoryRouter(appRoutes) : createBrowserRouter(appRoutes);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />;
    </Suspense>
  );
};

export default App;
