/** @type {import('next').NextConfig} */
const nextConfig = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
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
