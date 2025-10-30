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

# Plugin system configuration
plugin:
    # Whether to enable the plugin system
    enable: true
    # Plugin runtime WebSocket address
    # Default value for Docker environment
    # If you want to use a standalone Plugin Runtime, please refer to https://docs.langbot.app/en/develop/plugin-runtime.html
    runtime_ws_url: 'ws://langbot_plugin_runtime:5400/control/ws'
    # Whether to enable the plugin marketplace
    enable_marketplace: true
    # Plugin marketplace URL
    cloud_service_url: 'https://space.langbot.app'

# Vector database configuration
vdb:
    # The vector database to use
    # Supported vector databases:
    # - chroma (default, embedded vector database)
    # - qdrant (external vector database, please configure below)
    use: chroma
    # Qdrant configuration
    qdrant:
        # Qdrant URL
        url: ''
        # Qdrant Host
        host: localhost
        # Qdrant Port
        port: 6333
        # Qdrant API Key
        api_key: ''
```
