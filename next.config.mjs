const KEYSTONE_URL = process.env.KEYSTONE_URL || "http://localhost:3001"
const ANALYTICS_URL = process.env.NEXT_PUBLIC_UMAMI_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	// serverExternalPackages: ['graphql'],
	experimental: {
		// without this, 'Error: Expected Upload to be a GraphQL nullable type.'
		serverComponentsExternalPackages: ["graphql"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	// async redirects() {
	//   return [
	//     {
	//       source: '/',
	//       destination: '/home',
	//       permanent: true,
	//     },
	//   ];
	// },
	async rewrites() {
		return {
			beforeFiles: [],
			fallback: [
				{
					source: "/admin",
					destination: `${KEYSTONE_URL}/admin`,
				},
				{
					source: "/admin/:admin*",
					destination: `${KEYSTONE_URL}/admin/:admin*`,
				},
				...(ANALYTICS_URL
					? {
							source: "/stts/:match*",
							destination: ANALYTICS_URL,
					  }
					: {}),
			],
			afterFiles: [],
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3001",
				pathname: "/assets/**",
			},
			{
				protocol: "http",
				hostname: "frostwifi.lan",
				port: "3001",
				pathname: "/assets/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/assets/**",
			},
			{
				protocol: "https",
				hostname: "cdn.dribbble.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/dh5vxixzn/**",
			},
			{
				protocol: "https",
				hostname: "i.pinimg.com",
				port: "",
				pathname: "/originals/**",
			},
			{
				protocol: "https",
				hostname: "cdn.pixabay.com",
				port: "",
				pathname: "/photo/**",
			},
			{
				protocol: "https",
				hostname: "cloutdrive.williamusic.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "media.giphy.com",
				port: "",
				pathname: "/media/**",
			},
			{
				protocol: "https",
				hostname: "i.giphy.com",
				port: "",
				pathname: "/media/**",
			},
			{
				protocol: "https",
				hostname: "assets.nintendo.com",
				port: "",
				pathname: "/image/**",
			},
			{
				protocol: "https",
				hostname: "api.dicebear.com",
				port: "",
				pathname: "/9.x/**",
			},
		],
	},
}

export default nextConfig
