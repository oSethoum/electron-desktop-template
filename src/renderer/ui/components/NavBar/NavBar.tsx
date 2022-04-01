import { Navbar } from "@mantine/core";
import { useStyles } from "./styles";
export const NavBar = () => {
  const { classes } = useStyles();
  return <Navbar className={classes.root}>Setup</Navbar>;
};
