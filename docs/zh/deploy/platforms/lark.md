# 接入飞书机器人

## 创建机器人

前往[飞书开放平台](https://open.feishu.cn/app)，登录后，创建企业自建应用。

![alt text](/assets/image/lark_01.png)

![alt text](/assets/image/lark_02.png)

为应用添加机器人能力：
![alt text](/assets/image/lark_03.png)

在权限管理中添加图中所示权限：

![alt text](/assets/image/lark_04.png)

## 在 LangBot 中填写信息并启动

根据[填写配置信息](/deploy/quick-config/config)中的飞书适配器配置，填写相关信息。可以在`凭证与基础信息`页找到`app_id`和`app_secret`。

![alt text](/assets/image/lark_05.png)

```json
        {
            "adapter": "lark",
            "enable": true,
            "app_id": "cli_abcdefgh",
            "app_secret": "XXXXXXXXXX",
            "bot_name": "LangBot",
            "enable-webhook": false,
            "port": 2285,
            "encrypt-key": "xxxxxxxxx"
        },
```

注意：`bot_name`必须与创建机器人时填写的机器人名称相同。确保`enable`为`true`。  

填写完成后启动 LangBot，若成功配置，日志中会出现`[01-29 23:42:56.796] manager.py (68) - [INFO] : 初始化平台适配器 1: lark`的字样，保持 LangBot 运行。

:::warning
默认使用的是 WebSocket 长连接模式，对应下方的长连接订阅。但某些情况下（如国际版飞书）不具有长连接模式，此时需要使用 Webhook 模式，对应`将事件发送到开发者服务器`模式，请参考以下配置：

- `enable-webhook`：设置为`true`
- `encrypt-key`：设置为`事件与回调`页面的`加密策略`中的`Encrypt Key`

注意，在Webhook模式中，LangBot 需要部署在具有公网 IP 的服务器上，并确保防火墙已开放上方配置的端口。
:::

## 配置事件订阅

前往`事件与回调`页，配置订阅方式为`长连接`：

![alt text](/assets/image/lark_07.png)

并添加事件：`接收消息`

![alt text](/assets/image/lark_08.png)

:::warning
Webhook 模式配置方式：

![alt text](/assets/image/lark_13.png)

请先启动 LangBot，在此处填写你的服务器地址和端口，路径为`/lark/callback`，点击`保存`。

:::

## 发布机器人

点击顶部`创建版本`，填写版本号等信息，点击下方`保存`。

![alt text](/assets/image/lark_09.png)

在飞书群中添加机器人，即可使用：

![alt text](/assets/image/lark_10.png)

![alt text](/assets/image/lark_11.png)

私聊也可以直接使用

![alt text](/assets/image/lark_12.png)