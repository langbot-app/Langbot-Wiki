# Update LangBot

## Using Docker (or one-click deployment based on Docker)

Please execute in the directory you cloned LangBot:

```bash
git pull
```

Please execute in the `docker/` directory:

```bash
docker compose up --force-recreate --pull always -d
```

This command will pull the latest LangBot image and rebuild the container.

:::info
4.3.0 version changed the content and location of the `docker-compose.yaml` file, if you updated from a previous version, please [redploy according to the documentation](/en/deploy/langbot/docker).
:::

## Manual Deployment

Download the latest release's `langbot-<version>-all.zip` from the Assets section on the [Releases](https://github.com/langbot-app/LangBot/releases) page, extract it to the original deployment directory, and restart.
