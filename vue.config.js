module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/':{
                target:'http://39.106.193.59',
                changeOrigin:true,
                pathRewrite:{
                    '/':''
                },
                // auth:localStorage.getItem('token')
            }
        }
    }
}