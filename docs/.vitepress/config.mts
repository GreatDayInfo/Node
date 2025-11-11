import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    // base: "/", // 设置站点根路径
    lang: "zh-CN",
    metaChunk: true,
    lastUpdated: true, // 使用 Git 获取每个页面的最后更新时间戳
    markdown: {
      lineNumbers: true, // 显示代码块行号
      image: {
        lazyLoading: true, // 开启懒加载图片
      },
      // 使用 `!!code` 防止转换
      codeTransformers: [
        {
          postprocess(code) {
            return code.replace(/\[\!\!code/g, "[!code");
          },
        },
      ],
    },
    sitemap: {
      hostname: "https://notes.sddegt.online",
    },
    title: "时代的二锅头",
    description:
      "时代的二锅头、锅头的家、后端、后端开发、sddegt、自学编程",
    head: [
      ["link", { rel: "icon", href: "/logo.ico" }],
      [
        "meta",
        {
          name: "keywords",
          content:
            "时代的二锅头、锅头的家、后端、后端开发、sddegt、自学编程",
        },
      ],
      [
        "meta",
        { name: "baidu-site-verification", content: "codeva-HRcMvYvHP8" },
      ],
      [
        "script",
        {},
        `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "ork2q0e007");`,
      ],
      [
        "script",
        {},
        `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7d6014f90608f65e2463d1bde602b37a";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`,
      ],
    ],
    themeConfig: {
      logo: "/logo.png",
      darkModeSwitchLabel: "暗色模式",
      sidebarMenuLabel: "目录",
      returnToTopLabel: "返回顶部",
      outline: {
        // level: [2, 4], // 显示2-4级标题
        level: "deep", // 显示2-6级标题
        label: "当前页大纲", // 文字显示
      },
      search: {
        provider: "local",
        options: {
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              noResultsText: "无法找到相关结果",
              resetButtonTitle: "清除查询条件",
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
              },
            },
          },
        },
      },
      //上次更新时间
      lastUpdated: {
        text: "最后更新于",
        formatOptions: {
          dateStyle: "short", // 可选值full、long、medium、short
          timeStyle: "medium", // 可选值full、long、medium、short
        },
      },
      docFooter: {
        prev: "上一页", //自定义上下页名
        next: "下一页",
      },
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        {
          text: "主页",
          link: "https://sddegt.online/",
        },
        {
          text: "前端技术",
          items: [
            { text: "Vue3", link: "/notes/front_end/Vue3.md" },
            { text: "React+", link: "/notes/front_end/React+.md" },
            { text: "NuxtJS", link: "/notes/front_end/NuxtJS.md" },
            { text: "NextJS", link: "/notes/front_end/NextJS.md" },
            { text: "NodeJS", link: "/notes/front_end/NodeJS.md" },
            { text: "H5C3补充", link: "/notes/front_end/H5C3补充.md" },
            { text: "ECMAScript", link: "/notes/front_end/ECMAScript.md" },
            { text: "TypeScript", link: "/notes/front_end/TypeScript.md" },
            { text: "微前端", link: "/notes/front_end/微前端.md" },
            { text: "前后端通讯", link: "/notes/front_end/前后端通讯.md" },
            {
              text: "其他",
              items: [
                { text: "fabric", link: "/notes/front_end/JS周边库/fabric.md" },
                { text: "生态周边", link: "/notes/front_end/JS周边库.md" },
                { text: "Vitest测试", link: "/notes/front_end/测试.md" },
                { text: "构建工具", link: "/notes/front_end/构建工具.md" },
                { text: "JS数据结构", link: "/notes/front_end/js数据结构与算法.md" },
                { text: "JS设计模式", link: "/notes/front_end/JS设计模式.md" },
                { text: "其他概念", link: "/notes/front_end/其他概念.md" },
              ],
            },
            {
              text: "过去式",
              items: [
                { text: "React Class", link: "/notes/front_end/ReactClass.md" },
                { text: "Vue2", link: "/notes/front_end/Vue2.md" },
                { text: "微信小程序", link: "/notes/front_end/小程序/微信小程序.md", },
                { text: "Uniapp", link: "/notes/front_end/小程序/uniapp.md" },
              ]
            }
          ],
        },
        {
           text: "后端技术",
            items: [
            { text: "C#", 
              items: [
                { text: "string", link: "/notes/back_end/string常用方法.md" },
              ]
             }
            ]
        },
        {
          text: "其它技术",
          items: [
            { text: "Git", link: "/notes/Git.md" },
            { text: "Docker", link: "/notes/Docker.md" },
            { text: "Linux", link: "/notes/Linux.md" },
            { text: "计算机网络", link: "/notes/embedded/计算机网络.md" },
            { text: "Blender建模", link: "/notes/Blender.md" },
            { text: "网络安全", link: "/notes/网络安全.md" },
            { text: "工具资源", link: "/notes/工具资源.md" },
            { text: "其他概念", link: "/notes/其他概念.md" },
            {
              text: "数据库",
              items: [
                { text: "MySQL", link: "/notes/database/MySQL.md" },
                { text: "MongoDB", link: "/notes/database/MongoDB.md" },
              ],
            },
          ],
        }
      ],

      sidebar: {
        "/notes/front_end/": [
          { text: "Vue3", link: "/notes/front_end/Vue3.md" },
          { text: "React+", link: "/notes/front_end/React+.md" },
          { text: "NuxtJS", link: "/notes/front_end/NuxtJS.md" },
          { text: "NextJS", link: "/notes/front_end/NextJS.md" },
          { text: "NodeJS", link: "/notes/front_end/NodeJS.md" },
          { text: "H5C3补充", link: "/notes/front_end/H5C3补充.md" },
          { text: "ECMAScript", link: "/notes/front_end/ECMAScript.md" },
          { text: "TypeScript", link: "/notes/front_end/TypeScript.md" },
          { text: "微前端", link: "/notes/front_end/微前端.md" },
          { text: "前后端通讯", link: "/notes/front_end/前后端通讯.md" },
          {
            text: "JS周边",
            collapsed: true,
            items: [
              { text: "fabric", link: "/notes/front_end/JS周边库/fabric.md" },
              { text: "生态周边", link: "/notes/front_end/JS周边库.md" },
              { text: "Vitest测试", link: "/notes/front_end/测试.md" },
              { text: "构建工具", link: "/notes/front_end/构建工具.md" },
              { text: "JS数据结构", link: "/notes/front_end/js数据结构与算法.md" },
              { text: "JS设计模式", link: "/notes/front_end/JS设计模式.md" },
              { text: "其他概念", link: "/notes/front_end/其他概念.md" },
            ],
          },
          {
            text: "过去式",
            collapsed: true,
            items: [
              { text: "React Class", link: "/notes/front_end/ReactClass.md" },
              { text: "Vue2", link: "/notes/front_end/Vue2.md" },
              { text: "微信小程序", link: "/notes/front_end/小程序/微信小程序.md", },
              { text: "Uniapp", link: "/notes/front_end/小程序/uniapp.md" },
              { text: "有赞组件", link: "/notes/front_end/小程序/有赞组件开发.md", },
              { text: "饿了么组件", link: "/notes/front_end/小程序/饿了么组件开发.md", },
            ]
          }
        ],
          "/notes/back_end/": [
          {
            text: "C#",
            items: [
              { text: "string", link: "/notes/back_end/string常用方法.md" },
            ],
          },
        ],
        "/notes/": [
          { text: "Git", link: "/notes/Git.md" },
          { text: "Docker", link: "/notes/Docker.md" },
          { text: "Linux", link: "/notes/Linux.md" },
          { text: "计算机网络", link: "/notes/embedded/计算机网络.md" },
          { text: "Blender建模", link: "/notes/Blender.md" },
          { text: "网络安全", link: "/notes/网络安全.md" },
          { text: "工具资源", link: "/notes/工具资源.md" },
          { text: "其他概念", link: "/notes/其他概念.md" },
          {
            text: "数据库",
            collapsed: false,
            items: [
              { text: "MySQL", link: "/notes/database/MySQL.md" },
              { text: "MongoDB", link: "/notes/database/MongoDB.md" },
            ],
          },
        ],
      },

      socialLinks: [
        {
          icon: {
            svg: '<svg t="1739770883917" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1455" width="200" height="200"><path d="M512 1024C229.2224 1024 0 794.7776 0 512S229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512z m259.1488-568.8832H480.4096a25.2928 25.2928 0 0 0-25.2928 25.2928l-0.0256 63.2064c0 13.952 11.3152 25.2928 25.2672 25.2928h177.024c13.9776 0 25.2928 11.3152 25.2928 25.2672v12.6464a75.8528 75.8528 0 0 1-75.8528 75.8528H366.592a25.2928 25.2928 0 0 1-25.2672-25.2928v-240.1792a75.8528 75.8528 0 0 1 75.8272-75.8528h353.9456a25.2928 25.2928 0 0 0 25.2672-25.2928l0.0768-63.2064a25.2928 25.2928 0 0 0-25.2672-25.2928H417.152a189.6192 189.6192 0 0 0-189.6192 189.6448v353.9456c0 13.9776 11.3152 25.2928 25.2928 25.2928h372.9408a170.6496 170.6496 0 0 0 170.6496-170.6496v-145.408a25.2928 25.2928 0 0 0-25.2928-25.2672z" fill="#C71D23" p-id="1456"></path></svg>',
          },
          link: "https://gitee.com/ErGuoTouPro",
          ariaLabel: "Gitee",
        },
      ],

      footer: {
        message: `Copyright © 2024-${new Date().getFullYear()}  锅头的家 `,
        copyright: `备案号：<a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2024037182号-1</a>`,
      },
    },
    pwa: {
      base: "/",
      scope: "/",
      outDir: ".vitepress/dist", // 输出目录
      registerType: "autoUpdate", // 注册类型为自动更新
      includeManifestIcons: false, // 不包含清单图标
      manifest: {
        name: "锅头的家", // 应用名称
        short_name: "锅头的家", // 应用的短名称
        description: "后端打工仔的成长日记", // 应用的描述
        start_url: "/", // 应用启动路径
        display: "standalone", // 应用显示模式
        theme_color: "#ffffff",
        icons: [
          {
            src: "/logo.png", // 图标路径
            sizes: "120x120", // 图标尺寸
            type: "image/png", // 图标类型
          },
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
      },
    },
  })
);
