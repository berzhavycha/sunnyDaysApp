// Importing validated environment variables for server and client configurations
import { serverValidatedEnv } from './serverEnvValidation.mjs';
import { clientValidatedEnv } from './clientEnvValidation.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuring cache duration for stale data on weather-forecast pages
    // Disabling Data Cache using headers() function necessitates setting Router Cache duration
    experimental: {
        staleTimes: {
            dynamic: clientValidatedEnv.NEXT_PUBLIC_DYNAMIC_CACHE_SECONDS_TIME,
            static: clientValidatedEnv.NEXT_PUBLIC_STATIC_CACHE_SECONDS_TIME,
        }
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
