import { useState } from "react";
import { useContext } from "react";
import {
  useMantineColorScheme,
  Box,
  Header,
  useMantineTheme,
} from "@mantine/core";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import { CgMoon, CgSun } from "react-icons/cg";
import { ChromeAction, ChromeState } from "@common/utils";
import { useWindowEvent } from "@mantine/hooks";
import { ChromeContext } from "@renderer/context";
import { useStyles } from "./styles";

async function ping() {
  // @ts-ignore
  api.send("ping");

  // @ts-ignore
  api.receive("ping", (data: string) => {
    console.log(data);
  });
}

export const ToolBar = () => {
  const { classes, cx } = useStyles();
  const { chrome, setChrome } = useContext(ChromeContext);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [hover, setHover] = useState(false);
  const theme = useMantineTheme();
  const chromeAction = (action: ChromeAction) => {
    // @ts-ignore
    api.send("chrome", action);
  };

  useWindowEvent("resize", () => {
    // @ts-ignore
    api.send("chrome");
    // @ts-ignore
    api.receive("chrome", (data: ChromeState) => {
      setChrome(data);
    });
  });

  return (
    <Header height={32} className={classes.container} dir="ltr">
      <Box className={classes.dragArea}></Box>
      <Box className={cx(classes.chromeButtons)}>
        <Box
          tabIndex={-1}
          className={cx(classes.chromeButton, classes.chromeButtonHover)}
          onClick={() => toggleColorScheme()}
        >
          {colorScheme == "light" ? (
            <CgMoon size="18" color={theme.colors.blue[7]} />
          ) : (
            <CgSun size="18" color={theme.colors.yellow[4]} />
          )}
        </Box>

        <Box
          tabIndex={-1}
          className={cx(
            classes.chromeButton,
            hover && classes.chromeButtonHover
          )}
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          onClick={() => {
            setHover(false);
            chromeAction(ChromeAction.Minimize);
          }}
        >
          <VscChromeMinimize stroke="1" size="16" />
        </Box>

        {chrome != ChromeState.FullScreen && (
          <Box
            tabIndex={-1}
            className={cx(classes.chromeButton, classes.chromeButtonHover)}
            onClick={() => {
              chrome == ChromeState.Maximized
                ? chromeAction(ChromeAction.Restore)
                : chromeAction(ChromeAction.Maximize);
            }}
          >
            {chrome == ChromeState.Maximized ? (
              <VscChromeRestore stroke="1" size="16" />
            ) : (
              <VscChromeMaximize stroke="1" size="16" />
            )}
          </Box>
        )}

        <Box
          tabIndex={-1}
          className={cx(
            classes.chromeButton,
            classes.chromeButtonHover,
            classes.closeButton
          )}
          onClick={() => {
            chromeAction(ChromeAction.Close);
          }}
        >
          <VscChromeClose stroke="1" size="16" />
        </Box>
      </Box>
    </Header>
  );
};

export default ToolBar;
