import type { NextPage } from 'next';
import Head from 'next/head';

import HomeHero from '@/components/home/HomeHero';
import en from '@/locales/en.json';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{en.common.title}</title>
        <meta name="description" content={en.common.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHero />
    </>
  );
};

export default Home;
