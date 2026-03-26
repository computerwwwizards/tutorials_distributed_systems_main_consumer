import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mf_consumer',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
