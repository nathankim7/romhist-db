import Vue from 'vue'
import Router from 'vue-router'
import TempPage from 'components/TempPage'
import NotFoundPage from 'components/NotFoundPage'
import PeoplePage from 'components/PeoplePage'
import Person from 'components/Person'
import TimelinePage from 'components/TimelinePage'
import Year from 'components/Year'
import ResultsPage from 'components/ResultsPage'
import { timingSafeEqual } from 'crypto';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Temp',
      component: TempPage
    },
    {
      path: '/people',
      name: 'People',
      component: PeoplePage,
      children: [
        {
          path: 'person/:id',
          name: 'Person',
          component: Person,
          props: true
        }
      ]
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: TimelinePage,
      children: [
        {
          path: 'year/:id',
          name: 'Year',
          component: Year
        }
      ]
    },
    {
      path: '/results/:nameF',
      name: 'Results',
      component: ResultsPage
    }
  ]
})
