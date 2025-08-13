import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        plugin(),
        tailwindcss()
    ],
    server: {
        port: 56172,
    },

    resolve: {
        alias: {
            react: path.resolve(__dirname, 'node_modules/react'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
            'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime')
        }
    }
})
