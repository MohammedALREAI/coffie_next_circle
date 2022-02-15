module.exports = {
  images: {
    domains: ["images.unsplash.com"],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  publicRuntimeConfig :{
AIRTABLE_BASE_KEY:process.env.AIRTABLE_BASE_KEY,
AIRTABLE_API_KEY:process.env.AIRTABLE_API_KEY,
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY:process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
NEXT_PUBLIC_FOURSQUARE_API_KEY_CLIENT:process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY_CLIENT,
NEXT_PUBLIC_FOURSQUARE_API_KEY_SECRET:process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY_SECRET
},
  swcMinify: true

};
