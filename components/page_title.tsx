import {
  Button,
  Group,
  Input,
  Loader,
  Paper,
  Stack,
  Title,
  Transition,
} from "@mantine/core";
import { m } from "framer-motion";
import React, { ChangeEvent, FC, PropsWithChildren } from "react";
import { RotateClockwise, Search } from "tabler-icons-react";

interface Props {
  title: string;
  loading?: boolean;
  onRefresh?: () => void;
  extra?: React.ReactNode;
  search?: string;
  hasBodyWrapper?: boolean;
  onSearchChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

const PageTitle: FC<PropsWithChildren<Props>> = ({
  title,
  onRefresh,
  extra,
  children,
  search,
  onSearchChange,
  loading = false,
  hasBodyWrapper = true,
}) => {
  return (
    <m.div
      key={title}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -16 },
      }}
    >
      <Stack>
        <Paper radius="lg" px="md" py="xs" shadow="sm">
          <Group position="apart">
            <Group>
              <Title order={5}>{title}</Title>
              <Transition duration={300} transition="fade" mounted={loading}>
                {(style) => <Loader variant="dots" style={style} />}
              </Transition>
            </Group>
            <Group>
              {(search || onSearchChange) && (
                <Input
                  radius="md"
                  value={search}
                  variant="filled"
                  placeholder="Search..."
                  onChange={onSearchChange}
                  icon={<Search size={16} />}
                />
              )}
              {onRefresh && (
                <Button
                  px="xs"
                  radius="md"
                  variant="subtle"
                  onClick={() => onRefresh()}
                >
                  <RotateClockwise />
                </Button>
              )}
              {extra}
            </Group>
          </Group>
        </Paper>
        {children &&
          (hasBodyWrapper ? (
            <Paper py="xs" px="md" radius="lg" shadow="sm">
              {children}
            </Paper>
          ) : (
            children
          ))}
      </Stack>
    </m.div>
  );
};

export default PageTitle;
