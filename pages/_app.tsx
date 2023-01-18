import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Overlock } from '@next/font/google';

const overlock = Overlock({ subsets: ['latin'], weight: ['400'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${overlock.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
