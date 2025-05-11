# Docker部署(仅推荐在Linux上使用)

:::warning 
请**确保**您具有以下能力：  
 - 了解 `Docker` 和 `Docker Compose` 的使用  
 - 了解容器间网络通信配置方式  
 - 了解容器文件挂载机制
 - 动手能力强、资料查找能力强
::: 

:::info
请先确保 Git、 Docker 和 Docker Compose 已安装
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
还会映射`2280-2290`端口供使用 OneBot 协议的消息平台适配器反向连接，请继续阅读[消息平台接入文档](/deploy/platforms/aiocqhttp/napcat)。

## 注意

- 安装的插件都会保存在`plugins`(映射到本目录`plugins`)，安装插件时可能会自动安装相应的依赖，此时若`重新创建`容器，已安装的插件将被加载，但所需的增量依赖并未安装，会导致引入问题。您可以删除插件目录后重启，再次安装插件，以便程序可以自动安装插件所需依赖。