/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
    },
};

module.exports = nextConfig;
