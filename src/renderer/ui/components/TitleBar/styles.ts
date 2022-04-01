import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
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
