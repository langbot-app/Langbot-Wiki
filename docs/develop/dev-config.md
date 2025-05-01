# 开发配置

> 此文档基于 LangBot 4.0 版本编写

LangBot 分为前端和后端，前端使用 Next.js 开发，后端通过 Quart（Flask 的异步版本）开发。

## 后端

代码位于 `pkg` 目录下，由根目录的 `main.py` 文件引导启动。  

安装依赖

```bash
pip install -r requirements.txt
```

启动后端

```bash
python main.py
```

此时配置文件会自动生成到 `data/config.yaml` 文件中。

