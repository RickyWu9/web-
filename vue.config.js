// vue.config.js
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://8.130.173.37:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            }
        }
    },
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@components': resolve('src/components')
            }
        }
    },
}
