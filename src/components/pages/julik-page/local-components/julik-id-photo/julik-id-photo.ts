import NORMAL_JULIK_IMG_URL from "./assets/julik.jpg";
import NORMAL_BARK_URL from "./assets/bark.wav";
import HORROR_BARK_URL from "./assets/bark-horror.mp3";
import HORROR_JULIK_URL from "./assets/julik-horror.png";
import { restartAnimation } from "./../../../../../utils/utils";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class JulikIdPhoto extends Vue {
  @Prop() horrorTheme = false;

  julikImgUrl = NORMAL_JULIK_IMG_URL;
  barkUrl_ = "";
  ishorrorOn_ = false;
  woofCount = 0;
  woofCountTarget = 15;
  BARK_SOUND_URLS_ = {
    NORMAL: NORMAL_BARK_URL,
    HORROR: HORROR_BARK_URL,
  };
  MOVEMENT_SPEED_ = 55;
  julikPosition_ = {
    x: 0,
    y: 0,
  }

  @Watch("horrorTheme")
  onHorrorThemeChange(newValue: any, oldValue: any) {
    if (newValue) {
      this.setHorrorTheme_();
    }
  }

  created() {
    const vm = this;
    vm.barkUrl_ = vm.BARK_SOUND_URLS_.NORMAL;
  }

  woofAndShake(event: { target: any; }) {
    this.woof_();
    if (!this.horrorTheme) {
      restartAnimation($(event.target), this.ishorrorOn_ ? "" : "julik-id-photo__photo--shaking");
    }
  }

  countWoofs() {
    this.woofCount++;
    if (this.woofCount === this.woofCountTarget) {
      this.$emit("woof-target-reach");
    }
  }

  notifyParent() {
    this.$emit("wola-retro-clicked");
  }

  woof_() {
    (new Audio(this.barkUrl_)).play();
  }
  
  allowJulikToMove_() {
    const vm = this;

    // TODO: clear callback on component deletion
    $(document).on("keydown", function(event) {
      if (event.key === "w") {
        vm.julikPosition_.y -= vm.MOVEMENT_SPEED_;
      } else if (event.key === "s") {
        vm.julikPosition_.y += vm.MOVEMENT_SPEED_;
      } else if (event.key === "a") {
        vm.julikPosition_.x -= vm.MOVEMENT_SPEED_;
      } else if (event.key === "d") {
        vm.julikPosition_.x += vm.MOVEMENT_SPEED_;
      }

      const $julikImg = $(vm.$refs.julikImg);
      $julikImg.css("transform", `translate(${vm.julikPosition_.x}px, ${vm.julikPosition_.y}px) rotate(-27deg)`);
      ($julikImg.get(0) as HTMLElement).scrollIntoView({behavior: "smooth", block: "center"});
    });
  }

  setHorrorTheme_() {
    this.julikImgUrl = HORROR_JULIK_URL;

    this.allowJulikToMove_();

    this.barkUrl_ = this.BARK_SOUND_URLS_.HORROR;
    this.woof_();
  }
}
