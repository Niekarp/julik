import * as npmPackageInfo from "../../package.json";

export function restartAnimation($element: JQuery, animationName: string) {
  $element = $($element);
  $element.removeClass(animationName);
  $element.offset();
  $element.addClass(animationName);
}

export function getAppVersion() {
  return (npmPackageInfo as any).default.version;
}

export function getLastUpdateDate() {
  // TODO: fix
  return LAST_UPDATE_DATE;
}
