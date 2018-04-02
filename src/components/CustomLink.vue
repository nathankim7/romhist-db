<template>
    <div class="customLink">
        <template v-if="things">
            <p class="f4 ml3 black-60">{{prompt}}
                <router-link v-for="(thing, index) in things" :key="thing.id" :to="{ name: name, params: { id: thing.id } }" class="link f4 ml3 black-60">
                    {{thing.name}}
                    <p class="f4 ml3 black-60" v-if="index + 1 < things.length">,</p>
                </router-link>
            </p>
        </template>
    </div>
</template>

<script>
export default {
    props: ['things', 'name', 'prompt']
}
</script>

<style>
</style>
