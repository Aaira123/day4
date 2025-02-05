/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental:{
    //         appDir:true,
    // },
    images:{
       // domains:['cdn.sanity.io'],
       remotePatterns:[
        {
            hostname:"cdn.sanity.io",
            protocol:"https",
        },
       ],
    },
};

export default nextConfig;
