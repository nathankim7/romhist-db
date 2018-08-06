<template>
    <div class="person">
        <template v-if="loading > 0">
            <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading...</div>
            </div>
        </template>
        <template v-else>
            <h1 class="f0 black mv4 ml3 w-100">  {{person.name}}</h1>
            <custom-link :things="[ person.birthYear ]" :name="'Year'" :prompt="'Born: '"></custom-link>
        </template>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import CustomLink from './CustomLink.vue'

const PERSON_QUERY = gql `
query PersonQuery($id: ID!) {
    person(id: $id) {
        id
        name
        birthYear {
            value
            id
        }
    }
}`

export default {
    props: ['id'],
    data: () => ({
        person: {},
        loading: 0
    }),
    apollo: {
        person: {
            query: PERSON_QUERY,
            loadingKey: 'loading',
            variables() {
                return { id: this.id }
            }
        }
    },
    components: { CustomLink }
}
</script>

<style>

</style>
