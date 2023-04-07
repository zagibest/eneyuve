import client from "$/apollo-client";
import LayoutProvider from "$/layouts";
import { ApolloProvider } from "@apollo/client";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { LazyMotion, domAnimation } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps, router }: AppProps) {
  const preferred = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferred);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  });

  return (
    <>
      <Head>
        <title>Энэ юу вэ?</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <LazyMotion strict features={domAnimation}>
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            >
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                  colorScheme,
                  loader: "bars",
                  primaryColor: "blue",
                  fontFamily: "'Raleway', sans-serif",
                  fontFamilyMonospace: "'Raleway', sans-serif",
                  headings: { fontFamily: "'Raleway', sans-serif" },
                }}
              >
                <Notifications />
                <ModalsProvider>
                  <LayoutProvider router={router}>
                    <Component {...pageProps} />
                  </LayoutProvider>
                </ModalsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </LazyMotion>
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
