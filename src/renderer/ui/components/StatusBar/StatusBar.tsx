import { Box, BoxProps, Footer, Group, Space, Text } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { CalendarBlank, Clock } from "phosphor-react";
import "dayjs/locale/ar";
import "dayjs/locale/fr";
import { LanguageContext } from "@renderer/context";

export interface IStatusBarProps extends BoxProps<"div"> {}
export const StatusBar: FC<IStatusBarProps> = () => {
  const { language } = useContext(LanguageContext);
  const [clock, setClock] = useState(dayjs());
  useEffect(() => {
    let updateClock = setInterval(() => {
      setClock(dayjs());
    }, 1000);
    return () => {
      clearInterval(updateClock);
    };
  }, []);
  return (
    <Footer
      pl={4}
      px={2}
      height={25}
      style={{ display: "flex", alignItems: "center", height: "100%" }}
    >
      <Group spacing={4}>
        <CalendarBlank size={16} />
        <Text>{clock.locale(language).format("dddd")}</Text>
        <Text>{clock.locale(language).format("YYYY-MM-DD")}</Text>
        <Space w={6} />
        <Clock size={16} />
        <Text>{clock.locale(language).format("HH:mm:ss")}</Text>
      </Group>
    </Footer>
  );
};
