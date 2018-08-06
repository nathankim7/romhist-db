<template>
    <div class="results h-100">
        <template v-if="loading > 0">
            <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading...</div>
            </div>
        </template>
        <template v-else class="flex flex-column">
            <template v-if="people.length > 0">
                <h1 class="mv3">People</h1>
                <custom-link :things="people" :name="'Person'" :prompt="''"></custom-link>
            </template>
            <template v-if="timeline.length > 0">
                <h1 class="mv3">Years</h1>
                <custom-link :things="timeline" :name="'Year'" :prompt="''"></custom-link>
            </template>
        </template>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import CustomLink from './CustomLink.vue'

const PEOPLE_QUERY = gql `
query PeopleSearch($nameF: String) {
    people(nameF: $nameF) {
        id
        name
    }
}`

const YEARS_QUERY = gql `
query YearsSearch($nameF: String) {
    timeline(nameF: $nameF) {
        id
        name
    }
}`

export default {
    data: () => ({
        people: {},
        timeline: {},
        loading: 0
    }),
    apollo: {
        people: {
            query: PEOPLE_QUERY,
            loadingKey: 'loading',
            variables() {
                return { nameF: this.$route.params.nameF }
            }
        },
        /*timeline: {
            query: YEARS_QUERY,
            loadingKey: 'loading',
            variables() {
                return { nameF: this.$route.params.nameF }
            }
        }*/
    },
    components: { CustomLink }
}
</script>

<style>

</style>
