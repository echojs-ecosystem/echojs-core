import { defineConfig } from 'oxfmt'

import baseConfig from '../../packages/.configs/oxfmt.config.ts'

/** Docs import order: echojs → npm → @app/@pages/… → relative */
const docsSortImports = {
  newlinesBetween: false,
  customGroups: [
    {
      groupName: 'echojs',
      elementNamePattern: ['@echojs-ecosystem', '@echojs-ecosystem/**'],
    },
    {
      groupName: 'app-layer',
      elementNamePattern: ['@app', '@app/**'],
    },
    {
      groupName: 'pages-layer',
      elementNamePattern: ['@pages', '@pages/**'],
    },
    {
      groupName: 'widgets-layer',
      elementNamePattern: ['@widgets', '@widgets/**'],
    },
    {
      groupName: 'features-layer',
      elementNamePattern: ['@features', '@features/**'],
    },
    {
      groupName: 'entities-layer',
      elementNamePattern: ['@entities', '@entities/**'],
    },
    {
      groupName: 'core-layer',
      elementNamePattern: ['@core', '@core/**', '@content', '@content/**'],
    },
  ],
  groups: [
    'echojs',
    ['value-builtin', 'value-external'],
    { newlinesBetween: true },
    'app-layer',
    'pages-layer',
    'widgets-layer',
    'features-layer',
    'entities-layer',
    'core-layer',
    { newlinesBetween: true },
    ['type-parent', 'type-sibling', 'type-index'],
    ['value-parent', 'value-sibling', 'value-index'],
    'unknown',
  ],
}

export default defineConfig({
  ...baseConfig,
  sortImports: docsSortImports,
})
