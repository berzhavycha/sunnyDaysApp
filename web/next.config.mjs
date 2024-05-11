// Import validated env for server and client to enable its validation
import { serverValidatedEnv } from './serverEnvValidation.mjs';
import { clientValidatedEnv } from './clientEnvValidation.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
