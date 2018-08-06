<template>
    <div class="template h-100">
        <template v-if="loading > 0">
            <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading...</div>
            </div>
        </template>
        <template v-else>
            <div class="flex h-100">
                <div class="h-100 pr3">
                    <h1 class="mt4 mb3">{{plural}}</h1>
                    <ul class="pl3 mv3">
                        <li v-for="thing in things" :key="thing.id">
                            <router-link :to="{ name: single, params: { id: thing.id } }" class="f3 lh-copy link black-60">{{(thing.name ? thing.name : thing.value)}}</router-link>
                        </li>
                    </ul>
                </div>
                <div id="thing" class="h-100">
                    <router-view/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    props: ['plural', 'single'],
    data: () => ({
        things: {},
        loading: 0
    }),
    apollo: {
        things: {
            query () {
                if (this.plural === 'People') {
                    return gql `{
                        people {
                            id
                            name
                        }
                    }`
                }

                if (this.plural === 'Years') {
                    return gql `{
                        years {
                            id
                            value
                        }
                    }`
                }
            },
            update: data => data.people || data.years,
            loadingKey: 'loading'
        }
    }
}
</script>

<style>
#thing {
    flex: 1;
}
</style>
