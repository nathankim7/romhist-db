<template>
    <div class="customLink">
        <template v-if="things">
            <p class="f4 ml3 black-60">
                {{prompt}}
                <router-link v-for="(thing, index) in things" :key="thing.id" :to="{ name: name, params: { id: thing.id } }" class="link f4 ml3 black-60">
                    {{(thing.name ? thing.name : thing.value) + (things.length > index + 1 ? ',' : '')}}
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
