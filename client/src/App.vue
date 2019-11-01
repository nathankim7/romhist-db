<template>
  <div class="app flex flex-column h-100">
    <nav class="pa3 p4-ns">
      <router-link v-bind:to="'/'" exact class="link dim black b f6 f5-ns dib mr3 hover-purple" title="Landing">Search</router-link>
      <router-link v-bind:to="'/people'" exact class="link dim gray f6 f5-ns dib mr3 hover-purple" title="People">People</router-link>
      <router-link v-bind:to="'/timeline'" exact class="link dim gray f6 f5-ns dib mr3 hover-purple" title="Timeline">Timeline</router-link>
      <router-link v-bind:to="'/battles'" exact class="link dim gray f6 f5-ns dib mr3 hover-purple" title="Battles">Battles</router-link>
    </nav>
    <div id="main" class="fl w-100 ph3 bt b--black-10">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#main {
  flex: 1;
}

body, input, button {
  font-size: 16pt;
}

ul li {
  list-style: none;
}

li {
  padding-bottom: 16px;
}

input:focus {
  box-shadow: none;
  outline: none;
}

input {
  padding: 8px;
  border: solid 1px #bbb;
  border-radius: 2px;
}

body {
  margin: 0;
  padding: 0;
  font-family: Helvetica, sans-serif;
  height: 100%;
}

.link:hover, .link:focus {
  color: #5e2ca5;
}

html {
  box-sizing: border-box;
  height: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
}
</style>
