import { readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { lingui } from '@lingui/vite-plugin';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
    lingui(),
    manualChunksPlugin(),
    reactVirtualized(),
    EnvironmentPlugin('all', { prefix: 'REACT_APP_' }),
    EnvironmentPlugin('all', { prefix: 'NODE_' }),
  ],
  resolve: {
    alias: {
      analysis: resolve(__dirname, '/src/analysis'),
      common: resolve(__dirname, '/src/common'),
      game: resolve(__dirname, '/src/game'),
      interface: resolve(__dirname, '/src/interface'),
      localization: resolve(__dirname, '/src/localization'),
      parser: resolve(__dirname, '/src/parser'),
      CONTRIBUTORS: resolve(__dirname, '/src/CONTRIBUTORS'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});

const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
export function reactVirtualized() {
  return {
    name: 'my:react-virtualized',
    configResolved() {
      const file = require
        .resolve('react-virtualized')
        .replace(
          join('dist', 'commonjs', 'index.js'),
          join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
        );
      const code = readFileSync(file, 'utf-8');
      const modified = code.replace(WRONG_CODE, '');
      writeFileSync(file, modified);
    },
  };
}