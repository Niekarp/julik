import Vue from "vue";
import Component from "vue-class-component";
import { BasePromiseDialog } from "vue-promise-dialogs"

@Component
export default class DogPictureDialog extends BasePromiseDialog<{ text: string }, string> {
  public julikAvatarsUrls = JULIK_AVATARS.map(avatarUrl => ASSETS_PATH + avatarUrl);
  public julikAvatarsClasses = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };
  public julikAvatarsClassNames = {
    1: "Julik siedzący",
    2: "Julik dowodowy",
    3: "Julik leśny",
    4: "Julik zaoknowy",
    5: "Julik szczytowy",
    6: "Julik odgórny",
    7: "Julik wywalony",
    8: "Julik gryzący"
  }
  public julikAvatarsClasseSelected = 1;
  public visible = true;

  public viewMode = true;

  public rotationX = -18000;
  public translationY = 270;
  public rotationCheckpoints = [
    { level: 1, from: 350,  to: 10 },
    { level: 2, from: 35,   to: 55 }, 
    { level: 3, from: 80,   to: 90 },
    { level: 4, from: 125,  to: 145 },
    { level: 5, from: 170,  to: 190 },
    { level: 6, from: 215,  to: 235 },
    { level: 7, from: 260,  to: 280 },
    { level: 8, from: 310,  to: 330 },
  ];

  public created() {
    $(document.documentElement).css("overflow", "hidden");

    // console.log(this.julikAvatarsClasses);

    JULIK_AVATARS.map(avatarUrl => {
      const julikClass = avatarUrl.split(" ")[0].slice(2);
      // console.log(julikClass);
      (this.julikAvatarsClasses as any)[julikClass].push(ASSETS_PATH + avatarUrl);
    });

    // console.log(this.julikAvatarsClasses);
  }

  public mounted() {
    $(window).on("DOMMouseScroll", (event: any) => {
      // console.log("scroll eent");

      // const picHeight = 270;
      // const containerHeight = 580;

      const scrollSpeed = 3;
      const isScrollUp = (event.originalEvent.wheelDelta > 0) || (event.originalEvent.detail < 0);
      this.rotationX += isScrollUp ? -scrollSpeed : scrollSpeed;

      // const scope = 10;
      // const classNumber = ((Math.floor(Math.abs(this.rotationX / 45)) % 8) ) + 1;
      // this.julikAvatarsClasseSelected = ((this.rotationX % 360) - (classNumber * 45 - scope) < scope) ? classNumber : this.julikAvatarsClasseSelected;
      const rotationAbs = Math.abs(this.rotationX % 360);
        // console.log("rotation: ", rotationAbs);
      const level = this.rotationCheckpoints.find((level) => {
        // console.log(level);
        

        if (level.level === 1) {
          return rotationAbs >= level.from || rotationAbs <= level.to;
        }
        
        return rotationAbs >= level.from && rotationAbs <= level.to;
      });

      this.julikAvatarsClasseSelected = level ? level.level : this.julikAvatarsClasseSelected;

      // console.log("class selected:", this.julikAvatarsClasseSelected);

      $(".wheel__image").removeClass("wheel__image--selected");
      $(`.wheel__face--${this.julikAvatarsClasseSelected}`).children().addClass("wheel__image--selected");
      
      $(".wheel").css("transform", `rotateX(${this.rotationX}deg)`);
      // $(".dog-picture-dialog__image").css("color", "red");
      // console.log("rotation", this.rotationX);
      // console.log("selected class", this.julikAvatarsClasseSelected);
      
    })
  }

  public beforeDestroy() {
    $(document.documentElement).css("overflow", "visible"); 
    $(window).off("DOMMouseScroll mousewheel");
  }

  public onAvatarChoose(avatarUrl: string) {
    this.visible = false;

    setTimeout(() => {
      this.resolve(avatarUrl);
    }, 500);
  }

  public chooseRandomAvatar() {
    const randomClass = Math.floor(Math.random() * 7) + 1;
    const randomImage = Math.floor(Math.random() * (this.julikAvatarsClasses as any)[randomClass].length);
    
    this.onAvatarChoose((this.julikAvatarsClasses as any)[randomClass][randomImage]);
  }

  public rotateToClass(classNumber: number) {
    const classDeg = classNumber * 45;
    const rotationAbs = Math.abs(this.rotationX % 360);
    const degDiff = rotationAbs - classDeg;

    this.julikAvatarsClasseSelected = classNumber + 1;
    this.rotationX += degDiff;

    $(".wheel__image").removeClass("wheel__image--selected");
    $(`.wheel__face--${this.julikAvatarsClasseSelected}`).children().addClass("wheel__image--selected");
    
    $(".wheel").css("transition", "transform 1s"); 
    $(".wheel").css("transform", `rotateX(${this.rotationX}deg)`);
    setTimeout(() => {
      $(".wheel").css("transition", "none");   
    }, 1200);
  }

  public onExit() {
    this.visible = false;

    setTimeout(() => {
      this.reject('exit');
    }, 500);
  }
}
