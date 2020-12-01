// Settings

var barkUrl = "assets/bark.wav";
const bannerText = [
  "ranczos",
  "podziel sie Julikiem!",
  "Julik to nadzieja",
  "niedaleko pada Julik od jabłoni",
  "1, 2, 3 Julik",
  "Julik pochodzi z Hiszpanii",
  "nie igraj z Julikiem",
  "Julik uratował tonący statek",
  "Julik to wolnosc, Julik to nadzieja"
];

const $foodList = document.getElementById("food-list");

const julikClickCounter = (() => {
  var count = 0;
  return function() { return ++count; }
})();

// Init

if (!localStorage.getItem("extra-food")) {
  localStorage.setItem("extra-food", JSON.stringify(new Array()));
} else {
  for (const extraFoodName of JSON.parse(localStorage.getItem("extra-food"))) {
    addFoodToList(extraFoodName);
  }
}

setInterval(function restartBanner() {
  $news = document.getElementById("news-p");
  $news.textContent = bannerText[Math.floor(Math.random() * bannerText.length)];
  restartAnimation($news, "news-moving-animation");
}, 15000);

document.getElementById("julik-img").addEventListener("click", function() {
  (new Audio(barkUrl)).play();
  restartAnimation(this, "animate-julik");
});

document.getElementById("julik-img").addEventListener("click", function horrorOnClicks() {
  if (julikClickCounter() > 15) {
    activateHorrorMode();
    this.removeEventListener("click", horrorOnClicks, false);
  }
});

document.getElementById("add-food-link").addEventListener("click", function() {
  const extraFoodName = prompt("Co tam wiecej je Julik?");

  if (!extraFoodName) {
    return;
  }
  
  var foodList = JSON.parse(localStorage.getItem("extra-food"));
  foodList.push(extraFoodName);
  localStorage.setItem("extra-food", JSON.stringify(foodList));

  addFoodToList(extraFoodName);
});

document.getElementById("page-reset-btn").addEventListener("click", function() {
  localStorage.removeItem("extra-food");
  location.reload();
});

// Utils

function activateHorrorMode() {
  $julik = document.getElementById("julik-img");
  $julik.style.position = "relative";
  $julik.classList.add("fade-in", "horror-julik");
  $julik.setAttribute("src", "images/julik-horror.png");
  
  document.addEventListener("keydown", function(event) {
    const speed = 5;
    if (event.key === "w") {
      $julik.style.top = (Number($julik.style.top.split("p")[0]) - speed) + "px";
    } else if (event.key === "s") {
      $julik.style.top = (Number($julik.style.top.split("p")[0]) + speed) + "px";
    } else if (event.key === "a") {
      $julik.style.left = (Number($julik.style.left.split("p")[0]) - speed) + "px";
    } else if (event.key === "d") {
      $julik.style.left = (Number($julik.style.left.split("p")[0]) + speed) + "px";
    }
  });

  document.documentElement.classList.add("horror-html", "horror-transitions");
  document.body.classList.add("horror-body", "horror-transitions", "heartbeat-animation-horror");
  
  var $japaneseHeaderText = document.createElement("span");
  $japaneseHeaderText.setAttribute("lang", "ja");
  $japaneseHeaderText.textContent = "✟ご飯が熱い。";

  $pageHeader = document.getElementById("page-header");
  $pageHeader.textContent = "";
  $pageHeader.classList.add("horror-h1", "horror-transitions");
  $pageHeader.appendChild($japaneseHeaderText);

  document.getElementById("julik-introduction-p").textContent = 
    "Julik został przywieziony z Piekła i czasem chodzi do egzorcysty";
  document.getElementById("food-list").children[1].textContent = "Ludzie";
  document.getElementById("julik-behaviour-p").textContent = 
    "Julik szczeka na wszystko, biega po świecie szukając zaczepki i siejąc terror";

  document.getElementById("page-reset-btn").style.display = "block";
  document.getElementById("julik-loving-p").style.display = "none";
  document.getElementById("news-container").style.display = "none";

  document.documentElement.style.backgroundImage = "url(\"images/horror-background.png\")";

  barkUrl = "assets/bark-horror.mp3";
  (new Audio(barkUrl)).play();
}

function addFoodToList(foodName) {
  let $extraFoodListItem = document.createElement("li");
  $extraFoodListItem.textContent = foodName;
  $foodList.appendChild($extraFoodListItem);
}

function restartAnimation($element, animationName) {
  $element.classList.remove(animationName);
  void $element.offsetWidth;
  $element.classList.add(animationName);
}
