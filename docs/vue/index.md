### VUE的征程


- [vue双向绑定](/vue/two-bind.html)
- [axios请求类封装](/vue/request.html)
- TODO

#### 项目结构
```
|--- public                    //静态资源
    |___ images                //图片 
    |___ index                 //入口文件
|--- src                       //源码
    |___ api                   //api统一管理
    |___ asset                 //静态资源|css
    |___ components            //全局组件(无状态组件)
    |___ layout                //layout布局，可设置多套布局
    |___ libs                  //封装的工具库
    |___ menu                  //菜单
        |___ header            //头部菜单
        |___ aside             //左侧菜单
    |___ mock                  //mock数据
    |___ plugin                //依赖集合
    |___ router                //路由集合
    |___ store                 //仓库
    |___ views                 //页面
        |___ bussiness         //业务代码
        |___ system            //基建代码
    |___ app.vue               //入口文件
    |___ main.js               //初始化界面配置
|--- env.development           //开发环境配置
|--- env.production            //生产环境配置
|--- package.json              //依赖配置表
|--- readme.md                 //markdown项目介绍
```




