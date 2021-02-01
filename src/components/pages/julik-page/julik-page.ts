import Vue from "vue";
import Component from "vue-class-component";

import WelcomeSection from "./local-components/welcome-section/welcome-section.vue";
import NewsBanner from "./local-components/news-banner/news-banner.vue";
import JulikIdPhoto from "./local-components/julik-id-photo/julik-id-photo.vue";
import FoodList from "./local-components/food-list/food-list.vue";

// julik-page"

@Component({
  components: {
   WelcomeSection,
   JulikIdPhoto,
   FoodList,
   NewsBanner
  }
})
export default class JulikPage extends Vue {
  horrorOn = false;
  
  elMainSection = null;
  
  julikIntroductionTitle = "Ogółem";
  julikIntroduction = "został przywieziony z Hiszpanii i czasem chodzi do fryzjera";
  julikBehaviour = "Julik szczeka na swoje odbicie w lustrze i biega wtedy po domu szukając zaczepki";

  secondBackgroundOn = false;
  backgroundChangeTimeSec_ = 30;
  backgroundChangeInterval_: number = 0;

  TEXTS_ = {
    HORROR_INTRODUCTION: "Julik został przywieziony z Piekła i czasem chodzi do egzorcysty",
    HORROR_BEHAVIOUR: "Julik szczeka na wszystko, biega po świecie szukając zaczepki i siejąc terror",
    HORROR_H2: "Abstrakt"
  };

  setHorrorMode() {
    this.horrorOn = true;

    $(window).scrollTop(0);

    clearInterval(this.backgroundChangeInterval_);
    this.julikIntroduction = this.TEXTS_.HORROR_INTRODUCTION;
    this.julikIntroductionTitle = this.TEXTS_.HORROR_H2;
    this.julikBehaviour = this.TEXTS_.HORROR_BEHAVIOUR;

    (this.$refs.foodList as any).foodList[1].name = "Ludzie";
    
    $(document.documentElement).addClass(["horror-html"]);
  }

  onWolaRetroClick() {
    this.$emit("wola-retro");
  }

  onMew() {
    (this.$refs.julik as any).woof_(); 
    this.$emit("mew");
  }

  resetFoodListAndTurnHorroOff() {
    // TODO: add animated tossing of foodList items
    (this.$refs.foodList as any).reseetFoodList();
    // TODO: change location.relad to setting horror off
    location.reload();
    // this.horrorOn = false;
  }

  adjustStickyTopForMainSection_() {
    const $mainSection = $(this.$refs.mainSection);
    $mainSection.css("top", -(($mainSection.height() as any) + 70 - ($(window).height() as any)));
  }

  created() {
    const vm = this;

    $(window).on("resize", function() {
      vm.adjustStickyTopForMainSection_();
    });

    $(window).on("scroll", function() {
      const $mainSection = $(vm.$refs.mainSection);
      const targetOffset = ($mainSection.offset() as any).top - (($mainSection.height() as any) / 2);

      if (($(this).scrollTop() as any) > targetOffset) {
        $mainSection.addClass("body-animation");
        $mainSection.css("opacity", "1");
        $(window).off("scroll");
      }
    });
  }

  mounted() {
    const vm = this;

    (vm.elMainSection as any) = vm.$refs.mainSection;
    (vm.backgroundChangeInterval_ as any) = setInterval(() => {
      vm.secondBackgroundOn = vm.secondBackgroundOn ? false : true;
    }, vm.backgroundChangeTimeSec_ * 1000);

    vm.adjustStickyTopForMainSection_();
  }
};
