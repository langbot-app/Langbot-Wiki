# 使用MCP服务器


LangBot 支持 SSE 模式 MCP 服务器，您可以添加 MCP 服务器，使用大语言模型中的工具调用特性，更好的处理 LLM 请求。

:::info
mcp服务仅支持SSE模式。
:::

## 打开模型的函数调用功能

如图，将模型的`函数调用`功能打开。

<img width="400px" src="/assets/image/zh/deploy/mcp/mcp_01.png" alt="enable function call" />

## 创建MCP服务器

点击`插件管理`，`mcp管理`，如图所示：

<img width="1000px" src="/assets/image/zh/deploy/mcp/mcp02.png" alt="server page" />

点击右上角的`添加`，`创建MCP服务器`，

<img width="400px" src="/assets/image/zh/deploy/mcp/mcp03.png" alt="create new mcp server" />

比如使用 Fetch HTML 服务器，填写对应的 URL，点击`测试`用来测试 MCP 服务器，点`提交`添加此服务器。

添加完成之后，点击卡片上的开关以连接 MCP 服务器，点击卡片可以看到 MCP 服务器的详情：

<img width="400px" src="/assets/image/zh/deploy/mcp/mcp05.png" alt="detailed server" />

## 效果

<img width="1000px" src="/assets/image/zh/deploy/mcp/mcp04.png" alt="dialog with mcp" />












