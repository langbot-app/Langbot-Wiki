# System Environment Settings

Configure some environment information for system operation, located in the `data/config.yaml` file.  
Generally, no modification is needed.

```yaml
# Administrator session list, only valid when processing commands
# Format is session ID (person_xxxx or group_xxxx)
# Session ID can be found in the console logs when sending messages
# For example:
# admins:
#   - person_1234567890
#   - group_1234567890
admins: []

# API port
api:
    port: 5300

# Command configuration
command:
    # Command prefixes, messages with these prefixes will be recognized as commands
    prefix:
    - '!'
    - ！

    # Command permission configuration, key is the command prefix, value is the permission type
    privilege: {}

# Concurrency settings
concurrency:
    # Single pipeline concurrency
    pipeline: 20
    # Single session concurrency
    session: 1

# MCP configuration
# Should be configurable in WebUI in the future
mcp:
    # MCP server list
    # Currently supports two protocol MCP servers:
    # - SSE
    # - Stdio (Python)
    # 
    # Format:
    # SSE mode:
    #    name Server name, self-defined
    #    enable Whether to enable this Server
    #    mode Fixed as SSE
    #    url MCP SSE Server access URL
    #    headers Connection headers, optional
    #    timeout Connection timeout
    # 
    # stdio mode:
    #    name Server name, self-defined
    #    enable Whether to enable this Server
    #    mode Fixed as stdio
    #    command Execution command
    #    args Command parameters
    #    env Command environment variables, optional
    #
    # For example:
    # servers:
    #   - name: 'SSE Server'
    #     enable: true
    #     mode: SSE
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

# Proxy configuration
proxy:
    # HTTP proxy address
    # If proxy is already set in environment variables, no configuration is needed
    # For example:
    # proxy:
    #     http: 'http://127.0.0.1:7890'
    #     https: 'http://127.0.0.1:7890'
    http: ''
    https: ''

# System configuration
system:
    # JWT configuration
    jwt:
        # JWT expiration time in seconds
        expire: 604800
        # JWT secret key, a key will be automatically generated on first startup
        secret: 'xxxx'
```
