import { I18N } from "./i18n-data";

export type Lang = "de" | "tr";
export type Messages = (typeof I18N)["de"];

export function getMessages(lang: Lang): Messages {
  return I18N[lang];
}
