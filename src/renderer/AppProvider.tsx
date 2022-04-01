import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import type { ColorScheme } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import App from "@renderer/App";
import { themeAtom } from "@renderer/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export const AppProvider = () => {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === "dark" ? "light" : "dark");

  const [theme, setTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    setTheme({ ...theme, colorScheme });
  }, [colorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
