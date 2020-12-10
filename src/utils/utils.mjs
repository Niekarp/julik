import npmPackageInfo from "../../package-lock.json";

export function restartAnimation($element, animationName) {
  $element.removeClass(animationName);
  $element.offset();
  $element.addClass(animationName);
}

export function getAppVersion() {
  return npmPackageInfo.version;
}

export function getLastUpdateDate() {
  return LAST_UPDATE_DATE;
}
