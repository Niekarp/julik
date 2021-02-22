import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import NORMAL_JULIK_IMG_URL from "./assets/julik.jpg";
import NORMAL_BARK_URL from "./assets/bark.wav";
import HORROR_BARK_URL from "./assets/bark-horror.mp3";
import HORROR_JULIK_URL from "./assets/julik-horror.png";

import { restartAnimation } from "@/utils/utils";
import DogPictureDialog from "@Pages/julik-page/local-components/dog-picture-dialog/dog-picture-dialog.vue";
import { createPromiseDialog } from "vue-promise-dialogs";

@Component ({
  components: {
    DogPictureDialog
  }
})
export default class JulikIdPhoto extends Vue {
  @Prop()
  public horrorTheme = false;
  private ishorrorOn = false;

  public julikImgUrl = NORMAL_JULIK_IMG_URL;
  
  public woofCount = 0;
  public woofCountTarget = 15;
  
  private BARK_SOUND_URLS = {
    NORMAL: NORMAL_BARK_URL,
    HORROR: HORROR_BARK_URL,
  };
  
  private MOVEMENT_SPEED = 55;
  private julikPosition = {
    x: 0,
    y: 0,
  }

  private dialogOpen = false;

  private audioContext = new AudioContext();
  private woofAudioBuffer:       AudioBuffer | null = null;
  private woofHorrorAudioBuffer: AudioBuffer | null = null;

  private created() {
    this.getAudioFile(this.audioContext, this.BARK_SOUND_URLS.NORMAL).then(buffer => {
      this.woofAudioBuffer = buffer;
    });
    this.getAudioFile(this.audioContext, this.BARK_SOUND_URLS.HORROR).then(buffer => {
      this.woofHorrorAudioBuffer = buffer;
    });
  }

  public woof() {
    if (this.horrorTheme === false) {
      if (this.woofAudioBuffer) {
        const node  = this.audioContext.createBufferSource();
        node.buffer = this.woofAudioBuffer;
        node.connect(this.audioContext.destination);
        node.start();
      }
    } else {
      if (this.woofHorrorAudioBuffer) {
        const node  = this.audioContext.createBufferSource();
        node.buffer = this.woofHorrorAudioBuffer;
        node.connect(this.audioContext.destination);
        node.start();
      }
    }
  }

  public woofAndShake(event: { target: any; }) {
    this.woof();
    if (!this.horrorTheme) {
      restartAnimation($(event.target), this.ishorrorOn ? "" : "julik-id-photo__photo--shaking");
    }
  }

  public notifyParent() {
    this.$emit("wola-retro-clicked");
  }

  public openDialog() {
    if (this.dialogOpen) return;
    // console.log("opening dialog...");
    
    this.dialogOpen = true;
    const openDialog = createPromiseDialog<{ text: string }, string>(DogPictureDialog);
    openDialog({ text: 'Some text' }).then(avatarUrl => {
      if (avatarUrl !== "exit") {
        this.julikImgUrl = avatarUrl;
      }
    }).catch(() => {}).finally(() => { this.dialogOpen = false; });
  }

  private countWoofs() {
    this.woofCount++;
    if (this.woofCount === this.woofCountTarget) {
      this.$emit("woof-target-reach");
    }
  }

  @Watch("horrorTheme")
  private onHorrorThemeChange(newValue: any, oldValue: any) {
    if (newValue) {
      this.setHorrorTheme();
    }
  }
  
  private allowJulikToMove_() {
    const vm = this;

    $(document).on("keydown", function(event) {
      if (event.key === "w") {
        vm.julikPosition.y -= vm.MOVEMENT_SPEED;
      } else if (event.key === "s") {
        vm.julikPosition.y += vm.MOVEMENT_SPEED;
      } else if (event.key === "a") {
        vm.julikPosition.x -= vm.MOVEMENT_SPEED;
      } else if (event.key === "d") {
        vm.julikPosition.x += vm.MOVEMENT_SPEED;
      }

      const $julikImg = $(vm.$refs.julikImg);
      $julikImg.css("transform", `translate(${vm.julikPosition.x}px, ${vm.julikPosition.y}px) rotate(-27deg)`);
      ($julikImg.get(0) as HTMLElement).scrollIntoView({behavior: "smooth", block: "center"});
    });
  }

  private setHorrorTheme() {
    this.julikImgUrl = HORROR_JULIK_URL;

    this.allowJulikToMove_();
    $(".julik-id-photo__photo").removeClass(":hover");

    this.woof();
  }

  private async getAudioFile(audioContext: AudioContext, filepath: string) {
    const response    = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }
}
