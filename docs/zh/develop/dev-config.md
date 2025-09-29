# 开发配置

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

代码位于 `web` 目录下，需要安装 Node.js，[pnpm](https://pnpm.io/zh/installation)。

复制 `.env.example` 到 `.env`。

- linux环境使用

```bash
cp .env.example .env
```

- windows环境使用

```bash
copy .env.example .env
```

安装依赖并启动前端

```bash
pnpm install
pnpm dev

# 若未安装pnpm，也可以使用npm来解决依赖并启动
npm install
npm run dev
```

然后根据输出信息，访问`http://127.0.0.1:3000`查看独立启动的前端页面。

:::info
本地使用`pnpm dev`启动时，会携带`.env`中的环境变量`NEXT_PUBLIC_API_BASE_URL`，该变量会自动被前端使用，以确保前端可以访问到本地启动的后端的`5300`端口。

生产环境中，前端会被预编译成静态文件，由后端提供服务，前端会自动访问同域的后端地址。
:::

## API 文档

我们在开发每个接口之前都会先在 APIFox 中编写接口文档，请查看 [API 文档](https://ok52vhsenr.apifox.cn/)。
