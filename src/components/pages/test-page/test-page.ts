import Vue from "vue";
import Component from "vue-class-component";
import WelcomeSection from "./../julik-page/local-components/welcome-section/welcome-section.vue";
// mew
@Component ({
  components: {
    WelcomeSection
  }
})
export default class TestPage extends Vue {
  public zlew = "zlewik";
  private test = "tesxdt";

  public elMainSection = document.getElementById("pumba");

  // mew
  mounted() {
    this.elMainSection = document.getElementById("pumba"); 
  }

  public bark() {
    console.log("woof");
    console.log(this.elMainSection);
  }
}
// <script src="./test-page.ts"   module lang="ts"></script>