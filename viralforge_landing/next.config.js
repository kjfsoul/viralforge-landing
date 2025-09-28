/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    // Stop Next from guessing a higher workspace root
    outputFileTracingRoot: __dirname,
  },
  webpack(config) {
    // Make "@/..." resolve to the project root
    config.resolve.alias['@'] = __dirname;
    return config;
  },
};
