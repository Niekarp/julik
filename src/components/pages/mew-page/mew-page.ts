import Vue from "vue";
import fx from 'fireworks'
import bioniUrl from "@Assets/icons/bionic.cur";
import fireworksUrl from "./assets/fireworks.wav";
import colabUrl from "./assets/colab.m4a";
import Snowf from 'vue-snowf';
import { restartAnimation } from "@/utils/utils";
import moonUrl from "./assets/moon.png";
import moslerUrl from "./assets/mosler.png";
import Component from 'vue-class-component';

@Component({
  components: {
    Snowf
  }
})
export default class MewPage extends Vue {
  letterShow = false;
  wishesShow = false;
  showSnow = false;
  mewage = 0;
  mewPresent = ""
  moslerAttack = false;
  moslerUrl_ = moslerUrl;
  moonUrl_ = moonUrl;

  onPresentClick() {
    if (this.mewage === 23 && this.mewPresent === "🎁") {
      this.mewPresent = "🍕";
    }
  }

  created() {
    const vm = this;

    $(document.documentElement).css("background-color", "black");
    $(document.documentElement).css("overflow", "hidden");
    $(document.documentElement).css("cursor", `url(${bioniUrl}), default`);

    setTimeout(() => {
      vm.letterShow = true;
      // console.log("mew");
    }, 6000)

    setTimeout(() => {
      vm.wishesShow = true;
    }, 10000)

    const mewageInterval = setInterval(() => {
      vm.mewage+= 1;
      if (vm.mewage == 23) {
        clearInterval(mewageInterval);
        setTimeout(() => {
          vm.mewPresent = "🎁"
        }, 1000);
      }
    }, 200);

    setTimeout(() => {
      (new Audio(fireworksUrl)).play();
      setTimeout(() => {
        (new Audio(colabUrl)).play();
      }, 3000);

      setInterval(() => {
        fx({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 5000);

      setInterval(() => {
        fx({
          count: 30,
          x: window.innerWidth / 3,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 6000);

      setInterval(() => {
        (fx as any)({
          count: 5,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 8000);

      setInterval(() => {
        fx({
          count: 18,
          x: window.innerWidth / 3,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 10000);

      setInterval(() => {
        fx({
          count: 20,
          x: window.innerWidth,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 3000);
    }, 11000);    
    
    setInterval(function() {
      restartAnimation(vm.$refs.cloud as any, "cloud--moving");
    }, 15000);

    setTimeout(() => {
      vm.moslerAttack = true;
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    }, 60000);

  }
  
  mount() {
    const vm = this;


    setTimeout(() => {
      vm.showSnow = true
    }, 10000);
  }
}
