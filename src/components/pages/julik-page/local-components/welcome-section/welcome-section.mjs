export default Vue.component("welcome-section", {
  props: {
    scrollArrowTarget: HTMLElement
  },
  methods: {
    scrollToTarget: function() {
      this.scrollArrowTarget.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }
});
