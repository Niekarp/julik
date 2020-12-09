// TODO: try to make multiple bundles with one entry points per page
// TODO: try to make bundle with shared code with webpack.optimize.CommonsChunkPlugin
// TODO: patron page
// TODO: add juik kosmiczny kolor
import "./index.html";
import "./styles/normalize.css";
import "./styles.css";

setTimeout(() => {
  $("body").delay(1000).animate({ opacity: 1 }, 500, "", function() {
    // $(this).css("background-image", `url(./${BACKGROUND_IMG_URL})`)
    // $(this).css("background-repear", "no-repeat");
    $("html").addClass("dog-background");
    $("html").removeClass("loading-page-html");
  });
}, 200);
