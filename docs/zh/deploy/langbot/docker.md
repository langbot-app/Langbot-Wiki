# Docker部署

:::warning 
建议您先学习以下内容：

 - `Docker` 和 `Docker Compose` 的使用  
 - Docker 容器间网络通信配置方式  
::: 

:::info
- 请先确保 Git、 Docker 和 Docker Compose 已安装
- 推荐使用[阿里云，服务器价格低至 38 元一年，更可以享受8折优惠](https://www.aliyun.com/minisite/goods?userCode=ys4ad8gs)
:::

Git 克隆本项目：

```bash
git clone https://github.com/RockChinQ/LangBot
cd LangBot
```

启动容器：

```bash
docker compose up
```

首次启动会输出创建配置文件的提示，请继续按照文件配置。

容器会映射`5300`端口供 WebUI 使用，您可以访问`http://127.0.0.1:5300`查看 WebUI。  
还会映射`2280-2290`端口供使用 OneBot 协议的消息平台适配器反向连接。

完成 LangBot 部署后，请继续阅读：

- [配置机器人文档](/zh/deploy/platforms/readme)。
- [配置模型文档](/zh/deploy/models/readme)。
