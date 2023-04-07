import { LoadingOverlay } from "@mantine/core";
import { Router } from "next/router";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import AuthLayout from "./auth";
import DashboardLayout from "./dashboard";

type Layouts = "dashboard" | "auth" | "loading" | "public";

interface Props {
  router: Router;
}

const LayoutProvider: FC<PropsWithChildren<Props>> = ({ router, children }) => {
  const [layout, setLayout] = useState<Layouts>("loading");

  useEffect(() => {
    if (router.pathname.startsWith("/dashboard")) {
      setLayout("dashboard");
    } else if (router.pathname.startsWith("/auth")) {
      setLayout("auth");
    } else {
      setLayout("public");
    }
  }, [router.pathname]);

  switch (layout) {
    case "auth":
      return <AuthLayout router={router}>{children}</AuthLayout>;
    case "dashboard":
      return <DashboardLayout router={router}>{children}</DashboardLayout>;
    case "loading":
      return <LoadingOverlay visible loaderProps={{ size: "xl" }} />;
    default:
      return <>{children}</>;
  }
};

export default LayoutProvider;
