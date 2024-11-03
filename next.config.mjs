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
            {
                protocol: 'https',
                hostname: 'fw936kyzneis9uos.public.blob.vercel-storage.com',
                port: ''
            }
        ]
    }
};

export default nextConfig;
