import { restartAnimation } from "Utils/utils.mjs";

export default Vue.component("news-banner", {
  data: function () {
    return {
      bannerPhrase: "Ranczos",
      BANNER_PHRASES_: [
        "ranczos",
        "podziel sie Julikiem!",
        "Julik to nadzieja",
        "niedaleko pada Julik od jabłoni",
        "1, 2, 3 Julik",
        "Julik pochodzi z Hiszpanii",
        "nie igraj z Julikiem",
        "Julik uratował tonący statek",
        "Julik to wolnosc, Julik to nadzieja",
        "Julik to jest to",
        "Julik szaleje na strychu",
        "🐶",
        "Julik interesuje sie gastronomią",
        "Julik posiada prosiaka",
        "Julik zauwaza snieg",
        "Julik reaguje na smycz",
        "Julik rozumie hiszpański"
      ],
      BANNER_RESTART_TIME_: 15 * 1000,
      startAnotherBannerInterval_: Number
    };
  },
  created: function() {
    const vm = this;

    vm.startAnotherBannerInterval_ = setInterval(function() {
      const randomPhraseIdx = Math.floor(Math.random() * vm.BANNER_PHRASES_.length);

      vm.bannerPhrase = vm.BANNER_PHRASES_[randomPhraseIdx];
      restartAnimation(vm.$refs.bannerText, "news-banner__text--moving");
    }, vm.BANNER_RESTART_TIME_);
  },
  beforeDestroy: function() {
    clearInterval(this.startAnotherBannerInterval_);
  }
});
