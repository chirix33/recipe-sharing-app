/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: ''
            },
        ]
    }
};

export default nextConfig;
