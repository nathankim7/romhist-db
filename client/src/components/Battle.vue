<template>
    <div class="battle">
        <template v-if="loading > 0">
            <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading...</div>
            </div>
        </template>
        <template v-else>
            <h1 class="f0 black mv4 ml3 w-100">{{battle.name}}</h1>
            <custom-link :things="[battle.year]" :name="'Year'" :prompt="'Year: '"></custom-link>
            <custom-link :things="battle.attackers" :name="'Person'" :prompt="'Attackers: '"></custom-link>
            <custom-link :things="battle.defenders" :name="'Person'" :prompt="'Defenders: '"></custom-link>
        </template>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import CustomLink from './CustomLink.vue'

const BATTLE_QUERY = gql `
query BattleQuery($id: ID!) {
    battle(id: $id) {
        id
        name
        year {
            name
            id
        }
        attackers {
            name
            id
        }
        defenders {
            name
            id
        }
    }
}`

export default {
    data: () => ({
        battle: {},
        loading: 0
    }),
    apollo: {
        battle: {
            query: BATTLE_QUERY,
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
