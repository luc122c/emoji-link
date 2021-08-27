<template>
  <w-app>
    <h1 class="headline mb5">Emoji Linker 🌐</h1>
    <search-box
      v-if="!shortLink"
      class="xs11 lg6 mxa my5"
      @showLink="setLink($event)"
    ></search-box>
    <link-presentation
      v-if="shortLink"
      class="xs11 lg6 mxa my5"
      :shortLink="shortLink"
    ></link-presentation>
    <w-card title="FAQ" title-class="blue-light5--bg title4" class="xs11 lg6 mxa my5">
      <w-accordion :items="items" class="text-left fill-width"> </w-accordion>
    </w-card>
  </w-app>
</template>

<script>
import LinkPresentation from "./components/LinkPresentation.vue";
import SearchBox from "./components/SearchBox.vue";
import { bugs, repository, author } from "../package";

export default {
  name: "App",
  components: { SearchBox, LinkPresentation },
  data() {
    return {
      shortLink: null,
      items: [
        {
          title: "What is this?",
          content:
            "It's a URL shortener, except it uses emoji instead of alphanumeric characters. Put a longy longy URL in and get a (hopefully) shorter URL, made mostly with emoji!",
        },
        {
          title: "Why does this exist?",
          content:
            "This project is my submission to the <a target='_blank' href='https://challenge.developers.cloudflare.com/'>Cloudflare Developer Summer Challenge</a>. I wanted to build something that was useful (or at least something that I could use myself) and also hopefully win some swag!",
        },
        {
          title: "Are there alternatives?",
          content:
            "Yes! <a target='_blank' href='https://xn--kn8h.to/'>https://🏹.to</a> and <a target='_blank' href='https://xn--vi8hl0c.ws/'>😻🍕.ws</a> and <a target='_blank' href='http://xn--ki8h.ws/'>🍊.ws</a> all seem pretty cool. Sorry, I couldn't afford a cool emoji domain name like these.",
        },
        {
          title: "Who made this?",
          content:
            "This service is made by <a target='_blank' href='" +
            author.url +
            "'>" +
            author.name +
            "</a>. Feel free to get in touch through my website.",
        },
 {
          title: "Which emoji does it use?",
          content:
            "I'm using a package called <a target='_blank' href='https://github.com/pketh/random-unicode-emoji'>random-unicode-emoji</a> to get a random string of emoji. It hasn't been updated since 2016 (at the time of writing) but it has no dependencies, so I preferred it over alternatives with some of the latest emoji. Perhaps in the future I'll update the API to use more emoji."
            },
        {
          title: "How is it built?",
          content:
            "The backend API which generates the links is built with JavaScript and WebPack and runs on <a target='_blank' href='https://developers.cloudflare.com/workers/' >Cloudflare Workers</a>. The links are stored in <a target='_blank' href='https://developers.cloudflare.com/workers/runtime-apis/kv'>Workers KV</a>. <a target='_blank' href='https://github.com/cloudflare/wrangler'>Wrangler</a> is used to dev, build and publish the API. The frontend it a <a target='_blank' href='https://v3.vuejs.org/'>VueJS 3</a> application with <a target='_blank' href='https://antoniandre.github.io/wave-ui/'>Wave UI</a> deployed to <a target='_blank' href='https://developers.cloudflare.com/pages/'>Cloudflare Pages</a>. All of this sits atop <a target='_blank' href='https://developers.cloudflare.com/fundamentals/get-started/cdn'>Cloudflare's CDN</a> and I'm also using the <a target='blank' href='https://developers.cloudflare.com/analytics/web-analytics'>Web Analytics</a> to see how popular (or not) the service is.",
        },   {
          title: "Is it the best URL shortner there is?",
          content:
            "Some might say that, but I won't. There is a lot of room for imporvement, however this has been a great learning opportunity for me play with some new stuff like <a target='_blank' href='https://github.com/luc122c/emoji-link/blob/f3e71765a9b81f5bffd38edab112b41ef6598170/worker/index.js#L8'>iterators and generators</a>. Please be nice 😊",
        },
        {
          title: "Where can I find the code?",
          content:
            "All the code for the frontend application and the backend worker is in a <a target='_blank' href='" +
            repository.url +
            "'>public repository on GitHub</a>.",
        },
        {
          title: "What should I do if I break it?",
          content:
            "Please report any issues on the <a target='_blank' href='" +
            bugs.url +
            "'>GitHub repository</a>.",
        },
      ],
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
