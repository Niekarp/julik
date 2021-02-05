import Vue from "vue";
import Component from "vue-class-component";

import WelcomeSection from "./local-components/welcome-section/welcome-section.vue";
import NewsBanner     from "./local-components/news-banner/news-banner.vue";
import JulikIdPhoto   from "./local-components/julik-id-photo/julik-id-photo.vue";
import FoodList       from "./local-components/food-list/food-list.vue";

// imports just for types
import JulikIdPhotoT  from "./local-components/julik-id-photo/julik-id-photo";
import FoodListT      from "./local-components/food-list/food-list";

@Component({
  components: {
   WelcomeSection,
   JulikIdPhoto,
   FoodList,
   NewsBanner
  }
})
export default class JulikPage extends Vue {
  $refs!: {
    mainSection: Element,
    foodList: FoodListT,
    julik: JulikIdPhotoT
  }

  public horrorOn = false;

  public elMainSection: Element | null = null;
  
  public secondBackgroundOn = false;
  private backgroundChangeTimeSec = 30;
  private backgroundChangeInterval: NodeJS.Timeout;

  constructor() {
    super();

    const vm = this;
    this.backgroundChangeInterval = setInterval(() => {
      vm.secondBackgroundOn = vm.secondBackgroundOn ? false : true;
    }, vm.backgroundChangeTimeSec * 1000);
  }

  private created() {
    const vm = this;

    $(window).on("resize", function() {
      vm.adjustStickyTopForMainSection();
    });

    $(window).on("scroll", function() {
      const $mainSection = $(vm.$refs.mainSection);
      const targetOffset = $mainSection.offset()!.top - ($mainSection.height()! / 2);

      // show main section once when scrolled down
      if ($(this).scrollTop()! > targetOffset) {
        $mainSection.addClass("body-animation");
        $mainSection.css("opacity", "1");
        $(window).off("scroll");
      }
    });
  }

  private mounted() {
    this.elMainSection = this.$refs.mainSection;
    this.adjustStickyTopForMainSection();
  }

  public setHorrorMode() {
    this.horrorOn = true;

    clearInterval(this.backgroundChangeInterval);

    $(window).scrollTop(0);
    $(document.documentElement).addClass(["horror-html"]);

    this.$refs.foodList.foodList[1].name = "Ludzie";
  }

  public onWolaRetroClick() {
    this.$emit("wola-retro");
  }

  public onMew() {
    this.$refs.julik.woof(); 
    this.$emit("mew");
  }

  public resetFoodListAndTurnHorroOff() {
    // TODO: add animated tossing of foodList items
    this.$refs.foodList.reseetFoodList();
    // TODO: change location.relad to setting horror off
    location.reload();
    // this.horrorOn = false;
  }

  private adjustStickyTopForMainSection() {
    const $mainSection = $(this.$refs.mainSection);
    $mainSection.css("top", -($mainSection.height()! + 70 - $(window).height()!));
  }
}
