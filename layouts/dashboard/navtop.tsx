import { default as LogoIcon } from "$/assets/logo.svg";
import {
  ActionIcon,
  Box,
  Group,
  Space,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { FC } from "react";
import { MoonStars, Sun } from "tabler-icons-react";

const NavTop: FC = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return desktop ? (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
      })}
    >
      <Group position="apart">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title order={4}>NUM</Title>
        </div>
      </Group>
    </Box>
  ) : (
    <></>
  );
};

export default NavTop;
