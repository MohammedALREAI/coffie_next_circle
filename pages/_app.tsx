import "../styles/globals.css";
import StoreProvider from "../store/store-context";
import { NextPage } from "next";
import AppProps from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
