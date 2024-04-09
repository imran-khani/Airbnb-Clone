/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:'lh3.googleusercontent.com',
                protocol:'https',
            },
            {
                hostname:'res.cloudinary.com',
                protocol:'https',
            }
        ]
    }
};

export default nextConfig;
