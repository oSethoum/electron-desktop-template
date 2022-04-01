import { useState } from "react";
import {
  createStyles,
  useMantineColorScheme,
  Box,
  Header,
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
import { useRecoilState } from "recoil";
import { chromeAtom } from "@renderer/atoms";

const useStyles = createStyles((theme) => {
  return {
    container: {
      color:
        theme.colorScheme == "dark"
          ? theme.colors.gray[1]
          : theme.colors.dark[5],

      display: "flex",
      flexDirection: "row",
    },
    menu: {},
    dragArea: {
      flexGrow: 1,
      WebkitAppRegion: "drag",
    },

    chromeButtons: {
      display: "flex",
      flexDirection: "row",
    },

    chromeButtonHover: {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "light"
            ? theme.colors.gray[3]
            : theme.colors.gray[8],
        color: theme.colorScheme === "light" ? theme.black : theme.white,
      },
    },

    chromeButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 48,
      border: "none",
      "&:focus": {
        outline: "none",
      },
    },

    closeButton: {
      "&:hover": {
        backgroundColor: "red",
        color: "white",
      },
    },
  };
});

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
  const [chrome, setChrome] = useRecoilState(chromeAtom);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [hover, setHover] = useState(false);
  const [opened, setOpened] = useState(false);
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
          {colorScheme == "light" ? <CgMoon size="16" /> : <CgSun size="16" />}
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
