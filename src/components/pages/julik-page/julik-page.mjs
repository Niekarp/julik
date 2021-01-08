import "LocalComponents/welcome-section/welcome-section.vue";
import "LocalComponents/news-banner/news-banner.vue";
import "LocalComponents/julik-id-photo/julik-id-photo.vue";
import "LocalComponents/food-list/food-list.vue";

export default Vue.component("julik-page", {
  data: function() {
    return {
      horrorOn: false,
      
      elMainSection: null,
      
      julikIntroductionTitle: "Ogółem",
      julikIntroduction: "został przywieziony z Hiszpanii i czasem chodzi do fryzjera",
      julikBehaviour: "Julik szczeka na swoje odbicie w lustrze i biega wtedy po domu szukając zaczepki",

      secondBackgroundOn: false,
      backgroundChangeTimeSec_: 30,
      backgroundChangeInterval_: Number,

      TEXTS_: {
        HORROR_INTRODUCTION: "Julik został przywieziony z Piekła i czasem chodzi do egzorcysty",
        HORROR_BEHAVIOUR: "Julik szczeka na wszystko, biega po świecie szukając zaczepki i siejąc terror",
        HORROR_H2: "Abstrakt"
      },
    };
  },
  methods: {
    setHorrorMode: function() {
      this.horrorOn = true;

      $(window).scrollTop(0);

      clearInterval(this.backgroundChangeInterval_);
      this.julikIntroduction = this.TEXTS_.HORROR_INTRODUCTION;
      this.julikIntroductionTitle = this.TEXTS_.HORROR_H2;
      this.julikBehaviour = this.TEXTS_.HORROR_BEHAVIOUR;

      this.$refs.foodList.foodList[1].name = "Ludzie";
      
      $(document.documentElement).addClass(["horror-html"]);
    },

    onWolaRetroClick: function() {
      this.$emit("wola-retro");
    },

    resetFoodListAndTurnHorroOff: function() {
      // TODO: add animated tossing of foodList items
      this.$refs.foodList.reseetFoodList();
      // TODO: change location.relad to setting horror off
      location.reload();
      // this.horrorOn = false;
    },

    adjustStickyTopForMainSection_: function() {
      const $mainSection = $(this.$refs.mainSection);
      $mainSection.css("top", -($mainSection.height() + 70 - $(window).height()));
    }
  },
  created: function() {
    const vm = this;

    $(window).on("resize", function() {
      vm.adjustStickyTopForMainSection_();
    });

    $(window).on("scroll", function() {
      const $mainSection = $(vm.$refs.mainSection);
      const targetOffset = $mainSection.offset().top - ($mainSection.height() / 2);

      if ($(this).scrollTop() > targetOffset) {
        $mainSection.addClass("body-animation");
        $mainSection.css("opacity", "1");
        $(window).off("scroll");
      }
    });
  },
  mounted: function() {
    const vm = this;

    vm.elMainSection = vm.$refs.mainSection;
    vm.backgroundChangeInterval_ = setInterval(() => {
      vm.secondBackgroundOn = vm.secondBackgroundOn ? false : true;
    }, vm.backgroundChangeTimeSec_ * 1000);

    vm.adjustStickyTopForMainSection_();
  }
});
