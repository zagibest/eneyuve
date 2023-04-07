import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  to: string;
  label: string;
}

const LinkButton: FC<Props> = ({ to, label, ...props }) => {
  return (
    <Link href={to} passHref>
      <Button
        px="xs"
        size="xs"
        radius="md"
        variant="outline"
        {...props}
        component="a"
      >
        {label}
      </Button>
    </Link>
  );
};

export default LinkButton;
