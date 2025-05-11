# 通过 Gewechat 接入个人微信

:::warning 
LangBot接入gewechat，仅供娱乐，请勿用于违法违规行为，否则后果自负。
:::

**本教程要求 LangBot 以 Docker 容器部署**，请根据 LangBot 部署文档将 LangBot 部署到 Docker 中。

:::info
- 推荐使用 Ubuntu Linux 系统部署。
- 推荐使用[阿里云，服务器价格低至 38 元一年，更可以享受8折优惠](https://www.aliyun.com/minisite/goods?userCode=ys4ad8gs)，系统选择 Ubuntu 22.04 或 24.04。
:::

## 创建 Docker 网络

我们需要将 Gewechat 和 LangBot 部署到同一个 Docker 网络中，方便它们互相通信。

```bash
docker network create langbot-network
```

在 LangBot 目录的 `docker-compose.yaml` 文件中添加网络配置(添加到 `services.langbot` 字段下，并在 `networks` 字段下添加 `langbot-network` 网络配置)：

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

在下一步部署 Gewechat 时，请在启动命令（docker run 命令）中的`-itd`后添加额外的网络配置`--network langbot-network`。

```bash
# 例如原命令为
docker run -itd -v /root/temp:/root/temp -p 2531:2531 -p 2532:2532 --privileged=true --name=gewe gewe /usr/sbin/init

# 添加网络配置后，命令变为
docker run -itd --network langbot-network -v /root/temp:/root/temp -p 2531:2531 -p 2532:2532 --privileged=true --name=gewe gewe /usr/sbin/init
```

## 部署 Gewechat

请查看 [Gewechat 文档](https://github.com/Devo919/Gewechat) 执行到 `启动服务` 步骤。

## 在 LangBot 中填写信息并启动

根据[填写配置信息](/deploy/quick-config/config)中的个人微信适配器配置，填写 LangBot 相关配置信息。

```json
        {
            "adapter": "gewechat",
            "enable": true,
            "gewechat_url": "http://gewe:2531",
            "gewechat_file_url": "http://gewe:2532",
            "port": 2286,
            "callback_url": "http://langbot:2286/gewechat/callback",
            "app_id": "",
            "token": ""
        }
```

- `enable` 是否启用个人微信适配器，请修改为 `true`
- `gewechat_url` 上一步部署的 Gewechat 容器地址，端口默认为 2531，不需要填写路径
- `gewechat_file_url` gewechat文件下载地址，端口默认为 2532，主机和 `gewechat_url` 相同，不需要填写路径
- `port` LangBot 监听 Gewechat 消息的端口，默认 2286，非必要勿修改
- `callback_url` 回调地址，是 Gewechat 容器推送消息给 LangBot 容器的地址，需要填写完整路径，例如 `http://langbot:2286/gewechat/callback`，端口与 `port` 一致，路径必须为 `/gewechat/callback`
- `app_id` 和 `token` **请勿填写**，这是用于存储登录信息的，在首次启动扫码登录后会自动保存

:::info
在这里我们将`gewechat_url`的主机名设置为`gewe`，即为上一步部署的 Gewechat 容器名称。  
将`callback_url`的主机名设置为`langbot`，即为上一步部署的 LangBot 容器名称。  

- 如果你按照本教程要求部署，使用上述默认的即可。
- 如果你使用了其他的容器名称，或者其他情况，请自行更改。
:::

## 启动 LangBot

按照部署 LangBot 文档中的启动命令启动 LangBot。

LangBot 启动后，会显示一个二维码，请使用个人微信扫描该二维码进行登录。

![alt text](/assets/image/zh/deploy/bots/gewechat/gewechat_01.png)

成功登录后，会显示登录信息，并开始监听个人微信消息。

![alt text](/assets/image/zh/deploy/bots/gewechat/gewechat_02.png)

:::info
登录后会将`app_id`和`token`保存到配置文件中，下次启动时不需要再次扫码登录。
:::

现在即可私聊或在群聊中与 LangBot 对话。