import Vue from "vue";
import Component from "vue-class-component";
import { restartAnimation } from "@/utils/utils";

@Component
export default class NewsBanner extends Vue {
  bannerPhrase = "Ranczos";
  BANNER_PHRASES_ = [
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
  BANNER_RESTART_TIME_ = 15 * 1000;
  startAnotherBannerInterval_: NodeJS.Timeout | undefined;

  created(){
    const vm = this;

    vm.startAnotherBannerInterval_ = setInterval(function() {
      const randomPhraseIdx = Math.floor(Math.random() * vm.BANNER_PHRASES_.length);

      vm.bannerPhrase = vm.BANNER_PHRASES_[randomPhraseIdx];
      restartAnimation(vm.$refs.bannerText as any, "news-banner__text--moving");
    }, vm.BANNER_RESTART_TIME_);
  }

  beforeDestroy() {
    clearInterval(this.startAnotherBannerInterval_ as any);
  }
}
