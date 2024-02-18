/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.nike.com"
            }
        ]
    },
    output: "standalone",
    logging: {
        fetches:{
            fullUrl: true,
        }
    }
};

export default nextConfig;
