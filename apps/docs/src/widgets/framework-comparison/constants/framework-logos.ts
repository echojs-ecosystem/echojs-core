import type { FrameworkId } from '@widgets/framework-comparison/constants/framework-comparison.data'

export const frameworkLogoSrc: Record<FrameworkId, string> = {
  react: '/framework-logos/react.svg',
  vue: '/framework-logos/vue.svg',
  angular: '/framework-logos/angular.svg',
  solid: '/framework-logos/solid.svg',
  svelte: '/framework-logos/svelte.svg',
  echojs: '/framework-logos/echojs.svg',
}

export const frameworkLogoAlt: Record<FrameworkId, string> = {
  react: 'React',
  vue: 'Vue',
  angular: 'Angular',
  solid: 'SolidJS',
  svelte: 'Svelte',
  echojs: 'EchoJS',
}
