module.exports = {
    title: 'forever~恒星',
    description: 'forever～恒星 的个人学习博客',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}] // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        nav: [
            {text: '前端规范', link: '/JavaScript/JavaScript'},
            {text: 'JS基础',
                items: [
                    {text: '数据类型', link: '/JavaScript/const'}
                ]
            },
            {text: 'vue', link: '/vue/index'},
            {text: 'es6', link: '/es6/index'},
            {text: 'koa', link: '/koa/index'},
            {text: 'npm', link: '/npm/index'},
            {text: 'TypeScript', link: '/typescript/index'},
            {text: '前端优化篇',link: '/optimize/web'},
            {text: 'issue', link: '/issue/index'},
            {
                text: 'markdown',
                items: [
                    {text: '学前三问', link: '/markdown/index'},
                    {text: '基本语法', link: '/markdown/base'}
                ]
            },
        ],
        sidebar: {
            '/JavaScript/': [
                '/JavaScript/JavaScript'
            ],
            '/optimize/': [
                '/optimize/web'
            ],
            '/es6': [
                '/es6/array',
                '/es6/async-await'
            ],
            '/vue': [
                '/vue/two-bind',
                '/vue/request'
            ],
            '/koa': [
                '/koa/hotboom',
                '/koa/token-introduce',
                '/koa/token'
            ],

            '/issue': [
                // '/issue/index',
                '/issue/download'
            ]
        }
    }
}
