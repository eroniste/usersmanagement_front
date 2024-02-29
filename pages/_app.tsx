import "@/styles/globals.css";
import "@/styles/styles.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Head from "next/head";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { MantineProvider } from "@mantine/core";
import { NextComponentType } from "next";
import { NextPageContext } from "next";

interface PageWithLayout {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
}

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider>
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>

      <Toaster />
    </>
  );
}
