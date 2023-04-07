import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";

export interface NavItemRecord {
  path: string;
  label: string;
  icon?: JSX.Element;
  active?: boolean;
}

const NavItem: FC<NavItemRecord> = ({ path, label, icon, active }) => (
  <Link href={path} passHref>
    <UnstyledButton
      component="a"
      sx={(theme) => {
        let color = theme.black;
        let border = "none";
        let bgHover = theme.colors.gray[0];
        let borderColor = theme.colors[theme.primaryColor][6];
        if (theme.colorScheme === "dark") {
          color = theme.colors.blue[0];
          bgHover = theme.colors.blue[6];
          borderColor = theme.colors[theme.primaryColor][8];
        }
        if (active) {
          border = "1px solid";
        }
        return {
          width: "100%",
          display: "block",
          color: color,
          border: border,
          borderColor: borderColor,
          padding: theme.spacing.xs,
          borderRadius: theme.radius.md,
          "&:hover": {
            backgroundColor: bgHover,
          },
        };
      }}
    >
      <Group>
        {icon && (
          <ThemeIcon
            color={active ? "blue" : "gray"}
            variant={active ? "filled" : "light"}
          >
            {icon}
          </ThemeIcon>
        )}
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  </Link>
);

export default NavItem;
