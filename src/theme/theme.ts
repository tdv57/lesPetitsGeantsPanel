import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
    globalCss: {
        'html, body': {
            bg: 'bg.canvas',
            color: 'fg.default',
            margin: 0,
            padding: 0,
            minHeight: '100dvh',
        },
        '#root': {
            minHeight: '100dvh',
        },
    },
    theme: {
        tokens: {
            fonts: {
                heading: { value: "'Baloo 2', sans-serif" },
                body: { value: "'Baloo 2', sans-serif" },
            },
            colors: {
                brand: {
                    50: { value: '#eef2ff' },
                    100: { value: '#e0e7ff' },
                    200: { value: '#c7d2fe' },
                    300: { value: '#a5b4fc' },
                    400: { value: '#818cf8' },
                    500: { value: '#6366f1' },
                    600: { value: '#4f46e5' },
                    700: { value: '#4338ca' },
                    800: { value: '#3730a3' },
                    900: { value: '#312e81' },
                },
            },
        },
        semanticTokens: {
            colors: {
                'bg.canvas': { value: '#0a0a0f' },
                'bg.surface': { value: '#131318' },
                'bg.surfaceHover': { value: '#1a1a22' },
                'border.subtle': { value: 'rgba(255,255,255,0.08)' },
                'fg.default': { value: 'rgba(255,255,255,0.92)' },
                'fg.muted': { value: 'rgba(255,255,255,0.60)' },
                'fg.subtle': { value: 'rgba(255,255,255,0.38)' },
                'accent.default': { value: '{colors.brand.500}' },
                'accent.emphasized': { value: '{colors.brand.400}' },
            },
        },
    },
});

export const system = createSystem(defaultConfig, config);
