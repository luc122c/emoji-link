<template>
  <w-card title="Enter a URL below" title-class="blue-light5--bg title4">
    <w-form @success="success">
      <w-input
        name="link"
        class="mb3"
        type="url"
        placeholder="Enter a URL here"
        :validators="[validators.required, validators.isURL]"
        :loading="this.loading"
        autocomplete="off"
      >
      </w-input>

      <w-button type="submit">Submit</w-button>
    </w-form>
  </w-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Search Box",
  data() {
    return {
      longLink: null,
      shortLink: null,
      loading: false,
      validators: {
        required: (value) => !!value || "This field is required",
        isURL: function validURL(value) {
          try {
            new URL(value);
          } catch (e) {
            return value + " is not a valid URL.";
          }
        },
      },
    };
  },
  methods: {
    success: function (data) {
      this.loading = true;
      const formData = new FormData(data.e.target);
      var link = formData.get("link");
      this.longLink = new URL(link);
      this.getShortLink();
    },
    async getShortLink() {
      // const response = await axios.get( "https://emoji-link.net/?new="+this.link)
      const response = await axios.get(
        process.env.VUE_APP_API_URL + "?new=" + this.longLink
      );
      if (response.status == 200) {
        this.shortLink = response.data.ShortURL;
        this.$emit("showLink", this.shortLink);
      }
      this.loading = false;
    },
  },
};
</script>