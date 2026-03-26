import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mf_provider',
  getPublicPath: `function(){return'${process.env.PUBLIC_MF_PUBLIC_PATH}'}`,
  exposes: {
    '.': './src/components/ProviderComponent.tsx',
    './config': './src/config.ts'
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
