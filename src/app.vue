<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="currentPageName" v-on:wola-retro="navigateToWolaRetro" v-on:mew="mewMew"></component>
    </transition>
  </div>
</template>

<script>
import "Pages/julik-page/julik-page.vue";
import "Pages/wola-retro-page/wola-retro-page.vue";
import "Pages/mew-page/mew-page.vue";

export default {
  data: function() {
    return {
      currentPageName: 1 ? "julik-page" : (0 ? "wola-retro-page" : "mew-page")
    }
  },
  methods: {
    navigateToWolaRetro: function() {
      this.currentPageName = "wola-retro-page";

      $(document.documentElement).removeClass();
      $(document.body).removeClass();

      // $(document.documentElement).addClass("wola-retro-page");
    },

    mewMew: function() {
     this.currentPageName = "mew-page"; 

      $(document.documentElement).removeClass();
      $(document.body).removeClass();
    }
  }
};
</script>

<style></style>
