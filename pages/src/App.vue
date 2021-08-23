<template>
  <w-app>
    <h1 class="headline mb5">Emoji Linker 🌐</h1>
    <search-box
      v-if="!shortLink"
      class="xs6 mxa"
      @showLink="setLink($event)"
    ></search-box>
    <link-presentation
      v-if="shortLink"
      class="xs6 mxa"
      :shortLink="shortLink"
    ></link-presentation>
  </w-app>
</template>

<script>
import LinkPresentation from "./components/LinkPresentation.vue";
import SearchBox from "./components/SearchBox.vue";
export default {
  name: "App",
  components: { SearchBox, LinkPresentation },
  data() {
    return {
      shortLink: null,
    };
  },
  methods: {
    setLink: function (link) {
      this.shortLink = link;
    },
  },
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
