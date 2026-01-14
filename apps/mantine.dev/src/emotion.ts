import createCache from '@emotion/cache';

export const emotionCache = createCache({
  key: 'mantine',
  prepend: false,
  stylisPlugins: [
    // Wrap all Emotion styles in the mantine-components layer
    (element) => {
      if (element.type === 'rule') {
        element.props = [`@layer mantine-components { ${element.props[0]} }`];
      }
    },
  ],
});
