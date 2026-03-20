import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mf_test_provider',
  getPublicPath: `function(){return'${process.env.PUBLIC_MF_PUBLIC_PATH}'}`,
  exposes: {
    './create-app-card': './src/createAppCard.tsx',
    './patch-on-navigation': './src/patch-on-navigation.tsx'
  },
  shared: {
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    },
    'react-router': {
      singleton: true,
    }
  },
});
