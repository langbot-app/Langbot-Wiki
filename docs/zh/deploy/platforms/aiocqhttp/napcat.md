# 部署消息平台 NapCat

## NapCat安装教程

按照 [NapCat 官方文档安装](https://napcat.napneko.icu/guide/start-install)

## NapCat配置教程

仅以 webui 操作为例，其他的配置方式请查看 NapCat 文档。

登录后，在控制台或Bash上可以查看日志 , 找到 `[NapCat] [WebUi] WebUi Publish Panel Url: http://x.x.x.x:6099/webui?token=xxxxx ` 
![napcat_webui_0](/assets/image/napcat_webui_0.png)

复制Url到浏览器或者 Windows11 按照Ctrl点击Url即可 扫码登录后即可进入网络配置一页

点击添加网络配置 WebSocket客户端 点击启用 然后在Url一栏填入 `ws://127.0.0.1:2280/ws`  并保存即可
![napcat_webui_1](/assets/image/napcat_webui_1.png)
![napcat_webui_2](/assets/image/napcat_webui_2.png)

::: info
- 端口号取决于 `data/config/platform.json` 中 `aiocqhttp` 的 `port` 字段，默认是 2280，请查看[填写配置信息](/deploy/quick-config/config)继续配置。
- 必须使用 WebSocket Client（反向 WS） 连接 LangBot，注意根据实际情况修改 IP 地址和端口，后缀必须为`/ws`。  
- 如果 LangBot 和 NapCat 均运行在容器中，请参考[容器网络配置](/deploy/network-details)。
:::

接下来请阅读[填写配置信息](/deploy/quick-config/config)。
