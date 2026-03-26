import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getInstance } from '@module-federation/enhanced/runtime'
const mfInstance = getInstance()

mfInstance?.registerRemotes([
  {
    entry: 'http://localhost:3001/mf-manifest.json',
    name: 'mf_provider'
  }
])

const config = await mfInstance?.loadRemote('mf_provider/config') as any

config.setGlobalConfig({
  text: 'good singleton'
})

const { default : Provider } = await mfInstance?.loadRemote('mf_provider') as any

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App Provider={Provider}/>
    </React.StrictMode>,
  );
}
