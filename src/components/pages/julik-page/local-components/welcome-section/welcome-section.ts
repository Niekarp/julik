import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class WelcomeSection extends Vue {
  @Prop() scrollArrowTarget: HTMLElement | null | undefined;


  constructor() {
    super();
  }

  scrollToTarget() {
    if (this.scrollArrowTarget)
      this.scrollArrowTarget.scrollIntoView({behavior: "smooth", block: "start"});
  }
}

// export default Vue.component("welcome-section", {
//   props: {
//     scrollArrowTarget: HTMLElement
//   },
//   methods: {
//     scrollToTarget: function() {
//       this.scrollArrowTarget.scrollIntoView({behavior: "smooth", block: "start"});
//     }
//   }
// });
