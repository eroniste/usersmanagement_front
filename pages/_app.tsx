import "@/styles/globals.css";
import "@/styles/styles.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Head from "next/head";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster"
import { MantineProvider } from '@mantine/core';


axios.defaults.baseURL = "http://localhost:8080/";

export default function App({ Component, pageProps }: AppProps) {
  <Head>
    <title>My page</title>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
  </Head>;
  return (
    <MantineProvider>
    <SWRConfig
      value={{ fetcher: (url: string) => axios(url).then((r) => r.data) }}
    >
      <Component {...pageProps} />
      <Toaster />
    </SWRConfig>
    </MantineProvider>
  );
}
