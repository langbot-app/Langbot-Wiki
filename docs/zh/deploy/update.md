# 更新 LangBot

## 使用 Docker（或基于 Docker 的一键部署）

请在 `docker/docker-compose.yaml` 目录下执行：

```bash
docker compose up --force-recreate --pull always -d
```

此命令将拉取最新的 LangBot 镜像并重建容器。

:::info
4.3.0 版本更改了 `docker/docker-compose.yaml` 文件的内容和位置，请[根据文档重新部署](/zh/deploy/langbot/docker)。
:::

## 手动部署

从 [Releases](https://github.com/langbot-app/LangBot/releases) 页面下载最新发行版的 Assets 下的 `langbot-<version>-all.zip`，解压到原来部署到目录重启即可。