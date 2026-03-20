// Why: type:'global' requires window[globalName] to exist after script execution —
// without it the runtime throws RUNTIME-001 (Failed to get remoteEntry exports).
// container.get() throws intentionally so the runtime triggers errorLoadRemote({ lifecycle:'onLoad' }),
// which is where the per-module dummy implementations live in the fallback plugin.
// https://module-federation.io/guide/troubleshooting/runtime#runtime-001
(function () {
  globalThis['offline-remote'] = {
    init: function () {},
    get: function (module) {
      throw new Error('[offline-remote] Remote is unavailable: ' + module);
    },
  };
})();
