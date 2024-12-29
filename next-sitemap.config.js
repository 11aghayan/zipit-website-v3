/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://zipit.am",
  generateRobotsTxt: true, // Automatically generates robots.txt
  exclude: ["/api/*", "*/cart/*", "*/checkout/*"],
};
