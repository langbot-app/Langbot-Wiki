import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    logo: "/langbot-logo-0.5x.png",

    // 编辑链接
    editLink: {
      pattern:
        "https://github.com/langbot-app/Langbot-Wiki/edit/main/docs/:path",
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
              { text: "特性规格", link: "/zh/insight/features" },
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
                    text: "1Panel面板部署",
                    link: "/zh/deploy/langbot/one-click/1panel",
                  },
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
                    text: "OneBot v11",
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
                  {
                    text: "微信",
                    collapsed: true,
                    items: [
                      {
                        text: "WeChatPadPro",
                        link: "/zh/deploy/platforms/wechat/wechatpad.md"
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
                text: "配置模型",
                link: "/zh/deploy/models/readme",
              },
              {
                text: "修改对话流水线",
                link: "/zh/deploy/pipelines/readme",
                collapsed: true,
                items: [
                  { text: "Dify", link: "/zh/deploy/pipelines/dify" },
                  { text: "n8n", link: "/zh/deploy/pipelines/n8n" },
                ],
              },
              {
                text: "使用知识库",
                link: "/zh/deploy/knowledge/readme",
              },
              {
                text: "系统环境设置",
                link: "/zh/deploy/settings",
              },
              {
                text: "对话命令",
                link: "/zh/deploy/command",
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
                ],
              },
            ],
          },
          {
            text: "实践",
            items: [
              {
                text: "如何实现一个消息平台适配器？",
                link: "/zh/workshop/impl-platform-adapter",
              },
              {
                text: "在 LangBot 接入完整 MCP 生态",
                link: "/zh/workshop/mcp-details"
              },
              {
                text: "容器网络配置详解",
                link: "/zh/workshop/network-details",
              },
              {
                text: "接入 PPIO API 的模型",
                link: "/zh/workshop/ppio-integration"
              },
              {
                text: "接入 302.AI 的模型",
                link: "/zh/workshop/302ai-integration"
              }
            ],
          },
          {
            text: "开发",
            items: [
              { text: "开发配置", link: "/zh/develop/dev-config" },
              { text: "组件架构", link: "/zh/develop/comp-arch" },
              {
                text: "适配器开发",
                collapsed: true,
                items: [
                  {
                    text: "Discord 适配器",
                    collapsed: true,
                    items: [
                      { text: "概述", link: "/zh/develop/adapter/discord/README" },
                      { text: "快速开始", link: "/zh/develop/adapter/discord/quick_start" },
                      { text: "架构设计", link: "/zh/develop/adapter/discord/design" },
                      { text: "API 参考", link: "/zh/develop/adapter/discord/api_reference" },
                      { text: "故障排除", link: "/zh/develop/adapter/discord/troubleshooting" },
                    ],
                  },
                ],
              },
            ],
          },
        ],

        // 编辑链接
        editLink: {
          pattern:
            "https://github.com/langbot-app/Langbot-Wiki/edit/main/docs/:path",
        },

        // 导航栏的社交图标
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/langbot-app/LangBot",
          },
        ],
      },
    },
    en: {
      title: "LangBot Docs",
      label: "English",
      lang: "en",
      link: "/en/",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        nav: [
          { text: "Home", link: "https://langbot.app" },
          { text: "Roadmap", link: "https://langbot.featurebase.app/roadmap" },
        ],

        sidebar: [
          {
            text: "Overview",
            items: [
              { text: "Getting Started (Must Read)", link: "/en/insight/guide" },
              { text: "Community Resources", link: "/en/insight/community" },
              { text: "Features", link: "/en/insight/features" },
            ],
          },
          {
            text: "Deployment and Usage",
            items: [
              {
                text: "Deploy LangBot",
                collapsed: true,
                items: [
                  { text: "Docker Deployment", link: "/en/deploy/langbot/docker" },
                  {
                    text: "1Panel Deployment",
                    link: "/en/deploy/langbot/one-click/1panel",
                  },
                  {
                    text: "aaPanel Deployment",
                    link: "/en/deploy/langbot/one-click/bt",
                  },
                  { text: "Manual Deployment", link: "/en/deploy/langbot/manual" },
                ],
              },
              {
                text: "Configure Bots",
                collapsed: true,
                link: "/en/deploy/platforms/readme",
                items: [
                  { text: "Discord", link: "/en/deploy/platforms/discord" },
                  { text: "Telegram", link: "/en/deploy/platforms/telegram" },
                  { text: "Slack", link: "/en/deploy/platforms/slack" },
                  { text: "Lark", link: "/en/deploy/platforms/lark" },
                  { text: "DingTalk", link: "/en/deploy/platforms/dingtalk" },
                  {
                    text: "OneBot v11",
                    collapsed: true,
                    items: [
                      {
                        text: "NapCat",
                        link: "/en/deploy/platforms/qq/aiocqhttp/napcat",
                      },
                      {
                        text: "Lagrange",
                        link: "/en/deploy/platforms/qq/aiocqhttp/lagrange",
                      },
                      {
                        text: "llonebot",
                        link: "/en/deploy/platforms/qq/aiocqhttp/llonebot",
                      },
                    ],
                  },
                  {
                    text: "QQ Official Bot",
                    collapsed: true,
                    items: [
                      {
                        text: "Webhook Method",
                        link: "/en/deploy/platforms/qq/official_webhook",
                      },
                      {
                        text: "WebSocket Method",
                        link: "/en/deploy/platforms/qq/official",
                      },
                    ],
                  },
                  {
                    text: "WeCom (Enterprise WeChat)",
                    collapsed: true,
                    items: [
                      {
                        text: "Internal Application",
                        link: "/en/deploy/platforms/wecom/wecom",
                      },
                      {
                        text: "External Customer Service",
                        link: "/en/deploy/platforms/wecom/wecomcs",
                      },
                    ],
                  },
                  { text: "WeChat Official Account", link: "/en/deploy/platforms/wxoa" },
                ],
              },
              {
                text: "Configure Models",
                link: "/en/deploy/models/readme",
              },
              {
                text: "Modify Dialogue Pipeline",
                link: "/en/deploy/pipelines/readme",
                collapsed: true,
                items: [
                  { text: "Dify", link: "/en/deploy/pipelines/dify" },
                  { text: "n8n", link: "/en/deploy/pipelines/n8n" },
                ],
              },
              {
                text: "Using Knowledge Base",
                link: "/en/deploy/knowledge/readme",
              },
              {
                text: "System Settings",
                link: "/en/deploy/settings",
              },
              {
                text: "Dialogue Commands",
                link: "/en/deploy/command",
              },
              {
                text: "Update LangBot",
                link: "/en/deploy/update",
              },
            ],
          },
          {
            text: "Plugins",
            items: [
              { text: "Plugin Introduction", link: "/en/plugin/plugin-intro" },
              {
                text: "Plugin Development",
                collapsed: true,
                items: [
                  { text: "Basic Tutorial", link: "/en/plugin/dev/tutor" },
                  { text: "Message Platform Entities", link: "/en/plugin/dev/messages" },
                  { text: "API Reference", link: "/en/plugin/dev/api-ref" },
                ],
              },
            ],
          },
          {
            text: "Workshops",
            items: [
              {
                text: "How to Implement a Message Platform Adapter?",
                link: "/en/workshop/impl-platform-adapter",
              },
              {
                text: "Integrating Complete MCP Ecosystem in LangBot",
                link: "/en/workshop/mcp-details"
              },
              {
                text: "Container Network Configuration Details",
                link: "/en/workshop/network-details",
              },
              {
                text: "Integrating PPIO API Model",
                link: "/en/workshop/ppio-integration"
              },
              {
                text: "Integrating 302.AI Models",
                link: "/en/workshop/302ai-integration"
              }
            ],
          },
          {
            text: "Development",
            items: [
              { text: "Development Configuration", link: "/en/develop/dev-config" },
              { text: "Component Architecture", link: "/en/develop/comp-arch" },
            ],
          },
        ],

        // edit link
        editLink: {
          pattern:
            "https://github.com/langbot-app/Langbot-Wiki/edit/main/docs/:path",
        },

        // social links in the navbar
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/langbot-app/LangBot",
          },
        ],
      },
    },
  },

  // 最后更新时间
  lastUpdated: true,
});
