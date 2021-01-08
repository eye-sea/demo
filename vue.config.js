
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    //map文件
    productionSourceMap:true,
    // 删除预加载
    chainWebpack:(config)=>{
    config.plugins.delete('prefetch');
  }
}



// const path = require('path')
// module.exports = {
//     pluginOptions: {
//         "style-resources-loader": {
//             preProcessor: "less",
//             patterns: [path.resolve(__dirname,"./src/assets/less/style.less")]
//         }
//     }
// }

// module.exports = {
//     css: {
//       loaderOptions: {
//         less: {
//           globalVars: {
//             hack: `true; @import './src/assets/less/style.less';`
//           }
//         }
//       }
//     }
//   };