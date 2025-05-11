import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    logo: "/langbot-logo-0.5x.png",

    // 编辑链接
    editLink: {
      pattern:
        "https://github.com/the-lazy-me/Langbot-Wiki/edit/main/docs/:path",
    },

    // 本地搜索
    search: {
      provider: "local",
    },
  },

  locales: {
    root: {
      title: "LangBot 文档",
      label: "简体中文",
      lang: "zh",
      link: "/zh/",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: "主页", link: "https://langbot.app" },
          { text: "路线图", link: "https://langbot.featurebase.app/roadmap" },
        ],

        sidebar: [
          {
            text: "概述",
            items: [
              { text: "新手指引（必看）", link: "/zh/insight/guide" },
              { text: "社区资源", link: "/zh/insight/community" },
            ],
          },
          {
            text: "部署和使用",
            items: [
              {
                text: "部署 LangBot",
                collapsed: true,
                items: [
                  { text: "Docker部署", link: "/zh/deploy/langbot/docker" },
                  {
                    text: "宝塔面板部署",
                    link: "/zh/deploy/langbot/one-click/bt",
                  },
                  { text: "手动部署", link: "/zh/deploy/langbot/manual" },
                ],
              },
              {
                text: "配置机器人",
                collapsed: true,
                link: "/zh/deploy/platforms/readme",
                items: [
                  {
                    text: "QQ 个人号",
                    collapsed: true,
                    items: [
                      {
                        text: "NapCat",
                        link: "/zh/deploy/platforms/qq/aiocqhttp/napcat",
                      },
                      {
                        text: "Lagrange",
                        link: "/zh/deploy/platforms/qq/aiocqhttp/lagrange",
                      },
                      {
                        text: "llonebot",
                        link: "/zh/deploy/platforms/qq/aiocqhttp/llonebot",
                      },
                      {
                        text: "go-cqhttp",
                        link: "/zh/deploy/platforms/qq/gocq",
                      },
                    ],
                  },
                  {
                    text: "QQ 官方机器人",
                    // link: "/deploy/platforms/qq/official",
                    collapsed: true,
                    items: [
                      {
                        text: "Webhook 方式",
                        link: "/zh/deploy/platforms/qq/official_webhook",
                      },
                      {
                        text: "WebSocket 方式",
                        link: "/zh/deploy/platforms/qq/official",
                      },
                    ],
                  },
                  {
                    text: "个人微信",
                    collapsed: true,
                    items: [
                      {
                        text: "Gewechat",
                        link: "/zh/deploy/platforms/wechat/gewechat",
                      },
                    ],
                  },
                  {
                    text: "企业微信",
                    collapsed: true,
                    items: [
                      {
                        text: "内部应用",
                        link: "/zh/deploy/platforms/wecom/wecom",
                      },
                      {
                        text: "对外客服",
                        link: "/zh/deploy/platforms/wecom/wecomcs",
                      },
                    ],
                  },
                  { text: "微信公众号", link: "/zh/deploy/platforms/wxoa.md" },
                  { text: "飞书", link: "/zh/deploy/platforms/lark" },
                  { text: "钉钉", link: "/zh/deploy/platforms/dingtalk.md" },
                  { text: "Discord", link: "/zh/deploy/platforms/discord" },
                  { text: "Telegram", link: "/zh/deploy/platforms/telegram" },
                  { text: "Slack", link: "/zh/deploy/platforms/slack" },
                ],
              },
              {
                text: "配置对话模型",
                link: "/zh/deploy/models/readme",
              },
              {
                text: "修改对话流水线",
                link: "/zh/deploy/pipelines/readme",
              },
              {
                text: "更新 LangBot",
                link: "/zh/deploy/update",
              },
            ],
          },
          {
            text: "插件",
            // collapsed: true,
            items: [
              { text: "插件介绍", link: "/zh/plugin/plugin-intro" },
              {
                text: "插件开发",
                collapsed: true,
                items: [
                  { text: "基础教程", link: "/zh/plugin/dev/tutor" },
                  { text: "消息平台实体", link: "/zh/plugin/dev/messages" },
                  { text: "API 参考", link: "/zh/plugin/dev/api-ref" },
                  { text: "组件扩展", link: "/zh/plugin/dev/extension" },
                ],
              },
            ],
          },
          {
            text: "实践",
            items: [
              {
                text: "如何接入 Dify？",
                link: "/zh/workshop/dify-service-api",
              },
              {
                text: "如何接入 OneAPI、LinkAI 等第三方 OpenAI 格式接口？",
                link: "/zh/workshop/one-api",
              },
              {
                text: "如何使用 Ollama 接入本地模型",
                link: "/zh/workshop/ollama"
              },
              {
                text: "如何实现一个消息平台适配器？",
                link: "/zh/workshop/impl-platform-adapter",
              },
              {
                text: "在 LangBot 接入完整 MCP 生态",
                link: "/zh/workshop/mcp-details"
              },
              {
                text: "使用 PPIO 提供的模型",
                link: "/zh/workshop/ppio-integration"
              },
              {
                text: "容器网络配置详解",
                link: "/zh/workshop/network-details",
              },
            ],
          },
          {
            text: "开发",
            items: [
              { text: "开发配置", link: "/zh/develop/dev-config" },
              { text: "组件架构", link: "/zh/develop/comp-arch" },
            ],
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
            link: "https://github.com/RockChinQ/LangBot",
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
