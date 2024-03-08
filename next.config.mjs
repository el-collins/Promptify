// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     serverComponentsExternalPackages: ["mongoose"],
//     // appDir: true,
//   },
//   images: {
//     domains: ["lh3.googleusercontent.com"],
//   },
//   webpack(config) {
//     config.experiments = {
//       ...config.experiments,
//       topLevelAwait: true,
//     };
//     return config;
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com"],
//   },
// };

// export default nextConfig;
