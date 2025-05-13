# Update LangBot

This guide explains how to update your LangBot installation to the latest version.

## Docker Deployment

If you deployed LangBot using Docker, follow these steps to update:

1. Pull the latest image:

```bash
docker pull rockchin/langbot:latest
```

2. Stop and remove the current container:

```bash
docker stop langbot
docker rm langbot
```

3. Start a new container with the latest image:

```bash
docker run -d --name langbot \
  -p 5300:5300 \
  -v /path/to/data:/app/data \
  rockchin/langbot:latest
```

Replace `/path/to/data` with the path to your data directory.

## Manual Deployment

If you deployed LangBot manually, follow these steps to update:

1. Navigate to your LangBot directory:

```bash
cd /path/to/langbot
```

2. Pull the latest changes:

```bash
git pull
```

3. Update dependencies:

```bash
pip install -r requirements.txt
```

4. Restart LangBot:

```bash
python main.py
```

## Baota Panel Deployment

If you deployed LangBot using the Baota Panel, follow these steps to update:

1. Log in to your Baota Panel
2. Navigate to the LangBot website
3. Click on "Site Settings"
4. Click on "Update from Git"
5. Click "Update" to pull the latest changes
6. Restart the website

## Configuration Changes

After updating, check the [release notes](https://github.com/RockChinQ/LangBot/releases) for any configuration changes. You may need to update your `data/config.yaml` file to accommodate new features or changes.

## Database Migration

LangBot automatically handles database migrations during updates. However, it's always a good idea to back up your data directory before updating.

## Troubleshooting

If you encounter issues after updating, check the following:

1. Make sure your configuration file is compatible with the new version
2. Check the logs for any error messages
3. Ensure all dependencies are installed correctly
4. Verify that your model providers are still configured correctly

If problems persist, you can:

1. Join the [community chat](https://qm.qq.com/q/Nnz7Vbj8OU) for help
2. Open an issue on [GitHub](https://github.com/RockChinQ/LangBot/issues)
3. Revert to a previous version if necessary
