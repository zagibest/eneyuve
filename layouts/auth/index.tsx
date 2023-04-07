import { Center } from "@mantine/core";
import { Router, useRouter } from "next/router";
import React, { FC, PropsWithChildren, useEffect } from "react";

interface Props {
  router: Router;
}

const AuthLayout: FC<PropsWithChildren<Props>> = ({ router, children }) => {
  return <Center sx={{ height: "100vh" }}>{children}</Center>;
};

export default AuthLayout;
