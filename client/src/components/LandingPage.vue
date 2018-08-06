<template>
  <div class="search w-100 fl tc flex flex-column">
    <h1 class="pt6">Search</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="q" class="w-25"/>
    </form>
  </div>
</template>

<style>
  input {
    margin: auto;
  }
</style>

<script>
  export default {
    data: () => ({
      q: 'Search term'
    }),
    methods: {
      onSubmit() {
        console.log(this.q)
        this.$router.push({ name: 'Results', params: { nameF: this.q } })
      }
    }
  }
</script>
