/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_URL_BE: process.env.NEXT_PUBLIC_URL_BE,
    NEXT_PUBLIC_TOKEN_DEV: process.env.NEXT_PUBLIC_TOKEN_DEV,
  },
  images: {
    remotePatterns: ["res.cloudinary.com", "localhost", "127.0.0.1"],
    remotePatterns: [
      {
        protocol: "http", // Chắc chắn sử dụng HTTP, vì Strapi đang chạy trên HTTP (local)
        hostname: "localhost", // Địa chỉ hostname của Strapi
        port: "1337", // Port mà Strapi đang chạy
        pathname: "/uploads/**", // Đảm bảo các đường dẫn hình ảnh trong Strapi sẽ được nhận diện
      },
      {
        protocol: "http", // Chắc chắn sử dụng HTTP, vì Strapi đang chạy trên HTTP (local)
        hostname: "127.0.0.1", // Địa chỉ hostname của Strapi
        port: "1337", // Port mà Strapi đang chạy
        pathname: "/uploads/**", // Đảm bảo các đường dẫn hình ảnh trong Strapi sẽ được nhận diện
      },
      {
        protocol: "https", // Chắc chắn sử dụng HTTP, vì Strapi đang chạy trên HTTP (local)
        hostname: "admin.bethany.co.nz", // Địa chỉ hostname của Strapi
        pathname: "/uploads/**", // Đảm bảo các đường dẫn hình ảnh trong Strapi sẽ được nhận diện
      },
    ],
  },
};

module.exports = nextConfig;
