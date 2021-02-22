import Component from "vue-class-component";
import { BasePromiseDialog } from "vue-promise-dialogs"

interface dogClass {
  name: string,
  imgUrls: string[]
}

@Component
export default class DogPictureDialog extends BasePromiseDialog<{ text: string }, string> {
  public isVisible = true;
  public dogClassIsUpdating = false;

  public wheelRotation = 0;
  public rotationCheckpointWidth = 10;
  
  public wheelRecentlyRotated = false;
  public wheelIdleTime = 0.5;

  public dogImgUrls = JULIK_AVATARS.map(avatarUrl => ASSETS_PATH + avatarUrl);

  public dogClasses: dogClass[] = [
    { name: "Julik siedzący", imgUrls: [] },
    { name: "Julik dowodowy", imgUrls: [] },
    { name: "Julik leśny",    imgUrls: [] },
    { name: "Julik zaoknowy", imgUrls: [] },
    { name: "Julik szczytowy",imgUrls: [] },
    { name: "Julik odgórny",  imgUrls: [] },
    { name: "Julik wywalony", imgUrls: [] },
    { name: "Julik gryzący",  imgUrls: [] },
  ];
  public selectedDogClass = {
    idx: 0,
    imgUrls: new Array<string>(0)
  };

  constructor() {
    super();

    JULIK_AVATARS.forEach(avatarRelativeUrl => {
      const dogClassIdx = Number(avatarRelativeUrl.split(" ")[0].slice(2));

      this.dogClasses[dogClassIdx].imgUrls.push(ASSETS_PATH + avatarRelativeUrl);
    });
  }

  public created() {
    $(document.documentElement).css("overflow", "hidden");

    this.updateSelectedDogClass(this.dogClasses[0]);
  }

  private onMouseWheel(event: JQuery.TriggeredEvent) {
    const originalEvent = event.originalEvent as WheelEvent;
    
    this.rotateWheel(Math.floor(originalEvent.deltaY / 5));

    if (this.dogClassIsUpdating) return;
    this.dogClassIsUpdating = true;

    const updateClassInterval = setInterval(() => {
      if (this.wheelRecentlyRotated) {
        this.wheelRecentlyRotated = false;
        return;
      }

      const newRotationCheckpoint = this.getNearestRotationCheckpoint();
    
      if (this.selectedDogClass.idx !== newRotationCheckpoint)
      {
        this.highlightRotationCheckpoint((this.selectedDogClass.idx = newRotationCheckpoint));
        this.updateSelectedDogClass(this.dogClasses[this.selectedDogClass.idx]);
      }

      clearInterval(updateClassInterval);
    }, this.wheelIdleTime * 1000);
  }

  private rotateWheel(deg: number) {
    this.wheelRotation += deg;
    $(".wheel").css("transform", `rotateX(${this.wheelRotation}deg)`);
    this.wheelRecentlyRotated = true;
  }

  private getNearestRotationCheckpoint() {
    const nearestRotationCheckpoint = Math.round(-this.wheelRotation / 45) % 8;
    const newRotationCheckpoint = (((nearestRotationCheckpoint < 0) ? (8 + nearestRotationCheckpoint) : nearestRotationCheckpoint)); 
    return newRotationCheckpoint;
  }

  private highlightRotationCheckpoint(checkpoint: number) {
    $(".wheel__image").removeClass("wheel__image--selected");
    $(`.wheel__face--${checkpoint}`).children().addClass("wheel__image--selected");  
  }

  private updateSelectedDogClass(newDogClass: dogClass) {
    this.dogClassIsUpdating = true;
    
    const dogsCount = this.selectedDogClass.imgUrls.length;

    newDogClass.imgUrls.forEach(dogUrl => this.selectedDogClass.imgUrls.unshift(dogUrl));
    setTimeout(() => {
      for (let i = 0; i < dogsCount; ++i) this.selectedDogClass.imgUrls.pop();
      this.dogClassIsUpdating = false;
    }, 1000);
  }

  public mounted() {
    $(".wheel").on("wheel", this.onMouseWheel);
  }

  public beforeDestroy() {
    $(document.documentElement).css("overflow", "visible"); 
    $(".wheel").off("wheel");
  }

  public onAvatarChoose(avatarUrl: string) {
    this.isVisible = false;

    setTimeout(() => {
      this.resolve(avatarUrl);
    }, 500);
  }

  public chooseRandomAvatar() {
    const randomClass = Math.floor(Math.random() * 7) + 1;
    const randomImage = Math.floor(Math.random() * this.dogClasses[randomClass].imgUrls.length);
    
    this.onAvatarChoose(this.dogClasses[randomClass].imgUrls[randomImage]);
  }

  public rotateToClass(classNumber: number) {
    if (classNumber === this.selectedDogClass.idx) return;

    const nearestCheckpoint = this.getNearestRotationCheckpoint();

    let checkpointDiff = nearestCheckpoint - classNumber;
    if (checkpointDiff <= -4) {
      checkpointDiff += 8;
    }
    else if (checkpointDiff > 4) {
      checkpointDiff -= 8;
    }

    this.wheelRotation = (Math.round(this.wheelRotation / 45) * 45) + (checkpointDiff * 45);
    
    $(".wheel").css("transition", "transform 1s"); 
    $(".wheel").css("transform", `rotateX(${this.wheelRotation}deg)`);
    setTimeout(() => {
      $(".wheel").css("transition", "none");   
    }, 1200);

    this.selectedDogClass.idx = classNumber;
    this.updateSelectedDogClass(this.dogClasses[classNumber]);
    this.highlightRotationCheckpoint(this.selectedDogClass.idx);
  }

  public onExit() {
    this.isVisible = false;

    setTimeout(() => {
      this.reject('exit');
    }, 500);
  }
}
