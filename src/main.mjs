// TODO: try to make multiple bundles with one entry points per page
// TODO: try to make bundle with shared code with webpack.optimize.CommonsChunkPlugin
// TODO: patron page
// TODO: make main section scale better when zooming out
// TODO: add juik kosmiczny kolor
import "./index.html";
import "./styles/normalize.css";
import "./styles.css";

import { getAppVersion, getLastUpdateDate } from "Utils/utils.mjs";

$("#version-string").text(`v. ${getAppVersion()} (${getLastUpdateDate()})`);

$(() => {
  $("body").delay(1000).animate({ opacity: 1 }, 500, "", function() {
setTimeout(() => {
  $("#loading-page").delay(1000).fadeOut("slow", function() {
    $("html").addClass("dog-background");
    $("html").removeClass("loading-page-html"); 
  });
  return;
  $("body").delay(1000).animate({ opacity: 1 }, 500, "", function() {
    // $(this).css("background-image", `url(./${BACKGROUND_IMG_URL})`)
    // $(this).css("background-repear", "no-repeat");
    $("html").addClass("dog-background");
    $("html").removeClass("loading-page-html"); 
  });
}, 200);
  });
});
