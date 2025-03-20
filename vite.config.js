import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const isDevBuild = mode === 'development';
    const env = loadEnv(mode, process.cwd(), '');

    const allowedDomains = (() => {
        try {
            console.log(env.VITE_ALLOWED_DOMAINS);
            return JSON.parse(env.VITE_ALLOWED_DOMAINS || '[]');
        } catch (error) {
            console.error('Error parsing VITE_ALLOWED_DOMAINS:', error);
            return [];
        }
    })();

    return {
        plugins: [
            // 'jsx'를 처리하고 fast refresh를 지원하기 위한 플러그인
            react({
                fastRefresh: true,
            }),
            eslint({
                failOnError: false,
                emitError: true,
                emitWarning: true,
                fix: true,
                cache: true,
                include: ['./src/**/*.js', './src/**/*.jsx'],
            }),
            checker({
                eslint: {
                    lintCommand: 'eslint "./src/**/*.{js,jsx}"',
                    dev: {
                        logLevel: ['error', 'warning'],
                    },
                },
            }),
            vanillaExtractPlugin(),
        ],
        // 최신 브라우저에서 모듈 기반으로 워커를 사용할 수 있음
        worker: {
            format: 'es',
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.css.js'],
        },
        build: {
            minify: !isDevBuild,
            sourcemap: isDevBuild,
            // vite는 내부적으로 rollup을 사용하여 번들링 함
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 개발 모드에서도 청크 분할 적용
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                        dataManagement: ['@tanstack/react-query', 'axios', 'zustand'],
                        dataManagementDevTools: ['@tanstack/react-query-devtools'],
                    },
                },
            },
        },
        esbuild: {
            // production build 시 불필요한 코드 제거
            drop: isDevBuild ? [] : ['console', 'debugger'],
            minifyIdentifiers: !isDevBuild,
            minifySyntax: !isDevBuild,
        },
        server: {
            open: true,
            hmr: {
                overlay: true,
            },
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify(isDevBuild ? 'development' : 'production'),
            __ALLOWED_DOMAINS__: JSON.stringify(allowedDomains),
        },
        optimizeDeps: {
            include: ['@vanilla-extract/css'],
        },
    };
});
