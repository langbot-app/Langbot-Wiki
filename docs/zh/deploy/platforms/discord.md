# 接入 Discord 机器人

## 创建机器人

前往[Discord 开发者门户](https://discord.com/developers/applications)，登录后，创建应用。

![alt text](/assets/image/discord_01.png)

修改基础信息，点击`Save Changes`保存。

![alt text](/assets/image/discord_02.png)

点击左侧`Bot`，点击`Reset Token`，复制生成的 Token。

![alt text](/assets/image/discord_03.png)

并在此页面的`Privileged Gateway Intents`中勾选所有选项，点击`Save Changes`保存。

![alt text](/assets/image/discord_05.png)

**最后，点击左侧`OAuth2`，复制页面上的`Client ID`。**

## 在 LangBot 中填写信息并启动

根据[填写配置信息](/deploy/quick-config/config)中的 Discord 适配器配置，填写相关信息。
将上一步获取的`Client ID`和`Token`填写到配置中。

![alt text](/assets/image/discord_04.png)

:::warning
如果你在中国大陆境内使用此适配器，可能需要设置网络代理，具体请查看[system.json配置文件](/config/function/system.html#网络代理-network-proxies)。或直接通过环境变量`http_proxy`设置。
:::

填写完成后启动 LangBot，若成功配置，日志中会出现`[02-02 16:48:15.263] manager.py (68) - [INFO] : 初始化平台适配器 1: discord`的字样，保持 LangBot 运行。

## 邀请机器人到服务器

你需要先创建一个服务器，然后邀请机器人到服务器。

前往`OAuth2`页面，选择`URL Generator`，选择`bot`，按照图中所示勾选权限。

![alt text](/assets/image/discord_06.png)

![alt text](/assets/image/discord_07.png)

点击`Copy`，将生成的 URL 粘贴到浏览器中打开，邀请机器人到你的服务器。

![alt text](/assets/image/discord_08.png)

## 使用机器人

现在在群里或者私聊机器人都可以正常使用了。

![alt text](/assets/image/discord_09.png)