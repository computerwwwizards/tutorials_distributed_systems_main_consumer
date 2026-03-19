import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mf_test_provider',
  exposes: {
    './create-app-card': './src/createAppCard.tsx',
    './patch-on-navigation': './src/patch-on-navigation.tsx'
  },
  shared: {
    react: { 
      singleton: true,
      eager: true
    },
    'react-dom': { 
      singleton: true,
      eager: true
    },
    'react-router': {
      singleton: true,
      eager: true
    }
  },
});
