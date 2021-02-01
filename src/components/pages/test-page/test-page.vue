<template>
  <div>
    <div class="mew full-screen" v-on:click="bark">{{zlew}}</div>
    <welcome-section class="full-screen" v-bind:scroll-arrow-target="elMainSection"></welcome-section>
    <div id="pumba">pumba</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WelcomeSection from "./../julik-page/local-components/welcome-section/welcome-section.vue";

@Component ({
  components: {
    WelcomeSection
  }
})
export default class TestPage extends Vue {
  public zlew = "zlewik";
  private test = "test";

  public elMainSection = document.getElementById("pumba");

  mounted() {
    this.elMainSection = document.getElementById("pumba"); 
  }

  public bark() {
    console.log("woof");
    console.log(this.elMainSection);
  }
}
</script>

<style  src="./test-page.scss" scoped lang="scss"></style>
