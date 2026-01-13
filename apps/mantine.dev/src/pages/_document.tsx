import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { ColorSchemeScript } from '@mantine/core';
import { createGetInitialProps } from '@mantine/emotion';
import { emotionCache } from '../emotion';

export default function Document() {
  return (
    <Html lang="en" data-mantine-color-scheme="light">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/vig7mns.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://ats.wizehire.com/static/dist/wh-global.9d4def8f7235.css" />
        <ColorSchemeScript defaultColorScheme="light" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const stylesServer = createEmotionServer(emotionCache as any);

Document.getInitialProps = createGetInitialProps(NextDocument, stylesServer);
