// Settings

var barkUrl = "assets/bark.wav";
var wolaRetroUrl = "assets/wola-retro.mp4";

const bannerText = [
  "ranczos",
  "podziel sie Julikiem!",
  "Julik to nadzieja",
  "niedaleko pada Julik od jabłoni",
  "1, 2, 3 Julik",
  "Julik pochodzi z Hiszpanii",
  "nie igraj z Julikiem",
  "Julik uratował tonący statek",
  "Julik to wolnosc, uuJulik to nadzieja",
  "Julik to jest to",
  "Julik szaleje na strychu",
  "🐶",
  "Julik interesuje sie gastronomią",
  "Julik rozumie hiszpański"
];

const $foodList = $("#food-list");
const $julikImg = $("#julik-img");
const $backgroundContainer = $("#background-container");
const $mainSection = $("#main-section");

const julikClickCounter = (() => {
  var count = 0;
  return function() { return ++count; }
})();

// Init

$(function initialize() {
  setStickyTopForMainSection();
});

if (!localStorage.getItem("extra-food")) {
  localStorage.setItem("extra-food", JSON.stringify(new Array()));
} else {
  for (const extraFoodName of JSON.parse(localStorage.getItem("extra-food"))) {
    addFoodToList(extraFoodName);
  }
}

setInterval(function restartBanner() {
  const $news = $("#news-p");
  const idx = Math.floor(Math.random() * bannerText.length);
  $news.text(bannerText[idx]);
  restartAnimation($news, "news-moving-animation");
}, 15000);

const backgroundChangeInterval = setInterval(() => {
  $backgroundContainer.fadeToggle("slow");
}, 45000);

$(window).on("scroll", function() {
  const targetOffset = $mainSection.offset().top - ($mainSection.height() / 2);

  if ($(this).scrollTop() > targetOffset) {
    $mainSection.addClass("body-animation");
    $mainSection.css("opacity", "1");
    $(window).off("scroll");
  }
});

$(window).on("resize", function() {
  setStickyTopForMainSection();
});

$(".hero-navigation-arrow").on("click", function() {
  $("#main-section").get(0).scrollIntoView({behavior: "smooth", block: "start"});
});

$julikImg.on("click", function() {
  (new Audio(barkUrl)).play();
  restartAnimation($(this), "animate-julik");
});

$julikImg.on("click", function horrorOnClicks() {
  if (julikClickCounter() > 15) {
    activateHorrorMode();
    this.removeEventListener("click", horrorOnClicks, false);
  }
});

$("#add-food-link").on("click", function() {
  const extraFoodName = prompt("Co tam wiecej je Julik?");

  if (!extraFoodName) {
    return;
  }
  
  var foodList = JSON.parse(localStorage.getItem("extra-food"));
  foodList.push(extraFoodName);
  localStorage.setItem("extra-food", JSON.stringify(foodList));

  addFoodToList(extraFoodName);
});

$("#page-reset-btn").on("click", function() {
  localStorage.removeItem("extra-food");
  location.reload();
});

// Utils

function activateHorrorMode() {
  clearInterval(backgroundChangeInterval);
  $backgroundContainer.fadeOut("slow");
  
  $(document.documentElement)
    .addClass(["horror-html", "horror-transitions"]);
  $mainSection
    .addClass(["horror-body", "horror-transitions", "heartbeat-animation-horror"]);
  $julikImg
    .addClass(["fade-in", "horror-julik"]);
  $("li")
    .addClass("horror-marker");
  
  $("#julik-hero-section").hide();
  $("#baba-hero").hide();
  
  $("#julik-loving-p").hide();
  $("#news-container").hide();
  $("#page-reset-btn").show();
  {
    const $japaneseHeaderText = $("<span></span>");
    $japaneseHeaderText.attr("lang", "ja");
    $japaneseHeaderText.text("✟ご飯が熱い。");

    const $pageHeader = $("#page-header");
    $pageHeader.text("");
    $pageHeader.addClass(["horror-h1", "horror-transitions"]);
    $pageHeader.append($japaneseHeaderText);
  }

  $julikImg.attr("src", "images/julik-horror.png");

  $("#julik-introduction-p").text("Julik został przywieziony z Piekła i czasem chodzi do egzorcysty");
  $("#food-list").children().eq(1).text("Ludzie");
  $("#julik-behaviour-p").text("Julik szczeka na wszystko, biega po świecie szukając zaczepki i siejąc terror");
  $("#julik-introduction-h2").text("Abstrakt");

  $(document).on("keydown", function(event) {
    const speed = 5;
    if (event.key === "w") {
      $julikImg.css("top", (Number($julikImg.css("top").split("p")[0]) - speed) + "px");
    } else if (event.key === "s") {
      $julikImg.css("top", (Number($julikImg.css("top").split("p")[0]) + speed) + "px");
    } else if (event.key === "a") {
      $julikImg.css("left", (Number($julikImg.css("left").split("p")[0]) - speed) + "px");
    } else if (event.key === "d") {
      $julikImg.css("left", (Number($julikImg.css("left").split("p")[0]) + speed) + "px");
    }
  });

  barkUrl = "assets/bark-horror.mp3";
  (new Audio(barkUrl)).play();

  addWolaRetroGate();
}

function addFoodToList(foodName) {
  $foodList.append($(`<li>${foodName}</li>`));
}

function restartAnimation($element, animationName) {
  $element.removeClass(animationName);
  $element.offset();
  $element.addClass(animationName);
}

function setStickyTopForMainSection() {
  $mainSection.css("top", -($("#main-section").height() + 70 - $(window).height()));
}

function addWolaRetroGate() {
  $wolaRetroGate = $("<button>ollaf</button>");
  $wolaRetroGate.addClass("wola-retro-button");
  $wolaRetroGate.on("click", activateWolaRetroMode);

  $julikImg.parent().css("position", "relative");
  $julikImg.parent().append($wolaRetroGate);
}

function activateWolaRetroMode() {
  $("body *").fadeOut("slow");
  $("html").removeClass("horror-html").css("background-image", "none").css("background-color", "black");
  $(".horror-marker::marker").contents("🎸   ");

  $videoBackground = $('<video />', {
    src: wolaRetroUrl,
    type: 'video/mp4',
    autoplay: "false",
    controls: false
  }).hide();
  $videoBackground.addClass("wola-retro-video-background");
  $videoBackground.appendTo($("body"));
  setTimeout(function() {
    $videoBackground.get(0).play();
  }, 2000);

  $header = $("<h1>Katalog utworow olafa</h1>").appendTo($("body")).hide();
  
  $songsList = $("<ul></ul>").hide();
  $songsList.append("<li>wola retro (OWV 1)</li>");
  $songsList.append("<li>JULIA-GEORGE (OWV 2)</li>");
  $songsList.appendTo($("body"));
  
  setTimeout(function() {
    $("body").css("color", "white");
    $("body").fadeIn("slow");
    $videoBackground.fadeIn("slow");

    setTimeout(function() {
      $header.fadeIn("slow");
      setTimeout(function() {
        $songsList.fadeIn("slow");
      }, 1000);
    }, 2000)
  }, 5000);
}
