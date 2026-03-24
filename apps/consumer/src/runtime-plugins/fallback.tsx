import type { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

const fallbackPlugin = (): ModuleFederationRuntimePlugin => {
  return {
    name: 'fallback-plugin',

    // Why: when the remote server is down, globalThis.fetch throws ERR_CONNECTION_REFUSED.
    // The runtime passes this hook's return value directly to generateSnapshotFromManifest,
    // which immediately destructures metaData.remoteEntry.path — if metaData is missing or
    // incomplete the shared scope corrupts and even local imports like react-dom/client fail.
    // metaData shape required by generateSnapshotFromManifest:
    // https://github.com/module-federation/core/blob/v2.2.3/packages/sdk/src/generateSnapshotFromManifest.ts#L135  
    async fetch(manifestUrl, requestInit) {
      try {
        return await globalThis.fetch(manifestUrl, requestInit);
      } catch {
        const offlineManifest = {
          id: manifestUrl,
          name: 'offline-remote',
          metaData: {
            name: 'offline-remote',
            globalName: 'offline-remote',
            publicPath: '/',
            remoteEntry: {
              path: '/',
              name: 'offline-remoteEntry.js',
              type: 'global',
            },
            buildInfo: {
              buildVersion: '0',
              buildName: 'offline-remote',
            },
            type: 'app',
          },
          shared: [],
          remotes: [],
          exposes: [],
        };
        return new Response(JSON.stringify(offlineManifest), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    },

    // Why: second line of defense for cases where the fetch hook doesn't intercept
    // (e.g. manifest responds 200 with invalid content, timeout, CORS error).
    // The lifecycle discriminator is critical — afterResolve expects a manifest object,
    // not a React component. Returning a component here corrupts the shared scope the same
    // way an empty metaData does. The metaData structure must satisfy generateSnapshotFromManifest:
    // https://github.com/module-federation/core/blob/v2.2.3/packages/sdk/src/generateSnapshotFromManifest.ts#L135
    async errorLoadRemote(args) {
      if (args.lifecycle === 'afterResolve') {
        return {
          id: args.id,
          name: 'offline-remote',
          metaData: {
            name: 'offline-remote',
            globalName: 'offline-remote',
            publicPath: '/',
            remoteEntry: {
              path: '/',
              name: 'offline-remoteEntry.js',
              type: 'global',
            },
            buildInfo: {
              buildVersion: '0',
              buildName: 'offline-remote',
            },
            type: 'app',
          },
          shared: [],
          remotes: [],
          exposes: [],
        };
      }

      // Why: errorLoadRemote returns the module object directly (not a factory) —
      // the runtime passes it straight to the caller via `return failOver`.
      // Each dummy must match the exported contract of the real module so the
      // consumer can destructure `{ default }` and call it without crashing.
      if (args.id.endsWith('/create-app-card')) {
        return {
          default: async () => ({ name: 'offline', Component: null, props: {} }),
        };
      }

      if (args.id.endsWith('/patch-on-navigation')) {
        return {
          default: async (_args: unknown, _appArgs: unknown) => { },
        };
      }

      return { default: () => null };
    },
  };
};

export default fallbackPlugin;