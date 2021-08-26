<template>
  <w-card title="Here is your link" title-class="blue-light5--bg title4">
    <w-input type="url" class="mb3" :value="shortLink" v-select-input readonly>
    </w-input>
    <w-tooltip show-on-click>
      <template #activator="{ on }">
        <w-button v-on="on" class="ml5" @click="doCopy"
          >Copy to Clipboard</w-button
        >
      </template>
      ✔️ Added to clipboard!
    </w-tooltip>
  </w-card>
</template>

<style scoped>
a[href] {
  text-decoration: underline;
  color: black;
}
</style>

<script>
export default {
  name: "Link Presentaton",
  props: {
    shortLink: String,
  },
  methods: {
    doCopy() {
      navigator.clipboard.writeText(this.shortLink);
    },
  },
};
</script>


