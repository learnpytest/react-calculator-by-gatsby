/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `react-calculator-by-gatsby`,
    siteUrl: `https://github.com/learnpytest/-react-calculator-by-gatsby`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `react-calculator-by-gatsby`,
        short_name: `rc-calculator`,
        start_url: `/`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        icons: [
          {
            src: `/favicons/favicon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/favicon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
  ],
};
