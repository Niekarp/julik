// TODO: try to make multiple bundles with one entry points per page
// TODO: try to make bundle with shared code with webpack.optimize.CommonsChunkPlugin
import "./index.html";
import "./styles/normalize.css";
import "./styles.css";

setTimeout(() => {
  $("html").delay(1000).animate({ opacity: 1 }, 1000);
}, 200);
