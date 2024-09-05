module.exports = {
  apps: [
    {
      name: 'my-portfolio-server',
      script: './api/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      }
    },
    {
      name: 'my-portfolio-client',
      script: 'npm',
      log_type: 'error',
      args: 'run serve-client',  // Use the NPM script
      exec_mode: 'fork',         // Use fork mode to prevent multiple instances
      instances: 1,              // Only one instance of the client
      watch: false,              // Prevent auto-restarting
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
    }
  ]
};
