module.exports = {
    apps : [{
      name      : 'Prototype Server',
      script    : 'dist/index.js',
      instances : 1,
      autorestart : true,
      watch     : false,
      max_memory_restart  : '1G',
      env       : {
        NODE_ENV: 'development'
      },
      env_staging       : {
        NODE_ENV: 'staging'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
};