<template>
    <div class="year">
        <template v-if="loading > 0">
            <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading...</div>
            </div>
        </template>
        <template v-else>
            <h1 class="f0 black mv4 ml3 w-100">{{year.name}}</h1>
            <custom-link :things="year.births" :name="'Person'" :prompt="'Born: '"></custom-link>
            <custom-link :things="year.deaths" :name="'Person'" :prompt="'Died: '"></custom-link>
            <custom-link :things="year.battles" :name="'Battle'" :prompt="'Battles: '"></custom-link>
        </template>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import CustomLink from './CustomLink.vue'

const YEAR_QUERY = gql `
query YearQuery($id: ID!) {
    year(id: $id) {
        id
        value
        births {
            name
            id
        }
        deaths {
            name
            id
        }
        battles {
            name
            id
        }
    }
}`

export default {
    data: () => ({
        year: {},
        loading: 0
    }),
    apollo: {
        year: {
            query: YEAR_QUERY,
            loadingKey: 'loading',
            variables() {
                return { id: this.$route.params.id }
            }
        }
    },
    components: { CustomLink }
}
</script>

<style>

</style>
