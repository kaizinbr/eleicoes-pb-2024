/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "divulgacandcontas.tse.jus.br",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
