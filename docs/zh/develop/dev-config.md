# 开发配置

> 此文档基于 LangBot 4.0 版本编写

LangBot 分为前端和后端，前端使用 Next.js + shadcn 开发，后端通过 Quart（Flask 的异步版本）开发。

## 后端

代码位于 `pkg` 目录下，由根目录的 `main.py` 文件引导启动。  

安装依赖，我们使用 uv 管理依赖。

```bash
pip install uv
uv sync
```

启动后端

```bash
uv run main.py
```

此时配置文件会自动生成到 `data/config.yaml` 文件中。

## 前端

代码位于 `web` 目录下，需要安装 Node.js。

安装依赖

```bash
npm install
```

启动调试

```bash
npm run dev:local            linux等环境使用
npm run dev:local:win        windows环境使用
```

:::info
本地使用`dev:local`启动时，会携带环境变量`NEXT_PUBLIC_API_BASE_URL`，该变量会自动被前端使用，以确保前端可以访问到本地启动的后端的`5300`端口。如果您需要修改所使用的后端地址或端口，请到`web/package.json`文件中修改`scripts`中的`dev:local`命令。

生产环境中，前端会被预编译成静态文件，由后端提供服务，前端会自动访问同域的后端地址。
:::

## API 文档

我们在开发每个接口之前都会先在 APIFox 中编写接口文档，请查看 [API 文档](https://ok52vhsenr.apifox.cn/)。
