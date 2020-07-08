module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/':{
                target:'http://182.92.96.157',
                changeOrigin:true,
                pathRewrite:{
                    '/':''
                },
                // auth:localStorage.getItem('token')
            }
        }
    }
}