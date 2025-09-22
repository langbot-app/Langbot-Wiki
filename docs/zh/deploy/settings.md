# 系统环境设置

配置系统运行的一些环境信息，文件位于`data/config.yaml`。  
一般不需要修改。

```yaml
# 管理员会话列表，仅在处理命令时有效
# 格式为会话ID（person_xxxx 或 group_xxxx）
# 会话ID 可以在发送消息时查看控制台日志找到
# 例如：
# admins:
#   - person_1234567890
#   - group_1234567890
admins: []

# API 端口
api:
    port: 5300

# 命令配置
command:
    # 命令前缀，具有这些前缀的消息会被识别为命令
    prefix:
    - '!'
    - ！

    # 命令权限配置，key 为命令前缀，value 为权限类型
    privilege: {}

# 并发设置
concurrency:
    # 单流水线并发数
    pipeline: 20
    # 单会话并发数
    session: 1

# MCP 配置
# 后续应该会改为在 WebUI 上可以配置
mcp:
    # MCP 服务器列表
    # 目前支持两种协议的 MCP 服务器：
    # - SSE
    # - Stdio（Python）
    # 
    # 格式：
    # SSE 模式：
    #    name 服务器名称，自行定义
    #    enable 是否启用本 Server
    #    mode 固定填写 sse
    #    url MCP SSE Server 的访问 URL
    #    headers 连接时的 headers，可选
    #    timeout 连接超时时间
    # 
    # stdio 模式：
    #    name 服务器名称，自行定义
    #    enable 是否启用本 Server
    #    mode 固定填写 stdio
    #    command 执行命令
    #    args 执行命令的参数
    #    env 执行命令的环境变量，可选
    #
    # 例如：
    # servers:
    #   - name: 'SSE Server'
    #     enable: true
    #     mode: sse
    #     url: 'http://127.0.0.1:8000/sse'
    #     headers: {}
    #     timeout: 10
    #   - name: 'stdio Server'
    #     enable: true
    #     mode: stdio
    #     command: 'python'
    #     args: ['-m', 'weather']
    #     env: {}
    servers: []

# 代理配置
proxy:
    # HTTP 代理地址
    # 如果已经在环境变量设置了代理，则不需要配置
    # 例如：
    # proxy:
    #     http: 'http://127.0.0.1:7890'
    #     https: 'http://127.0.0.1:7890'
    http: ''
    https: ''

# 系统配置
system:
    # JWT 配置
    jwt:
        # JWT 过期时间，单位为秒
        expire: 604800
        # JWT 密钥，首次启动时会自动生成一个密钥
        secret: 'xxxx'

# 插件系统配置
plugin:
    # 是否启用插件系统
    enable: true
    # 插件运行时 WebSocket 地址
    # 默认为 Docker 环境下的默认值
    # 若要使用独立的 Plugin Runtime，请参考 https://docs.langbot.app/zh/develop/plugin-runtime.html
    runtime_ws_url: 'ws://langbot_plugin_runtime:5400/control/ws'
    # 是否启用插件市场
    enable_marketplace: true
    # 插件市场 URL
    cloud_service_url: 'https://space.langbot.app'

# 向量数据库配置
vdb:
    # 所使用的向量数据库
    # 支持的向量数据库：
    # - chroma（默认，嵌入式向量数据库）
    # - qdrant（外部向量数据库，请在下方配置）
    use: chroma
    # Qdrant 配置
    qdrant:
        # Qdrant 的 URL
        url: ''
        # Qdrant 的 Host
        host: localhost
        # Qdrant 的 Port
        port: 6333
        # Qdrant 的 API Key
        api_key: ''
```
