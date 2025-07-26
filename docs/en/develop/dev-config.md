# Development Configuration

> This document is based on LangBot version 4.0

LangBot is divided into frontend and backend. The frontend is developed using Next.js + shadcn, and the backend is developed using Quart (an asynchronous version of Flask).

## Backend

The code is located in the `pkg` directory and is started by the `main.py` file in the root directory.

Install dependencies, we use uv to manage dependencies.

```bash
pip install uv
uv sync
```

Start the backend

```bash
uv run main.py
```

At this point, the configuration file will be automatically generated in the `data/config.yaml` file.

## Frontend

The code is located in the `web` directory and requires Node.js.

Copy `.env.example` to `.env` and fill in the values.

```bash
cp .env.example .env
```

Recommended to use [pnpm](https://pnpm.io/installation) to install dependencies.

```bash
pnpm install
pnpm dev
```

:::info
When using `pnpm dev` to start locally, the environment variable `NEXT_PUBLIC_API_BASE_URL` will be automatically used by the frontend to ensure that the frontend can access the `5300` port of the locally running backend.

In production environments, the frontend will be precompiled into static files and provided by the backend, and the frontend will automatically access the backend address on the same domain.
:::

## API Documentation

We will write API documentation in APIFox before developing each interface. Please refer to [API Documentation(Chinese)](https://ok52vhsenr.apifox.cn/).
