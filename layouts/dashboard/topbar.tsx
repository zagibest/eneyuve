import { default as LogoIcon } from "$/assets/logo.svg";
import {
  ActionIcon,
  Box,
  Burger,
  Group,
  Header,
  Space,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { Dispatch, FC, SetStateAction } from "react";
import { MoonStars, Sun } from "tabler-icons-react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TopBar: FC<Props> = ({ open, setOpen }) => {
  const theme = useMantineTheme();
  const desktop = useMediaQuery("(min-width: 768px)");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return !desktop ? (
    <Header height={48}>
      <Group sx={{ height: "100%" }} px={24} position="apart">
        <Burger
          size="sm"
          opened={open}
          color={theme.colors.gray[6]}
          onClick={() => setOpen((o) => !o)}
        />

        {/* <ActionIcon
          size={30}
          variant="default"
          onClick={() => toggleColorScheme()}
        >
          {colorScheme === "dark" ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon> */}
      </Group>
    </Header>
  ) : (
    <></>
  );
};

export default TopBar;
