import { MantineThemeOverride } from "@mantine/core";
import { atom } from "recoil";

export const themeAtom = atom<MantineThemeOverride>({
  key: "theme-atom",
  default: {},
});
