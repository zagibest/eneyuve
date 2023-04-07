import {
  AppShell,
  Box,
  Navbar,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { Router } from "next/router";
import { FC, PropsWithChildren, useState } from "react";
import { BellSchool, Notebook } from "tabler-icons-react";
import NavTop from "./navtop";
import NavItem from "./nav_item";
import TopBar from "./topbar";

interface Props {
  router: Router;
}

const DashboardLayout: FC<PropsWithChildren<Props>> = ({
  router,
  children,
}) => {
  const theme = useMantineTheme();
  const [open, setOpen] = useState(false);

  const menu = [
    {
      icon: <BellSchool />,
      label: "Хоосон анги",
      path: "/dashboard",
    },
    {
      icon: <Notebook />,
      label: "Хичээлийн хуваарь",
      path: "/dashboard/schedule",
    },
  ];

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          px="md"
          pb="md"
          hidden={!open}
          width={{ sm: 260 }}
          hiddenBreakpoint="sm"
        >
          <Navbar.Section>
            <NavTop />
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <Box
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              {menu.map((item) => (
                <NavItem
                  key={item.path}
                  active={item.path === router.pathname}
                  {...item}
                />
              ))}
            </Box>
          </Navbar.Section>
        </Navbar>
      }
      header={<TopBar setOpen={setOpen} open={open} />}
    >
      {children}
    </AppShell>
  );
};

export default DashboardLayout;
