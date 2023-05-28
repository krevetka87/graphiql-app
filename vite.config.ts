import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    monacoEditorPlugin({
      globalAPI: true,
      languageWorkers: ['json', 'editorWorkerService'],
      customWorkers: [{ label: 'graphql', entry: 'monaco-graphql/esm/graphql.worker' }],
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
