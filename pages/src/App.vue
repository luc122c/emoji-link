<template>
  <w-app>
    <w-card
      title="Emoji Linker 🌐"
      title-class="blue-light5--bg"
      class="ma12 mt12"
    >
      <w-form>
        <w-input class="mb3" type="url" placeholder="Enter a URL here"  :validators="[validators.required]">
        </w-input>

        <w-button type="submit">Submit</w-button>
      </w-form>
    </w-card>
  </w-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
  validators: {
    required: value => !!value || 'This field is required'
  }
})
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
