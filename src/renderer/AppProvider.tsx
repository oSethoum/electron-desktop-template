import React from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
  TypographyStylesProvider,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { LanguageContext, LanguageProps } from "./context/language";
import { ChromeContext } from "./context";
import { ChromeState } from "@common/utils";
import { Global } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";

const GlobalStyles = () => {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },

        body: {
          ...theme.fn.fontStyles(),
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
          color: theme.colorScheme === "dark" ? "white" : theme.black,
          lineHeight: theme.lineHeight,
        },
      })}
    />
  );
};

export const AppProvider: React.FC = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "theme",
    defaultValue: "light",
  });

  const [language, setLanguage] = useLocalStorageValue<LanguageProps>({
    key: "language",
    defaultValue: "en",
  });

  const [chrome, setChrome] = React.useState(ChromeState.Restored);

  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr");

  React.useEffect(() => {
    if (language === "ar") {
      setDir("rtl");
      document.documentElement.dir = "rtl";
    } else {
      setDir("ltr");
      document.documentElement.dir = "ltr";
    }
  }, [language]);

  const toggleColorScheme = (value?: ColorScheme) => {
    if (value) {
      setColorScheme(value);
    } else {
      setColorScheme(colorScheme === "light" ? "dark" : "light");
    }
  };

  React.useEffect(() => {
    document.documentElement.style.colorScheme = colorScheme;
  }, [colorScheme]);

  const colors = {
    gray: [
      "#FAFAFA",
      "#F5F5F5",
      "#EEEEEE",
      "#E0E0E0",
      "#BDBDBD",
      "#9E9E9E",
      "#757575",
      "#616161",
      "#424242",
      "#212121",
    ],
  };
  const theme: MantineThemeOverride = {
    colorScheme,
    primaryColor: "cyan",
    colors: {
      ...(colors as any),
    },
    dir: "rtl",
    radius: {
      sm: 0,
    },
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ChromeContext.Provider value={{ chrome, setChrome }}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withNormalizeCSS
            theme={theme}
            emotionOptions={
              dir === "rtl"
                ? { key: "mantine-rtl", stylisPlugins: [rtlPlugin] }
                : { key: "mantine" }
            }
            styles={{
              Select: (theme) => ({
                dropdown: {
                  marginTop: -6,
                  marginBottom: -6,
                  paddingTop: 1,
                  paddingBottom: 4,
                  border: `1px solid ${
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "light" ? 4 : 7
                    ]
                  }`,
                  borderTop: "none",
                },
                item: {
                  marginTop: 4,
                },

                hovered: {
                  backgroundColor:
                    theme.colors.gray[theme.colorScheme === "light" ? 2 : 7],
                },
              }),

              Paper: ({ colorScheme, colors, white }) => ({
                root: {
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[6] : white,
                  border: `1px solid ${
                    colors.gray[colorScheme === "dark" ? 8 : 3]
                  }`,
                },
              }),

              TextInput: ({ colorScheme, colors, white }) => ({
                input: {
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[4] : white,
                },

                icon: {
                  color: colors.gray[colorScheme === "dark" ? 3 : 7],
                },
              }),

              Navbar: ({ colors, colorScheme }) => ({
                root: {
                  borderRight: `1px solid ${
                    colors.gray[colorScheme === "dark" ? 8 : 3]
                  }`,
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[6] : colors.gray[0],
                },
              }),

              Footer: ({ colors, colorScheme }) => ({
                root: {
                  borderTop: `1px solid ${
                    colors.gray[colorScheme === "dark" ? 8 : 3]
                  }`,
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[6] : colors.gray[0],
                },
              }),

              Header: ({ colors, colorScheme }) => ({
                root: {
                  borderBottom: `1px solid ${
                    colors.gray[colorScheme === "dark" ? 8 : 3]
                  }`,
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[6] : colors.gray[0],
                },
              }),
            }}
          >
            <TypographyStylesProvider>
              <GlobalStyles />
              {children}
            </TypographyStylesProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ChromeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default AppProvider;
