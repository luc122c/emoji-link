<template>
  <w-card title="Here is your link" title-class="blue-light5--bg title4">
    <w-input type="url" class="mb3" :value="shortLink" v-select-input readonly>
    </w-input>
  </w-card>
</template>

<style scoped>
a[href] {
  text-decoration: underline;
  color: black;
}
</style>

<script>
// import { getCurrentInstance } from 'vue';
export default {
  name: "Link Presentaton",
  props: {
    shortLink: String,
  },
  created: function () {

// const el = getCurrentInstance().ctx.$el;
// console.log( el )
  }
};
</script>


