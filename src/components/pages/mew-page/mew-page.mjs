import fx from 'fireworks'
import Snowf from 'vue-snowf';
import bioniUrl from "Assets/icons/bionic.cur";

setTimeout(() => {
  //snowfall.start()
}, 10000);

export default Vue.component("mew-page", {
  components: {
    Snowf
  },
  data: function() {
    return {
      letterShow: false,
      wishesShow: false,
      showSnow: false
    }
  },
  created: function() {
    const vm = this;

    $(document.documentElement).css("background-color", "black");
    $(document.documentElement).css("overflow", "hidden");
    $(document.documentElement).css("cursor", `url(${bioniUrl}), default`);

    setTimeout(() => {
      vm.letterShow = true;
      console.log("mew");
    }, 6000)

    setTimeout(() => {
      vm.wishesShow = true;
    }, 10000)

    setTimeout(() => {
      setInterval(() => {
        fx.fireworks({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 5000);

      setInterval(() => {
        fx.fireworks({
          count: 30,
          x: window.innerWidth / 3,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 6000);

      setInterval(() => {
        fx.fireworks({
          count: 5,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 8000);

      setInterval(() => {
        fx.fireworks({
          count: 18,
          x: window.innerWidth / 3,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 10000);

      setInterval(() => {
        fx.fireworks({
          count: 20,
          interval: 5000,
          x: window.innerWidth,
          y: window.innerHeight / 2,
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          colors: ['#cc3333', '#4CAF50', '#81C784']
        });
      }, 3000);
    }, 11000);
  },
  mount: function() {
    const vm = this;


    setTimeout(() => {
      vm.showSnow = true
    }, 10000);
  }
});
