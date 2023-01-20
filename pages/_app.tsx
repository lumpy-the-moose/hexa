import '@/styles/globals.css';
import Head from 'next/head';
import { Overlock } from '@next/font/google';
import { AppProps } from 'next/app';

const overlock = Overlock({ subsets: ['latin'], weight: ['400'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${overlock.style.fontFamily};
        }
      `}</style>

      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="favicon.svg" />
        <title>Hexa - Photo Finder</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
