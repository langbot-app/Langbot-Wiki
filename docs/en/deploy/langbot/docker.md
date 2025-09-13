# Docker Deployment

:::warning 
It is recommended that you first learn the following:

 - Usage of `Docker` and `Docker Compose`  
 - Docker container network communication configuration methods  
::: 

:::info
- Please ensure Git, Docker, and Docker Compose are installed
:::

Clone the project:

```bash
git clone https://github.com/langbot-app/LangBot
cd LangBot/docker
```

Start the container:

```bash
docker compose up
```

The container maps port `5300` for WebUI access. You can visit `http://127.0.0.1:5300` to view the WebUI.  
It also maps ports `2280-2290` for reserved for message platform adapters.

After completing the LangBot deployment, please continue reading:

- [Bot Configuration Documentation](/en/deploy/platforms/readme).
- [Model Configuration Documentation](/en/deploy/models/readme).
