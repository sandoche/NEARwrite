import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

import NearProvider from "@/modules/near-api-react/providers/NearProvider";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const nearNetworkEnv = process.env.NEXT_PUBLIC_NEAR_NETWORK_ENV || "testnet";

  return (
    <>
      <Head>
        <title>NEARwrite</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <NearProvider networkId={nearNetworkEnv}>
          <Component {...pageProps} />
        </NearProvider>
      </MantineProvider>
    </>
  );
}
