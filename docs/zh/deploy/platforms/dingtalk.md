# 部署钉钉机器人

部署 LangBot 到钉钉。

## 创建机器人

进入 [钉钉开发者后台](https://open-dev.dingtalk.com/?spm=ding_open_doc.document.0.0.74f445e5MkawbT#/)，登录并且进入组织。登录成功后进入开放平台，是这样的：
![钉钉开放平台](/assets/image/zh/deploy/bots/dingtalk/dingtalk1.png)

点击上方的 `应用开发`,然后点击右面蓝色的按钮 `创建应用`，填写机器人的基本信息，点击保存。

进入机器人的后台，比如我们有机器人 langbot2 ,那么它的管理页面是这样的：
![机器人页面](/assets/image/zh/deploy/bots/dingtalk/dingtalk2.png)

## 配置机器人

点击 `添加应用能力`，`其他应用能力`，`机器人`中的 `配置`，点击配置并且填写信息之后，如下图：
![机器人配置](/assets/image/zh/deploy/bots/dingtalk/dingtalk3.png)

点击页面下方的`发布`，发布成功之后，点击机器人页面中左侧最下方的`版本管理与发布`，如图：
![版本管理与发布](/assets/image/zh/deploy/bots/dingtalk/dingtalk4.png)

如果是第一次创建机器人，那么右边是空的，需要点击`创建新版本`，在其中设置信息，然后设置`应用可见范围`，点击保存。

点击`事件订阅`，将其中的推送方式改为`Stream模式推送`。

## 填写配置信息

点击`凭证与基础信息`，记录`Client ID` 和 `Client Secret`，
点击`应用能力`，`机器人`，记录下 RobotCode 和 机器人名称。
`markdown_card` 为是否启用 Markdown 形式的回复，当此配置项关闭时，`@发送者` 配置开关不会生效。
将以上配置项 记录下来，填到 LangBot 机器人配置表单中。

![对接 LangBot](/assets/image/zh/deploy/bots/dingtalk/connect_to_langbot.png)

**启动 LangBot** 。

## 添加机器人

本文使用钉钉 windows 桌面版举例，点击上方的`搜索`，`功能`，然后输入刚才机器人创建的名称，如图：
![robot_png](/assets/image/zh/deploy/bots/dingtalk/dingtalk5.png)

点击机器人即可和机器人聊天。

如果想要添加到群里，那么点击钉钉群的`群管理`，`机器人`，`添加机器人`，然后搜索机器人名称就可以在群中使用。



