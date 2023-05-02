import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({
      globalAPI: true,
      languageWorkers: ['json', 'editorWorkerService'],
      customWorkers: [{ label: 'graphql', entry: 'monaco-graphql/esm/graphql.worker' }],
    }),
  ],
});
