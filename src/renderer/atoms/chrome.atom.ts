import { atom } from "recoil";
import { ChromeState } from "@common/utils";

export const chromeAtom = atom<ChromeState>({
  key: "chrome-atom",
  default: ChromeState.Restored,
});
