import { FC } from "react";
import { BoxProps, Center, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export interface IHomeProps extends BoxProps<"div"> {}
export const Home: FC<IHomeProps> = () => {
  const { t } = useTranslation();
  return (
    <Center sx={{ height: "100%" }}>
      <Title order={1}>{t("hello")}</Title>
    </Center>
  );
};
