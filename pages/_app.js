import LayoutComponent from '@/components/layout/layoutComponent';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <LayoutComponent>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

export default MyApp;
