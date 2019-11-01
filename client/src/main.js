import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import router from './router'

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql'//'https://romhist-server-dgxtsrqcxs.now.sh/graphql'
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

new Vue({
    el: '#app',
    provide: apolloProvider.provide(),
    router,
    render: h => h(App)
})
