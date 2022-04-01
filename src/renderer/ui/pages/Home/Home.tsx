import React, { FC } from "react";
import { Box, BoxProps } from "@mantine/core";

export interface IHomeProps extends BoxProps<"div"> {}
export const Home: FC<IHomeProps> = () => {
  return <Box></Box>;
};
