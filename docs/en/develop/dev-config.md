# Development Configuration

> This document is based on LangBot version 4.0

LangBot is divided into frontend and backend. The frontend is developed using Next.js + shadcn, and the backend is developed using Quart (an asynchronous version of Flask).

## Backend

The code is located in the `pkg` directory and is started by the `main.py` file in the root directory.

Install dependencies

```bash
pip install -r requirements.txt
```

Start the backend

```bash
python main.py
```

At this point, the configuration file will be automatically generated in the `data/config.yaml` file.

## Frontend

The code is located in the `web` directory and requires Node.js.

Install dependencies

```bash
npm install
```

Go to the `web/src/app/infra/http/HttpClient.ts` file and change `export const httpClient = new HttpClient('/');` at the bottom to `export const httpClient = new HttpClient('http://localhost:5300');` to ensure the frontend can access the standalone backend.

Start debugging

```bash
npm run dev
```
