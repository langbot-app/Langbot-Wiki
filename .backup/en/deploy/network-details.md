# Detailed Network Configuration

LangBot and some messaging platforms can be deployed using Docker. Below is a detailed explanation of network configurations for four scenarios.

:::info Table of Contents
[[toc]]
:::

## Both LangBot and Messaging Platform Run in Docker Containers

If both the messaging platform (NapCat/Lagrange) and LangBot are started using Docker, you need to configure the Docker network connection.

Create a new network:

```bash
docker network create langbot-network
```

Add the network configuration to the `docker-compose.yaml` file in the LangBot directory (add it under the `services.langbot` field and include the `langbot-network` configuration under the `networks` field):

```yaml
services:
  langbot:
    ...
    networks:
      - langbot-network
    ...

networks:
  langbot-network:
    external: true
```

Then, add the same network configuration to the `docker-compose.yaml` file of the messaging platform (if the messaging platform is started using the `docker run` command, add `--network langbot-network` to the startup command). Next, modify the IP address in the WS reverse connection address in the messaging platform configuration file to `langbot` (e.g., `ws://langbot:2280/ws`).

Restart both containers.

## Only LangBot Runs in a Docker Container

When only LangBot is deployed using Docker, ports 2280 to 2290 are mapped to the host by default. In this case, LangBot can only act as a WebSocket server, accepting connections from the messaging platform as a client.

Set the messaging platform to ReverseWebSocket (referred to as `reverse ws` or `WebSocket client`), with the port corresponding to the port enabled by LangBot's aiocqhttp adapter, and connect to localhost 127.0.0.1.

## Neither LangBot nor Messaging Platform Uses Docker Deployment

Configure the messaging platform and LangBot settings according to the documentation, ensuring both use the same unused port, and connect to localhost 127.0.0.1.

## Only Messaging Platform Runs in a Docker Container (Not Recommended)

:::warning
Only supported on Linux or other systems that support host mode Docker networking.
:::

Currently, LangBot's aiocqhttp adapter only supports reverse WebSocket connections. When the messaging platform runs in a Docker container and LangBot runs directly on the host, the messaging platform must act as a client to connect to LangBot. In this case, you must set the messaging platform's network to `host` mode and configure its WS connection address to 127.0.0.1, with the port corresponding to the port enabled by LangBot's aiocqhttp adapter.