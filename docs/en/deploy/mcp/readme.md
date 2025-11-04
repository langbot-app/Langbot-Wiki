# Using MCP Servers


LangBot supports SSE mode MCP servers. You can add MCP servers to leverage the tool calling capabilities in large language models for better handling of LLM requests.

:::info
MCP service only supports SSE mode.
- MCP servers recommended acquisition channel: [Composio MCP](https://mcp.composio.dev/)
:::

## Enable Function Calling for Models

As shown in the image, enable the `Function Calling` feature for the model.

<img width="400px" src="/assets/image/zh/deploy/mcp/mcp_01.png" alt="enable function call" />

## Create MCP Server

Click `Plugin Management`, then `MCP Management`, as shown:

<img width="1000px" src="/assets/image/zh/deploy/mcp/mcp02.png" alt="server page" />

Click `Add` in the top right corner, then `Create MCP Server`,

<img width="400px" src="/assets/image/zh/deploy/mcp/mcp03.png" alt="create new mcp server" />

For example, to use the Fetch HTML server, fill in the corresponding URL, click `Test` to test the MCP server, and click `Submit` to add the server.

After adding, click the switch on the card to connect to the MCP server. Click the card to view the MCP server details:

<img width="400px" src="/assets/image/zh/deploy/mcp/mcp05.png" alt="detailed server" />

## Effect

<img width="1000px" src="/assets/image/zh/deploy/mcp/mcp04.png" alt="dialog with mcp" />
