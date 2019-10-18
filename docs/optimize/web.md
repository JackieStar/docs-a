# 后台管理系统打包优化

本次主要来说说这个打包优化的问题。一个vue项目从开发到上线必须得经历打包过程，一个项目的打包优化与否都决定了你这个项目的运行速度以及用户体验。本次主要是针对vue.config,js的配置进行优化

## 开发环境与生产环境

### 开发环境

在项目根目录下新建.env.development文件表明是开发环境

```js
  VUE_APP_CURRENTMODE ="development" //当前的环境
  VUE_APP_LOGOUT_URL="http://localhost:3000/" //开发环境的地址
```

### 生产环境

在项目根目录下新建.env.production文件表明是生产环境。

```js
 VUE_APP_CURRENTMODE ="development" //当前的环境
 VUE_APP_LOGOUT_URL="xxx" //生产环境的地址
```

### 环境运用

那么接下来我们怎么用它呢？这里不得不说一下的是package.json里面的两个命令serve,build,其实对应的是全命令是vue-cli-service serve --mode development,vue-cli-service build --mode production,如果你想要在构建命令中使用开发环境变量，那么可以加入

```js
 "dev-build": "vue-cli-service build --mode development"
```

接下来在vue.config.js运用它。

```js
  config.plugin('define').tap(args => {
           args[0]['process.env'].VUE_APP_LOGOUT_URL = JSON.stringify(process.env.VUE_APP_LOGOUT_URL)
           console.log(args[0])
           return args;
     });
```
## 懒加载
由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载

import.development.js
```js
module.exports = file => require('@/views/' + file).default
```
import.production.js
```js
module.exports = file => () => import('@/views/' + file)
```
### 引用
```js
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

 {
    path: '/home',
    name: 'home',
    component: _import('home/index')
  }
```


## 分包（code splitting）

首先思考，我们引入的第三方包与我们的业务代码一起打包会产生什么问题？
顾名思义，我们的业务代码变动比较频繁,而我们引入的第三方包基本上不会变动。浏览器会有缓存，没有变动的文件会直接从缓存中读取，这也间接的优化了网站的访问速速。
接下来配置vue.config.js,

### 分割第三方库

```js
 //代码分割
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroup:{
        //vue2-editor单独打一个包
          vueEdior: {
            name: 'vueEdior',
            test: /[\\/]node_modules[\\/]vue2-editor[\\/]/,
            priority: 10  // 优先级要大于 vendors 不然会被打包进 vendors
          },
          //其余的第三方包打进vendor
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          }
      }
    })
```

### 分割共用文件

组件是vue项目的重要组成部分。相当一部分组件都可以公用，在不同的文件中引入，因此我们可以将这部分公用的组件直接分割出来。

```js
 config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroup:{
          vueEdior: {
            name: 'vueEdior',
            test: /[\\/]node_modules[\\/]vue2-editor[\\/]/,
            priority: 10  // 优先级要大于 vendors 不然会被打包进 vendors
          },
          public: {
            name: 'public',
            test: resolve('src/components'),
            minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
            minChunks: 2, // 最小公用次数
            priority: 5, // 优先级
            reuseExistingChunk: true // 公共模块必开启
          },
          //其余的第三方包打进vendor
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          }
      }
    })
```
打包完后会发现dist/static/js,多了一个vueEditor和public文件，这就表明分割完成。


## map文件处理和别名设置(alias)

### map文件

我们可以进一步优化，打包默认生成map文件,从而导致包的体积过大，这时我们需要设定一个属性来关闭它。

```js
productionSourceMap: false
```

### 别名设置

alias运用的好处在于不用一级级的去找，而是直接锁定位置，从而减少文件搜索时间。

```js
   //设置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api/api'))//接口地址
      .set('@assets', resolve('src/assets'))
```

## gzip压缩与去console插件

如果上面的方式都编写了，文件依旧过大，这个时候不得不考虑代码压缩和去掉console插件了，可以说为了优化项目，“无所不用其极”。

### gzip压缩

首先安装开始安装

```js
 cnpm install compression-webpack-plugin --save-dev
```
然后在configureWebpack里面配置它

```js
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$',
        ),
        threshold: 10240,
        minRatio: 0.8,
      }),
```
值得注意的是gzip压缩文件需要后端来配合支持，如果后端没有支持那么项目加载的依旧是没有压缩的文件。

### 去console插件

首先安装

```js
    cnpm install uglifyjs-webpack-plugin --save-dev
```

然后在configureWebpack里面配置它

```js
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
```

## cdn引入
有的同学说后端没有支持gzip压缩加载，那怎么办?那只有凉拌咯~~~。
这里给大家介绍一个cdn引入的方式，有的第三方插件太大，导致单独分包后还是挺大的，这个时候可以考虑用cdn的方式引入文件。


### 无插件引入cdn

首先我们不让webpack打包用cdn引入的文件

```js
    //对一些不经常改动的库，可以通过cdn引入，webpack不对他们打包
    let externals = {
      'vue': 'Vue',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'echarts': 'echarts',
      'vue2-editor': 'VueEditor'
    }
```

然后配置cdn

```js
    const cdn = {
      css: [
        //element-ui css
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      js: [
        //vue
        'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
        //axios
        'http://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
        //vuex
        'https://unpkg.com/vuex@3.1.0/dist/vuex.min.js',
        //vue-router
        'https://unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
        //element
        'https://unpkg.com/element-ui@2.7.2/lib/index.js',
        //echarts
        'https://cdn.jsdelivr.net/npm/echarts@4.2.1/dist/echarts.min.js',
        //vue2-editor
        "https://unpkg.com/vue2-editor@2.6.6/dist/vue2-editor.js"
      ]
    }
```

接下来在chainWebpack配置

```js
    process.env.VUE_APP_CURRENTMODE === 'production') {
      config.externals(externals)//忽略打包
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args
        })
    }
```
这里需要解释的是config.plugin('html')其实是运用了html-webpack-plugin插件在其实例化的options挂载cdn对象，然后通过ejs模板语法，读取相关cdn。
紧接着我们需要在public/index.html中读取相关cdn

```js
    <% if (process.env.VUE_APP_CURRENTMODE === 'production') { %>
      <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
        <link rel="stylesheet" href="<%=css%>" as="style">
      <% } %>
      <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
        <script src="<%=js%>"></script>
      <% } %>
    <% } %>
```
至此cdn引入完成

### 插件引入cdn

由于手动引入cdn太过麻烦，而且担心版本变化，每次都需要手动去更改，所以为了更好的开发体验，引入了自动匹配cdn插件，webpack-cdn-plugin。接下来开始安装

```js
    cnpm install webpack-cdn-plugin --save
```

实例化插件

```js
    const cdnPlugin = require('webpack-cdn-plugin')
```

接下来开始在configureWebpack中引用

```js
    new cdnPlugin({
        modules: [
          { name: 'vue', var: 'Vue', path: 'dist/vue.min.js' },
          { name: 'axios', var: 'axios', path: 'dist/axios.min.js' },
          { name: 'vuex', var: 'Vuex', path: 'dist/vuex.min.js' },
          { name: 'element-ui', var: 'ELEMENT', path: 'lib/index.js', style: 'lib/theme-chalk/index.css' },
          { name: 'echarts', var: 'echarts', path: 'dist/echarts.min.js' },
          { name: 'vue2-editor', var: 'VueEditor', path: 'dist/vue2-editor.js' },
          { name: 'vue-router', var: 'VueRouter', path: 'dist/vue-router.min.js' },
        ],
        publicPath: '/node_modules'
      })
```

- name:插件名
- var :项目中实例化的名字
- path：路径名称
- style:css路径名称
更多了解请参考官方文档。
总体来说引入第三方cdn确实能带来不错的效果，但是有可能不稳定，因此建议大家在实际开发中自己去申请一个专属的cdn域名，将网站所要用到库直接上传上去。

