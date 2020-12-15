// TODO: try to make multiple bundles with one entry points per page
// TODO: try to make bundle with shared code with webpack.optimize.CommonsChunkPlugin
// TODO: make main section scale better when zooming out
// TODO: add juik kosmiczny kolor
// TODO: improve pageBeat animation performance
// TODO: consider adding text hiding when there is no mouse movement in wola retro
import "./index.html";
import "./styles/normalize.css";
import "./styles.css";

import { getAppVersion, getLastUpdateDate } from "Utils/utils.mjs";

$("#version-string").text(`v. ${getAppVersion()} (${getLastUpdateDate()})`);

$(() => {
  // TODO: below works only on firefox
  window.scrollTo(0, 0);
  $("body").delay(1000).animate({ opacity: 1 }, 500, "", function() {
    setTimeout(() => {
      $("#loading-page").delay(1000).fadeOut("slow", function() {
        $("html").addClass("dog-background");
        $("html").removeClass("loading-page-html"); 
      });
    }, 200);
  });
});
