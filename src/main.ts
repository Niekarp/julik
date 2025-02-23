// TODO: try to make multiple bundles with one entry points per page
// TODO: try to make bundle with shared code with webpack.optimize.CommonsChunkPlugin
// TODO: make main section scale better when zooming out
// TODO: add juik kosmiczny kolor
// TODO: improve pageBeat animation performance
// TODO: switch to rems
import "./index.html";
import "./styles/normalize.css";
import "./styles.scss";

import "jquery-ui";
import "touch-punch";

import Vue from "vue";
import App from "./app.vue";
import { CreateElement } from "vue/types/umd";

import { getAppVersion, getLastUpdateDate } from "@/utils/utils";

new Vue({
  render: (h: CreateElement) => h(App),
}).$mount("#app");

$("#version-string").text(`v. ${getAppVersion()} (${getLastUpdateDate()})`);

$(() => {
  // console.log(JULIK_AVATARS);
  
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  
  $("body").delay(1000).animate({ opacity: 1 }, 500, "", function() {
    setTimeout(() => {
      $("#loading-page").delay(1000).fadeOut("slow", function() {
        $("html").addClass("dog-background");
        $("html").removeClass("overflow-hidden"); 
      });
    }, 200);
  });
});
