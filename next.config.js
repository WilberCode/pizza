/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
       // remotePatterns:[ 'lh3.googleusercontent.com','firebasestorage.googleapis.com' ]
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: '',
              pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
              pathname: '/**',
            },
          ],
    },  
}

module.exports = nextConfig
