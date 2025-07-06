module.exports = {
  apps: [
    {
      name: "scai_official_website",
      script: ".output/server/index.mjs",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
