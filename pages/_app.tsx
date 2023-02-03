import '@/styles/globals.css';
import Head from 'next/head';
import { Roboto } from '@next/font/google';
import { AppProps } from 'next/app';

import { store } from '@/components/App/store';
import { Provider } from 'react-redux';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
        <title>Hexa - Movie Finder</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
