import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class WelcomeSection extends Vue {
  @Prop()
  public scrollArrowTarget: HTMLElement | null = null;

  scrollToTarget() {
    if (this.scrollArrowTarget) {
      this.scrollArrowTarget.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }
}
