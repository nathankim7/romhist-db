import Vue from 'vue'
import Router from 'vue-router'
import ListTemplate from './components/ListTemplate.vue'
import Person from './components/Person.vue'
import Year from './components/Year.vue'
import LandingPage from './components/LandingPage.vue'
import ResultsPage from './components/ResultsPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingPage,
    },
    {
      path: '/results/:nameF',
      name: 'Results',
      component: ResultsPage
    },
    {
      path: '/people',
      name: 'People',
      component: ListTemplate,
      props: { single: 'Person', plural: 'People' },
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
      component: ListTemplate,
      props: { single: 'Year', plural: 'Years' },
      children: [
        {
          path: 'year/:id',
          name: 'Year',
          component: Year,
          props: true
        }
      ]
    }
  ]
})
