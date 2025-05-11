import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    logo: "/langbot-logo-0.5x.png",
    // 本地搜索
    search: {
      provider: "local",
    },
  },

  locales: {
    root: {
      label: "简体中文",
      lang: "zh",
      link: "/zh/",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        nav: [
          { text: "首页", link: "/zh-cn/" },
          { text: "概述", link: "/zh-cn/insight/guide" },
          { text: "部署", link: "/zh-cn/deploy/langbot/manual" },
          { text: "插件", link: "/zh-cn/plugin/plugin-intro" },
        ],

        sidebar: [
          {
            text: "概述",
            items: [
              { text: "新手指引（必看）", link: "/zh-cn/insight/guide" },
              { text: "项目介绍", link: "/zh-cn/insight/intro" },
              { text: "社区资源", link: "/zh-cn/insight/community" },
            ],
          },
          {
            text: "部署",
            items: [
              {
                text: "部署 LangBot",
                collapsed: true,
                items: [
                  // { text: "一键部署",
                  //   items: [
                  //     { text: "宝塔面板(推荐)", link: "/zh-cn/deploy/langbot/one-click/bt" },
                  //   ],
                  // },
                  {
                    text: "宝塔面板部署",
                    link: "/zh-cn/deploy/langbot/one-click/bt",
                  },
                  { text: "Docker部署", link: "/zh-cn/deploy/langbot/docker" },
                  { text: "手动部署", link: "/zh-cn/deploy/langbot/manual" },
                ],
              },
              {
                text: "部署消息平台",
                collapsed: true,
                // link: "/zh-cn/deploy/platforms/",
                items: [
                  {
                    text: "aiocqhttp(推荐)",
                    collapsed: true,
                    // link: "/zh-cn/deploy/platforms/aiocqhttp/",
                    items: [
                      {
                        text: "NapCat",
                        link: "/zh-cn/deploy/platforms/aiocqhttp/napcat",
                      },
                      {
                        text: "Lagrange",
                        link: "/zh-cn/deploy/platforms/aiocqhttp/lagrange",
                      },
                      {
                        text: "llonebot",
                        link: "/zh-cn/deploy/platforms/aiocqhttp/llonebot",
                      },
                      {
                        text: "shamrock",
                        link: "/zh-cn/deploy/platforms/aiocqhttp/shamrock",
                      },
                    ],
                  },
                  // {
                  //   text: "mirai",
                  //   link: "/zh-cn/deploy/platforms/mirai",
                  // },
                  {
                    text: "go-cqhttp",
                    link: "/zh-cn/deploy/platforms/gocq",
                  },
                  {
                    text: "QQ官方",
                    link: "/zh-cn/deploy/platforms/official",
                  },
                ],
              },
              { text: "填写配置信息", link: "/zh-cn/deploy/quick-config/config" },
              {
                text: "网络配置详解",
                link: "/zh-cn/deploy/network-details",
                // collapsed: true,
                // items: [
                //   { text: "LangBot和消息平台均Docker", link: "/zh-cn/deploy/network/langbot-platform-docker" },
                //   { text: "仅LangBot Docker", link: "/zh-cn/deploy/network/langbot-docker" },
                //   { text: "仅消息平台 Docker（不建议）", link: "/zh-cn/deploy/network/platform-docker" },
                //   { text: "LangBot和消息平台均非Docker", link: "/zh-cn/deploy/network/langbot-platform-manual" },
                // ],
              },
              {
                text: "更新 LangBot",
                link: "/zh-cn/deploy/update",
              },
            ],
          },
          {
            text: "使用",
            items: [
              { text: "命令用法", link: "/zh-cn/usage/command" },
              { text: "常见问题", link: "/zh-cn/usage/faq" },
            ],
          },
          {
            text: "配置",
            items: [
              {
                text: "功能配置",
                collapsed: true,
                items: [
                  {
                    text: "platform.json",
                    link: "/zh-cn/config/function/platform",
                  },
                  {
                    text: "pipeline.json",
                    link: "/zh-cn/config/function/pipeline",
                  },
                  {
                    text: "provider.json",
                    link: "/zh-cn/config/function/provider",
                  },
                  { text: "command.json", link: "/zh-cn/config/function/command" },
                  { text: "system.json", link: "/zh-cn/config/function/system" },
                ],
              },
              {
                text: "元数据配置",
                collapsed: true,
                items: [
                  {
                    text: "敏感词sensitive-words.json",
                    link: "/zh-cn/config/metadata/sensitive-words",
                  },
                  {
                    text: "模型列表llm-models.json",
                    link: "/zh-cn/config/metadata/llm-models",
                  },
                  {
                    text: "qq-botpy ID 映射 adapter-qq-botpy.json",
                    link: "/zh-cn/config/metadata/adapter-qq-botpy",
                  },
                ],
              },
            ],
          },
          {
            text: "插件",
            // collapsed: true,
            items: [
              { text: "插件介绍", link: "/zh-cn/plugin/plugin-intro" },
              {
                text: "插件开发",
                collapsed: true,
                items: [
                  { text: "基础教程", link: "/zh-cn/plugin/dev/tutor" },
                  { text: "消息平台实体", link: "/zh-cn/plugin/dev/messages" },
                  { text: "API 参考", link: "/zh-cn/plugin/dev/api-ref" },
                  { text: "组件扩展", link: "/zh-cn/plugin/dev/extension" },
                ],
              },
              // { text: "技术信息", link: "/zh-cn/plugin/tech-info" },
            ],
          },
          {
            text: "管理面板（Beta测试）",
            items: [
              { text: "介绍 & 使用", link: "/zh-cn/webui/intro" },
              { text: "系统操作", link: "/zh-cn/webui/system" },
              { text: "设置项管理", link: "/zh-cn/webui/settings" },
            ],
          },
          // {
          //   text: "规模化和商用",
          //   // collapsed: true,
          //   // link: "/zh-cn/tob/",
          //   items: [
          //     { text: "消息平台误导性", link: "/zh-cn/tob/platform" },
          //     { text: "AI内容合规性", link: "/zh-cn/tob/provider" },
          //     { text: "咨询方式", link: "/zh-cn/tob/contact" },
          //   ],
          // },

          {
            text: "实践",
            items: [
              {
                text: "如何接入 Dify？",
                link: "/zh-cn/workshop/dify-service-api",
              },
              {
                text: "如何接入 Dify？ - NewAPI 中转方案",
                link: "/zh-cn/workshop/dify-integration",
              },
              {
                text: "如何接入 OneAPI、LinkAI 等第三方 OpenAI 格式接口？",
                link: "/zh-cn/workshop/one-api",
              },
              {
                text: "如何实现一个消息平台适配器？",
                link: "/zh-cn/workshop/impl-platform-adapter",
              },
            ],
          },
          {
            text: "开发",
            items: [{ text: "组件架构", link: "/zh-cn/develop/comp-arch" }],
          },
        ],

        // 编辑链接
        editLink: {
          pattern:
            "https://github.com/the-lazy-me/Langbot-Wiki/edit/main/docs/:path",
        },

        // 导航栏的社交图标
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/the-lazy-me/QChatGPT-Wiki",
          },
        ],
      },
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en/",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        nav: [
          { text: "Home", link: "/en/" },
          { text: "Insight", link: "/en/insight/guide" },
          { text: "Deploy", link: "/en/deploy/langbot/manual" },
          { text: "Plugin", link: "/en/plugin/plugin-intro" },
        ],

        sidebar: [
          {
            text: "Insight",
            items: [
              { text: "Getting Started", link: "/en/insight/guide" },
              { text: "Introduction", link: "/en/insight/intro" },
              { text: "Community Resources", link: "/en/insight/community" },
            ],
          },
          {
            text: "Deploy",
            items: [
              {
                text: "Deploy LangBot",
                collapsed: true,
                items: [
                  {
                    text: "Deploy with Baota Panel",
                    link: "/en/deploy/langbot/one-click/bt",
                  },
                  {
                    text: "Deploy with Docker",
                    link: "/en/deploy/langbot/docker",
                  },
                  {
                    text: "Manual Deployment",
                    link: "/en/deploy/langbot/manual",
                  },
                ],
              },
              {
                text: "Deploy Message Platforms",
                collapsed: true,
                items: [
                  {
                    text: "aiocqhttp",
                    collapsed: true,
                    items: [
                      {
                        text: "NapCat",
                        link: "/en/deploy/platforms/aiocqhttp/napcat",
                      },
                      {
                        text: "Lagrange",
                        link: "/en/deploy/platforms/aiocqhttp/lagrange",
                      },
                      {
                        text: "llonebot",
                        link: "/en/deploy/platforms/aiocqhttp/llonebot",
                      },
                      {
                        text: "shamrock",
                        link: "/en/deploy/platforms/aiocqhttp/shamrock",
                      },
                    ],
                  },
                  {
                    text: "go-cqhttp",
                    link: "/en/deploy/platforms/gocq",
                  },
                  {
                    text: "QQ Official",
                    link: "/en/deploy/platforms/official",
                  },
                ],
              },
              {
                text: "Fill in the Configuration",
                link: "/en/deploy/quick-config/config",
              },
              {
                text: "Network Configuration",
                link: "/en/deploy/network-details",
              },
              {
                text: "Update LangBot",
                link: "/en/deploy/update",
              },
            ],
          },

          {
            text: "Usage",
            items: [
              { text: "Command Usage", link: "/en/usage/command" },
              { text: "FAQ", link: "/en/usage/faq" },
            ],
          },
          {
            text: "Config",
            items: [
              {
                text: "Function Configuration",
                collapsed: true,
                items: [
                  {
                    text: "platform.json",
                    link: "/en/config/function/platform",
                  },
                  {
                    text: "pipeline.json",
                    link: "/en/config/function/pipeline",
                  },
                  {
                    text: "provider.json",
                    link: "/en/config/function/provider",
                  },
                  { text: "command.json", link: "/en/config/function/command" },
                  { text: "system.json", link: "/en/config/function/system" },
                ],
              },
              {
                text: "Metadata Configuration",
                collapsed: true,
                items: [
                  {
                    text: "sensitive-words.json",
                    link: "/en/config/metadata/sensitive-words",
                  },
                  {
                    text: "llm-models.json",
                    link: "/en/config/metadata/llm-models",
                  },
                  {
                    text: "adapter-qq-botpy.json",
                    link: "/en/config/metadata/adapter-qq-botpy",
                  },
                ],
              },
            ],
          },
          {
            text: "Plugin",
            items: [
              { text: "Plugin Introduction", link: "/en/plugin/plugin-intro" },
              {
                text: "Plugin Development",
                collapsed: true,
                items: [
                  { text: "Basic Tutorial", link: "/en/plugin/dev/tutor" },
                  {
                    text: "Message Platform Entity",
                    link: "/en/plugin/dev/messages",
                  },
                  { text: "API Reference", link: "/en/plugin/dev/api-ref" },
                  {
                    text: "Component Extension",
                    link: "/en/plugin/dev/extension",
                  },
                ],
              },
            ],
          },
          {
            text: "WebUI (Beta)",
            items: [
              { text: "Introduction & Usage", link: "/en/webui/intro" },
              { text: "System Operation", link: "/en/webui/system" },
              { text: "Settings Management", link: "/en/webui/settings" },
            ],
          },
          {
            text: "Workshop",
            items: [
              {
                text: "How to Access Dify Service API?",
                link: "/en/workshop/dify-service-api",
              },
              {
                text: "How to Access Dify Service API? - NewAPI Intermediate Solution",
                link: "/en/workshop/dify-integration",
              },
              {
                text: "How to Access Third-party OpenAI Format APIs like OneAPI, LinkAI?",
                link: "/en/workshop/one-api",
              },
              {
                text: "How to Implement a Message Platform Adapter?",
                link: "/en/workshop/impl-platform-adapter",
              },
            ],
          },
          {
            text: "Develop",
            items: [
              { text: "Component Architecture", link: "/en/develop/comp-arch" },
            ],
          },
        ],

        // edit link
        editLink: {
          pattern:
            "https://github.com/the-lazy-me/Langbot-Wiki/edit/main/docs/:path",
        },

        // social links in the navbar
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/the-lazy-me/QChatGPT-Wiki",
          },
        ],
      },
    },
  },

  // 最后更新时间
  lastUpdated: true,
});
