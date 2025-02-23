import Vue from "vue";
import Component from "vue-class-component";
import { createPromiseDialog } from "vue-promise-dialogs";

import WelcomeSection from "./local-components/welcome-section/welcome-section.vue";
import NewsBanner     from "./local-components/news-banner/news-banner.vue";
import JulikIdPhoto   from "./local-components/julik-id-photo/julik-id-photo.vue";
import FoodList       from "./local-components/food-list/food-list.vue";
import NavBar         from "./local-components/navbar/navbar.vue";

// imports just for types
import JulikIdPhotoT  from "./local-components/julik-id-photo/julik-id-photo";
import FoodListT      from "./local-components/food-list/food-list";
import NavBarT        from "./local-components/navbar/navbar";

@Component({
  components: {
   WelcomeSection,
   JulikIdPhoto,
   FoodList,
   NewsBanner,
   NavBar
  }
})
export default class JulikPage extends Vue {
  $refs!: {
    welcomeSection: Element,
    mainSectionContainer: Element,
    heroSection: Element,
    foodList: FoodListT,
    julik: JulikIdPhotoT
  }

  public horrorOn = false;

  public elMainSectionContainer: Element | null = null;
  public elwelcomeSection: Element | null = null;
  public elheroSection: Element | null = null;
  public elSections: Element[] | null = null;
  public activeSection = 0;
  
  public secondBackgroundOn = false;
  private backgroundChangeTimeSec = 30;
  private backgroundChangeInterval!: NodeJS.Timeout;

  private created() {
    const vm = this;

    this.backgroundChangeInterval = setInterval(() => {
      this.secondBackgroundOn = this.secondBackgroundOn ? false : true;
    }, this.backgroundChangeTimeSec * 1000);

    $(window).on("resize", function() {
      vm.adjustStickyTopForMainSection();
    });

    $(window).on("scroll", function(event) {
      const $mainSection = $(vm.$refs.mainSectionContainer);
      
      const targetOffset = $mainSection.offset()!.top - ($mainSection.height()! / 2);

      // show main section once when scrolled down
      if ($(this).scrollTop()! > targetOffset) {
        $mainSection.addClass("body-animation");
        $mainSection.css("opacity", "1");
        // $(window).off("scroll");
        // console.log("taking scroll event off");
        $(this).off(event);
      }
    });

    $(window).on("scroll", () => {
      const windowTopOffset = $(window).scrollTop()!; 

      const welcomeOffsetTarget = $(this.elSections![0]).height()! / 2;
      // const julikOffsetTarget   = $(this.elSections![0]).height()! * 1.5;
      const julikOffsetTarget   = (welcomeOffsetTarget * 2) + ($(this.elSections![1]).height()! / 2);
      const heroOffsetTarget    = $(this.elSections![2]).offset()!.top + ($(this.elSections![2]).height()! / 2);
      
      // console.log("active section: ", this.activeSection);
      // console.log("windowTopOffset: ", windowTopOffset);
      // console.log("welcomeOffset:", welcomeOffsetTarget);
      // console.log("julik offset: ", julikOffsetTarget);
      // console.log("hero offset: ", heroOffsetTarget);      

      if (windowTopOffset <= welcomeOffsetTarget) {
        this.activeSection = 0;
      }
      else if ($(window).scrollTop()! + $(window).height()!  <= heroOffsetTarget) {
        this.activeSection = 1;
      }
      else {
        this.activeSection = 2;
      }
    });
  }

  private mounted() {
    this.elwelcomeSection = this.$refs.welcomeSection;
    this.elMainSectionContainer = this.$refs.mainSectionContainer;
    this.elheroSection = this.$refs.heroSection;
    this.elSections = [this.elwelcomeSection, this.elMainSectionContainer, this.elheroSection];
    this.adjustStickyTopForMainSection();
  }

  public setHorrorMode() {
    this.horrorOn = true;

    clearInterval(this.backgroundChangeInterval);
    this.secondBackgroundOn = false;

    $(window).scrollTop(0);
    $(document.documentElement).addClass(["horror-html"]);

    this.$refs.foodList.foodList[1].name = "Ludzie";

    $(".julik-id-photo__photo").draggable();
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
    const $mainSection = $(this.$refs.mainSectionContainer);
    const newTop = -($mainSection.height()! + 70 - $(window).height()!);
    $mainSection.css("top", newTop > 0 ? 0 : newTop);
  }
}
