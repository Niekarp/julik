import { restartAnimation } from "Utils/utils.mjs";

export default Vue.component("news-banner", {
  data: function () {
    return {
      bannerPhrase: "Ranczos"
    };
  },
  created: function() {
    this.$_BANNER_PHRASES = [
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
    ];
    this.$_BANNER_RESTART_TIME = 15 * 1000;

    this.$_startAnotherBannerInterval = setInterval(() => {
      const randomPhraseIdx = Math.floor(Math.random() * this.$_BANNER_PHRASES.length);

      this.bannerPhrase = this.$_BANNER_PHRASES[randomPhraseIdx]; 
      restartAnimation(this.$refs.bannerText, "news-banner__text--moving");
    }, this.$_BANNER_RESTART_TIME);
  },
  beforeDestroy: function() {
    clearInterval(this.$_startAnotherBannerInterval);
  }
});
