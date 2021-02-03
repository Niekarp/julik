<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="currentPageName" v-on:wola-retro="navigateToWolaRetro" v-on:mew="mewMew"></component>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import JulikPage     from "@Pages/julik-page/julik-page.vue";
import WolaRetroPage from "@Pages/wola-retro-page/wola-retro-page.vue";
import MewPage       from "@Pages/mew-page/mew-page.vue";
// import TestPage from "@Pages/test-page/test-page.vue";

@Component({
  components: {
    JulikPage,
    WolaRetroPage,
    MewPage,
    // TestPage,
  },
})
export default class App extends Vue {
  public currentPageName: string;

  constructor() {
    super();
    this.currentPageName = 1 ? "julik-page" : (1 ? "wola-retro-page" : "mew-page");
  }

  public navigateToWolaRetro() {
    this.currentPageName = "wola-retro-page";
    
    this.removeClassesAndEvents();
    $(document.documentElement).addClass("wola-retro-page");
  }

  public mewMew() {
    this.currentPageName = "mew-page"; 

    this.removeClassesAndEvents();
  }

  private removeClassesAndEvents() {
    $(document.documentElement).removeClass();
    $(document.body).removeClass();
    $(document).off();
  }
}
</script>

<style></style>
