module.exports = {
  base: './',
  title: 'Hello VueDialogX',
  description: '好用的iOS风格弹窗组件',
  themeConfig: {
    search: false,
  },
  head: [
    ['script', {
      src: 'https://unpkg.com/vue@2.6.10/dist/vue.js'
    }],
    ['script', {
      src: 'https://unpkg.com/vue-dialog-x/dist/vue-dialog-x.window.js'
    }],
    ['script', {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    }]
  ],
  dest: 'docs/vuepress/',
  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-145663310-1'
    }]
  ],
  themeConfig: {
    repo: 'a62527776a/vue-dialog-x',
    repoLabel: 'Github',
    sidebarDepth: 2,
    sidebar: [
      ['/', '介绍'],
      ['/getting-started', 'QuickStart'],
      ['/basic', '基础使用'],
      ['/alert', 'Alert'],
      ['/confirm', 'Confirm'],
      ['/prompt', 'Prompt'],
      ['/actions', 'Actions'],
      ['/dialog', 'Dialog'],
      ['/vnode', '定制自定义复杂布局'],
      ['/custom', '引入自定义css']
    ]
  }
}