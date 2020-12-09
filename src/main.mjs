// TODO: try to make multiple bundles with one entry points per page
// TODO: try to make bundle with shared code with webpack.optimize.CommonsChunkPlugin
// TODO: use $.one() instead of on for wola retro button
// TODO: patron page
import "./index.html";
import "./styles/normalize.css";
import "./styles.css";

setTimeout(() => {
  $("html").delay(1000).animate({ opacity: 1 }, 500, "", function() {
    // $(this).css("background-image", `url(./${BACKGROUND_IMG_URL})`)
    // $(this).css("background-repear", "no-repeat");
    $(this).addClass("dog-background");
    $(this).removeClass("loading-page");
  });
}, 200);
