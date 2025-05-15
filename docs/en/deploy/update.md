# Update LangBot

## Using Docker (or one-click deployment based on Docker)

Please execute in the `docker-compose.yaml` directory:

```bash
docker compose up --force-recreate --pull always -d
```

This command will pull the latest LangBot image and rebuild the container.

## Manual Deployment

Download the latest release's `langbot-<version>-all.zip` from the Assets section on the [Releases](https://github.com/RockChinQ/LangBot/releases) page, extract it to the original deployment directory, and restart.
