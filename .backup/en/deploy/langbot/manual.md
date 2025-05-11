# Manual Deployment (Recommended, Works on All Platforms)

:::warning
1. Please use Python 3.10.1 (excluding 3.10.0) or higher. Version 3.10.14 is recommended. If you don't have Python installed, you need to install it yourself.
:::

## Installing the Main Program

1. Go to the [Release](https://github.com/RockChinQ/LangBot/releases) page and download the latest version of the compressed package (recommended) `langbot-xxx-all.zip` (do not download the Source Code as it does not include the WebUI). Extract the package and open the command line (terminal) in the extracted directory.

![Download Release](/assets/image/dl_release.png)

:::info

You can also use the following command to clone the latest code (which may contain unstable code) and use it:

```bash
git clone https://github.com/RockChinQ/LangBot
cd LangBot

# Build the frontend, requires NodeJS >= 22
cd web
npm install && npm run build
cd ..
```
:::

2. (Recommended) Create a virtual environment

On some Linux systems that use the system package manager to manage Python dependencies, dependency conflicts may occur. Therefore, please use venv to create a virtual environment. Windows users can skip this step.

```bash
python -m venv venv
source venv/bin/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

Or use the Tsinghua mirror

```bash
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple 
```

3. Run the main program once to generate the configuration file

```bash
python main.py
```

The following message will be displayed

```
 _                   ___      _   
| |   __ _ _ _  __ _| _ ) ___| |_ 
| |__/ _` | ' \/ _` | _ \/ _ \  _|
|____\__,_|_||_\__, |___/\___/\__|
               |___/              

⭐️Open Source Address: https://github.com/RockChinQ/LangBot
📖Documentation Address: https://docs.langbot.app

The following files do not exist and have been automatically generated. Please modify the configuration files as needed and restart:
- plugins/__init__.py
- plugins/plugins.json
- data/config/command.json
- data/config/pipeline.json
- data/config/platform.json
- data/config/provider.json
- data/config/system.json
- data/config/sensitive-words.json
- data/scenario/default.json
```

You can now exit the program using Ctrl+C and continue to the [Deploying Message Platform](/deploy/platforms/aiocqhttp/napcat.html) page.

After deploying the message platform and filling in the configuration files, run the program again:
```bash
python main.py
```