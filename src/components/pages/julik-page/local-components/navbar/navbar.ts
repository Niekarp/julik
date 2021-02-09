import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  @Prop()
  public navTargets: HTMLElement[] | null = null;

  @Prop()
  public activeTab = 0;

  public scrollToTarget(idx: number) {
    if (this.navTargets && this.navTargets[idx]) {
      // console.log("current offset: ", $(window).scrollTop()!);
      // console.log("target offset:  ", $(this.navTargets[idx]).offset()!.top);
      
      if (idx == 1) {
        window.scrollTo({ left: 0, top: this.navTargets[0].scrollHeight + 1, behavior: "smooth"});
      }
      else {
        this.navTargets[idx].scrollIntoView({behavior: "smooth", block: "start"});
      }
    }
  }
}
