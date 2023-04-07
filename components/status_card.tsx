import { Group, Paper, RingProgress, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  to: string;
  title: string;
  value: number;
  max?: number;
  format?: (value: number) => string | number;
}

const StatusCard: FC<Props> = ({
  to,
  title,
  value,
  max,
  format = (i) => i,
}) => {
  let percent = 100;
  if (typeof max !== "undefined") {
    percent = max !== 0 ? Math.round((value / max) * 100) : 0;
  }
  return (
    <Link href={to} passHref>
      <Paper
        px="md"
        py="xs"
        withBorder
        radius="md"
        component="a"
        sx={() => ({
          cursor: "pointer",
          transitionProperty: "all",
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgb(12 166 120 / 0.1), 0 4px 6px -4px rgb(12 166 120 / 0.1)",
          },
        })}
      >
        <Group position="apart" sx={{ flexWrap: "nowrap" }}>
          <Stack spacing="xs">
            <Title order={5}>{title}</Title>
            <Text size="xs" color="dimmed">
              {format(value)}
              {typeof max !== "undefined" && `/${format(max)}`}
            </Text>
          </Stack>
          <RingProgress
            roundCaps
            size={64}
            thickness={4}
            sections={[{ value: percent, color: "teal" }]}
            label={
              <Text color="teal" align="center" size="md">
                {typeof max !== "undefined" ? `${percent.toFixed()}%` : value}
              </Text>
            }
          />
        </Group>
      </Paper>
    </Link>
  );
};

export default StatusCard;
