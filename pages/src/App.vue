<template>
  <w-app>
    <h1 class="headline">Emoji Linker 🌐</h1>
    <search-box  class="ma12 mt12"></search-box>
  </w-app>
</template>

<script>
import SearchBox from "./components/SearchBox.vue";
export default {
  name: "App",
  components: { SearchBox },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
