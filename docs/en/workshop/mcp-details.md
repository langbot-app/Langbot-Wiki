# MCP Ecosystem Details

The [MCP Protocol](https://modelcontextprotocol.io/) is a protocol that describes the interaction between applications and LLMs, and has been adopted by various products. LangBot can act as an MCP Client to connect to MCP Servers, providing extensive tools for LLMs to use during conversations with users.

## Finding MCP Servers

To use MCP tools in LangBot, you need to find and connect to existing MCP Servers.  
There are two types of MCP Servers in the market:

- Executable files implemented in Node or Python, communicating with LangBot through `stdio` (standard input/output)
- Web services based on HTTP protocol, communicating with LangBot through HTTP protocol

:::info

- You can check existing MCP Servers in the [MCP Server List](https://github.com/punkpeye/awesome-mcp-servers).
- For online hosted MCP Servers, you can find them at [Composio MCP](https://mcp.composio.dev/).
- To write your own MCP Server, you can refer to the [MCP Protocol Documentation](https://modelcontextprotocol.io/quickstart/server) and [MCP Server Examples](https://modelcontextprotocol.io/examples).

:::

## Configuring MCP Server

Please refer to the [System Settings Documentation](/en/deploy/settings.html)

After configuration, you can use the `!func` command in chat to view registered MCP tools. When chatting with models that support Function Calling, LangBot will automatically call MCP tools.