/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/tour",
        permanent: false,
      },
      {
        source: "/",
        destination: "/dashboard/tour",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
