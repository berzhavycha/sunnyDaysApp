import { serverValidatedEnv } from './serverEnvValidation.mjs';
import { clientValidatedEnv } from './clientEnvValidation.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/sign-in',
                permanent: true,
            },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
            },
            {
                protocol: 'https',
                hostname: 'png.pngtree.com',
            },
        ],
    },
};

export default nextConfig;
