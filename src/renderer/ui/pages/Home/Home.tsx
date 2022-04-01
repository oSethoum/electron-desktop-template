import React, { FC } from "react";
import { Box, BoxProps, Center, Title } from "@mantine/core";

export interface IHomeProps extends BoxProps<"div"> {}
export const Home: FC<IHomeProps> = () => {
  return (
    <Center sx={{ height: "100%" }}>
      <Title order={1}>Hello, World</Title>
    </Center>
  );
};
