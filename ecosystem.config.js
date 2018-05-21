module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: 'REST',
            script: './app/bin/server.js',
            env: { NODE_ENV: 'development', watch: './app' },
            env_stage: { NODE_ENV: 'stage', watch: false },
            env_production: { NODE_ENV: 'production', watch: false },
        },
        {
            name: 'SOCKET',
            script: './app/bin/socket.js',
            env: { NODE_ENV: 'development', watch: './app' },
            env_stage: { NODE_ENV: 'stage', watch: false },
            env_production: { NODE_ENV: 'production', watch: false },
        },
        {
            name: 'QUEUE',
            script: './app/bin/kue-server.js',
            env: { NODE_ENV: 'development', watch: './app' },
            env_stage: { NODE_ENV: 'stage', watch: false },
            env_production: { NODE_ENV: 'production', watch: false },
        },
        {
            name: 'QUEUE_WORKER',
            script: './app/bin/kue-worker.js',
            env: { NODE_ENV: 'development', watch: './app' },
            env_stage: { NODE_ENV: 'stage', watch: false },
            env_production: { NODE_ENV: 'production', watch: false },
        },
    ],
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
    },
};
