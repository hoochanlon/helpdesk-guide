// .vuepress/config.js

module.exports = {
    title: '《网络、域控与信息安全》',
    description: '。',
    base: '/network-ad-security-guide/', //项目文件夹设置目录
    head:[
      ['link', {rel:'icon', href:'favicon.ico'}]
    ],
    plugins: [
      // https://vuepress.github.io/zh/plugins 插件下载
      ['@vuepress/plugin-back-to-top'],//安装不了插件,建议非全局安装vue
      ['@vuepress/google-analytics',
      {
        'ga': 'UA-157837686-3' // UA-00000000-0
      }],
      // ['copyright', {
      //   noSelect: false,
      //   authorName:{
      //     "zh-CN": "hoochanlon",
      //     "en-US": "hoochanlon"
      //   }
      // }]
    ],
    themeConfig: {
      repo: 'https://github.com/hoochanlon',
    //   search: false,
      search: true,
    // algolia: {
    //     appId: 'WTFUBXAEBO',
    //     apiKey: '82b4c29f994578b8ec6566109fc09d71',
    //     indexName: 'network-ad-security-guide',
    //   },
      nav: [
        // { text: '跳转首页', link: '/' },
        { text: 'CC-BY-NC 4.0', link: 'http://creativecommons.org/licenses/by-nc/4.0/' },
      ],
      editLinks: false,
      // 自定义编辑链接的文本。默认是 "Edit this page"
      editLinkText: '帮助我们改善内容',
        sidebar: [

              {
                title: '网络',   // 必要的
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                  ['/ad/fuwuqi_richang_guanli','服务器日常管理']
                ]
              }
            ]
          }
  }