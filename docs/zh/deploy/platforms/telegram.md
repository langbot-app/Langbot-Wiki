# 接入 Telegram 机器人

## 创建机器人

前往 [Telegram 机器人创建页面](https://t.me/botfather)，按照提示操作，创建一个机器人。

![Telegram 机器人创建](/assets/image/telegram_01.png)

![Telegram 机器人创建](/assets/image/telegram_02.png)

创建完成后，BotFather 会返回一个 API Token，请妥善保存。接下来关闭`Privacy Mode`，以便在群聊中使用。

![Telegram 机器人 API Token](/assets/image/telegram_03.png)

## 在 LangBot 中填写信息并启动

根据[填写配置信息](/deploy/quick-config/config)中的 Telegram 适配器配置，填写相关信息。
将上一步获取的 API Token 填写到配置中，`markdown_card` 选项为是否启用 Markdown 形式的回复。 

```json
        {
            "adapter": "telegram",
            "enable": true,
            "token": "xxxxxxx",
            "markdown_card":false
        },
```

填写完成后启动 LangBot，若成功配置，日志中会出现`[02-02 16:48:15.263] manager.py (68) - [INFO] : 初始化平台适配器 1: telegram`的字样，保持 LangBot 运行。

## 使用机器人

现在在群里或者私聊机器人都可以正常使用了。

![Telegram 机器人使用](/assets/image/telegram_04.png)

![Telegram 机器人使用](/assets/image/telegram_05.png)