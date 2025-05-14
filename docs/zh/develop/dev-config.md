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

去`web/src/app/infra/http/HttpClient.ts`文件中，将最底部的`export const httpClient = new HttpClient('/');`修改为`export const httpClient = new HttpClient('http://localhost:5300');`，以确保前端可以访问到独立的后端。

启动调试

```bash
npm run dev
```