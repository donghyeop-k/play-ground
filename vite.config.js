import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            react({
                fastRefresh: true,
            }),
            eslint({
                failOnError: false,
                fix: true,
                cache: true,
                include: ['./src/**/*.js', './src/**/*.jsx'],
            }),
        ],
    };
});
