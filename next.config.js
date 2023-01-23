/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: "default",
		domains: [
			"res.cloudinary.com",
			"localhost",
			"lh3.googleusercontent.com",
			"165.22.180.40",
			"api.vibrantgems.com",
		],
	},
};

module.exports = nextConfig;
