# Manual Deployment

:::warning
1. Please use Python 3.10.1 (not including 3.10.0) or higher version, 3.10.14 is recommended. You need to install Python if you don't have it.
2. This method is not recommended, manual deployment may not be supported in the future. Please consider using Docker deployment.
:::

## Installing the Main Program

1. Go to the [Release](https://github.com/langbot-app/LangBot/releases) page to download the latest version of the zip package (recommended) `langbot-xxx-all.zip` (do not download Source Code as it does not include WebUI). Extract it and open a command line (terminal) in the extracted directory.

![Download Release](/assets/image/zh/deploy/langbot/manual/dl_release.png)

:::info

You can also use the following commands to clone the latest code (may contain unstable code) and use it:

```bash
# Clone the main repository
git clone https://github.com/langbot-app/LangBot
cd LangBot
```

Then manually build the frontend:

```bash
# Build frontend, requires NodeJS >= 22
cd web
npm install && npm run build
cd ..
```

:::

2. Install dependencies

We use uv to manage dependencies.

```bash
pip install uv
uv sync
```

3. Run the main program once to generate configuration files

```bash
uv run main.py
```

You will see the following message:

```
 _                   ___      _   
| |   __ _ _ _  __ _| _ ) ___| |_ 
| |__/ _` | ' \/ _` | _ \/ _ \  _|
|____\__,_|_||_\__, |___/\___/\__|
               |___/              

⭐️Open Source: https://github.com/langbot-app/LangBot
📖Documentation: https://docs.langbot.app

The following files do not exist and have been automatically generated. Please modify the configuration files as needed and restart:
- plugins/__init__.py
...
```

You can now use Ctrl+C to exit the program and continue to the [Deploy Bots](/en/deploy/platforms/readme) page.
