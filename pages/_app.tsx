import { PLASMIC } from "../plasmic-init";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    PLASMIC && (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    )
  );
}

export default MyApp;
