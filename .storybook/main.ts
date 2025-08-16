import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-onboarding'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Vite 설정을 재사용하여 Emotion 지원
  viteFinal: async (config) => {
    // esbuild 설정에 Emotion jsxImportSource 추가
    if (config.esbuild) {
      config.esbuild.jsxImportSource = '@emotion/react';
    } else {
      config.esbuild = {
        jsxImportSource: '@emotion/react',
        jsx: 'automatic',
      };
    }

    return config;
  },
};
export default config;
