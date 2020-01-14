// useLocal=true 使用本地开发环境
userLocal = true;

// vue.config.js
module.exports = {
    // outputDir: '../admin-server/src/main/resources/static/',
    productionSourceMap: false,
    css: {
        sourceMap: false
    },
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.ts',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: '数据流量平台'
        }
    },
    devServer: {
        port: 3001,
        proxy: {
            '/api': {
                target: userLocal ? 'http://127.0.0.1:3000' : 'https://zabbix-codes.dev.eveus.com'
            }
        }
    },
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        },
        moment: {
            locales: [
                ''
            ]
        }
    }
};
