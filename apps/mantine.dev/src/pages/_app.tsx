import '@wizehire/theme/tokens.css';
import '../styles/variables.css';
import '../styles/mantine-layers.css';
import '../styles/tailwind.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { MantineEmotionProvider } from '@mantine/emotion';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { GaScript } from '@/components/GaScript';
import { HotKeysHandler } from '@/components/HotKeysHandler';
import { MdxProvider } from '@/components/MdxProvider';
import { ModalsProviderDemo } from '@/components/ModalsProviderDemo';
import { Search } from '@/components/Search';
import { Shell } from '@/components/Shell';
import { theme } from '../../theme';
import { emotionCache } from '../emotion';

import '../styles/variables.css';
import '../styles/tailwind.css';

const excludeShell = ['/', '/combobox', '/app-shell'];

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

export default function App({ Component, pageProps, router }: AppProps) {
  const { basePath } = useRouter();
  const shouldRenderShell = !excludeShell.includes(router.pathname);
  const [navbarOpened, setNavbarOpened] = useLocalStorage({
    key: 'mantine-navbar-opened',
    defaultValue: true,
  });

  useHotkeys([['mod + alt + N', () => setNavbarOpened(!navbarOpened)]]);

  return (
    <>
      <Head>
        <title>Mantine</title>
        <link rel="shortcut icon" href={`${basePath}/favicon.svg`} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <meta name="og:image:width" content="1280" />
        <meta name="og:image:height" content="640" />
        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mantinedev" />
        <meta
          name="og:image"
          content="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/social-preview.png"
        />
      </Head>
      <GaScript />
      <DirectionProvider initialDirection="ltr" detectDirection={false}>
        <MantineEmotionProvider cache={emotionCache}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            <CodeHighlightAdapterProvider adapter={shikiAdapter}>
              <Search />
              <Notifications />
              <ModalsProviderDemo>
                <MdxProvider>
                  <HotKeysHandler />
                  {shouldRenderShell ? (
                    <Shell>
                      <Component {...pageProps} />
                    </Shell>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </MdxProvider>
              </ModalsProviderDemo>
            </CodeHighlightAdapterProvider>
          </MantineProvider>
        </MantineEmotionProvider>
      </DirectionProvider>
    </>
  );
}
