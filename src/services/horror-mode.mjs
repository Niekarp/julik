import * as Background from "Modules/background/background.mjs";
import * as MainPanel from "Modules/main-panel/main-panel.mjs";
import * as JulikBust from "Modules/julik-bust/julik-bust.mjs";
import * as FoodList from "Modules/food-list/food-list.mjs";
import * as NewsBanner from "Modules/news-banner/news-banner.mjs";
import { addWolaRetroGate } from "Modules/wola-retro-mode/wola-retro-mode.mjs";

export function activateAppHorrorMode() {
  NewsBanner.hideAndStop();

  Background.setHorrorTheme();
  MainPanel.setHorrorTheme();
  JulikBust.setHorrorTheme();
  FoodList.setHorrorTheme();

  addWolaRetroGate();
}
