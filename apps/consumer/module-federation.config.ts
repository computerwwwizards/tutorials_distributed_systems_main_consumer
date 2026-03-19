import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'host',
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