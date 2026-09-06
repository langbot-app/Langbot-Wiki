import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LangBot v3 文档（已停止维护）",
  description:
    "LangBot v3 及本文档早已停止维护，仅供历史参考。建议使用新版 LangBot 文档：https://langbot.app/docs/zh/insight/guide",
  transformPageData(pageData) {
    const notice = "LangBot v3 文档已停止维护，仅供历史参考。建议使用新版文档：https://langbot.app/docs/zh/insight/guide";
    pageData.description = `${notice}。${pageData.description || ""}`;
  },
  themeConfig: {
    siteTitle: "LangBot v3 文档",
    // https://vitepress.dev/reference/default-theme-config
    logo: "/langbot-logo-0.5x.png",

    nav: [
      { text: "新版文档", link: "https://langbot.app/docs/zh/insight/guide" },
      { text: "主页", link: "https://langbot.app" },
      { text: "路线图", link: "https://langbot.featurebase.app/roadmap" },      
    ],

    sidebar: [
      {
        text: "概述",
        items: [
          { text: "新手指引（必看）", link: "/insight/guide" },
          { text: "项目介绍", link: "/insight/intro" },
          { text: "社区资源", link: "/insight/community" },
        ],
      },
      {
        text: "部署",
        items: [
          {
            text: "部署 LangBot",
            collapsed: true,
            items: [
              { text: "Docker部署", link: "/deploy/langbot/docker" },
              { text: "宝塔面板部署", link: "/deploy/langbot/one-click/bt" },
              { text: "手动部署", link: "/deploy/langbot/manual" },
            ],
          },
          {
            text: "连接消息平台",
            collapsed: true,
            items: [
              {
                text: "消息平台说明",
                link: "/deploy/platforms/readme",
              },
              {
                text: "QQ 个人号",
                collapsed: true,
                items: [
                  {
                    text: "NapCat",
                    link: "/deploy/platforms/qq/aiocqhttp/napcat",
                  },
                  {
                    text: "Lagrange",
                    link: "/deploy/platforms/qq/aiocqhttp/lagrange",
                  },
                  {
                    text: "llonebot",
                    link: "/deploy/platforms/qq/aiocqhttp/llonebot",
                  },
                  {
                    text: "go-cqhttp",
                    link: "/deploy/platforms/qq/gocq",
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
                    link: "/deploy/platforms/qq/official_webhook",
                  },
                  {
                    text: "WebSocket 方式",
                    link: "/deploy/platforms/qq/official",
                  },
                ],
              },
              { text: "个人微信", 
                collapsed: true,
                items: [
                  {
                    text: "Gewechat",
                    link: "/deploy/platforms/wechat/gewechat",
                  },
                ],
              },
              { text: "企业微信", 
                collapsed: true,
                items: [
                  {
                    text: "内部应用",
                    link: "/deploy/platforms/wecom/wecom",
                  },
                  {
                    text: "对外客服",
                    link: "/deploy/platforms/wecom/wecomcs",
                  },
                ],
               },
              { text:"微信公众号",link:"/deploy/platforms/wxoa.md"},
              { text: "飞书", link: "/deploy/platforms/lark" },
              { text:"钉钉",link:"/deploy/platforms/dingtalk.md"},
              { text: "Discord", link: "/deploy/platforms/discord" },
              { text: "Telegram", link: "/deploy/platforms/telegram" },
              { text:"Slack", link: "/deploy/platforms/slack"},
            ],
          },
          { text: "填写配置信息", link: "/deploy/quick-config/config" },
          {
            text: "网络配置详解",
            link: "/deploy/network-details",
          },
          {
            text: "更新 LangBot",
            link: "/deploy/update",
          },
        ],
      },
      {
        text: "使用",
        items: [
          { text: "命令用法", link: "/usage/command" },
          { text: "常见问题", link: "/usage/faq" },
        ],
      },
      {
        text: "配置",
        items: [
          {
            text: "功能配置",
            collapsed: true,
            items: [
              { text: "platform.json", link: "/config/function/platform" },
              { text: "pipeline.json", link: "/config/function/pipeline" },
              { text: "provider.json", link: "/config/function/provider" },
              { text: "command.json", link: "/config/function/command" },
              { text: "system.json", link: "/config/function/system" },
            ],
          },
          {
            text: "元数据配置",
            collapsed: true,
            items: [
              {
                text: "敏感词sensitive-words.json",
                link: "/config/metadata/sensitive-words",
              },
              {
                text: "模型列表llm-models.json",
                link: "/config/metadata/llm-models",
              },
              {
                text: "qq-botpy ID 映射 adapter-qq-botpy.json",
                link: "/config/metadata/adapter-qq-botpy",
              },
            ],
          },
        ],
      },
      {
        text: "插件",
        // collapsed: true,
        items: [
          { text: "插件介绍", link: "/plugin/plugin-intro" },
          {
            text: "插件开发",
            collapsed: true,
            items: [
              { text: "基础教程", link: "/plugin/dev/tutor" },
              { text: "消息平台实体", link: "/plugin/dev/messages" },
              { text: "API 参考", link: "/plugin/dev/api-ref" },
              { text: "组件扩展", link: "/plugin/dev/extension" },
            ],
          },
          // { text: "技术信息", link: "/plugin/tech-info" },
        ],
      },
      {
        text: "管理面板（Beta测试）",
        items: [
          { text: "介绍 & 使用", link: "/webui/intro" },
          { text: "系统操作", link: "/webui/system" },
          { text: "设置项管理", link: "/webui/settings" },
        ],
      },
      {
        text: "实践",
        items: [
          {
            text: "如何接入 Dify？",
            link: "/workshop/dify-service-api",
          },
          {
            text: "如何接入 Dify？ - NewAPI 中转方案",
            link: "/workshop/dify-integration",
          },
          {
            text: "如何接入 OneAPI、LinkAI 等第三方 OpenAI 格式接口？",
            link: "/workshop/one-api",
          },
          {
            text:"如何使用 Ollama 接入本地模型",
            link:"/workshop/ollama"
          },
          {
            text: "如何实现一个消息平台适配器？",
            link: "/workshop/impl-platform-adapter",
          },
          {
            text: "在 LangBot 接入完整 MCP 生态",
            link: "/workshop/mcp-details"
          },
          {
            text: "接入 PPIO API",
            link: "/workshop/ppio-integration"
          }
        ],
      },
      {
        text: "开发",
        items: [
          { text: "开发配置", link: "/develop/dev-config" },
          { text: "组件架构", link: "/develop/comp-arch" },
        ],
      },
    ],

    // 编辑链接
    editLink: {
      pattern:
        "https://github.com/the-lazy-me/Langbot-Wiki/edit/main/docs/:path",
    },

    // 本地搜索
    search: {
      provider: "local",
    },

    // 导航栏的社交图标
    socialLinks: [
      { icon: "github", link: "https://github.com/the-lazy-me/QChatGPT-Wiki" },
    ],
  },
  // 最后更新时间
  lastUpdated: true,
});
