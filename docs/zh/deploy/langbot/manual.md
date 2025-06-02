# 手动部署

:::warning
1. 请使用Python 3.10.1（不包含3.10.0）及以上版本，推荐3.10.14版本，没有Python的需自行安装。
2. 不推荐此方式，后续可能不再支持手动部署，请考虑使用 Docker 部署。
::: 


## 安装主程序

1. 前往[Release](https://github.com/RockChinQ/LangBot/releases)页面下载最新版本的压缩包（推荐）`langbot-xxx-all.zip`（请勿下载 Source Code，因为其中不包含 WebUI）。解压，在解压目录打开命令行（终端）

![下载Release](/assets/image/zh/deploy/langbot/manual/dl_release.png)

:::info

您也可以使用以下命令克隆最新代码（有可能包含不稳定的代码）并使用：

```bash
# 克隆主仓库
git clone https://github.com/RockChinQ/LangBot
cd LangBot
```

若您位于中国大陆境内，可以从 [GitCode 镜像](https://gitcode.com/RockChinQ/LangBot) 克隆：

```bash
git clone https://gitcode.com/RockChinQ/LangBot
cd LangBot
```

接下来手动构建前端：

```bash
# 构建前端，需要 NodeJS >= 22
cd web
npm install && npm run build
cd ..
```

:::

2. 安装依赖

我们使用 uv 管理依赖。

```bash
pip install uv
uv sync
```

或者使用清华源

```bash
pip install uv -i https://pypi.tuna.tsinghua.edu.cn/simple
uv sync
```

3. 运行一次主程序，生成配置文件

```bash
uv run main.py
```

提示如下信息

```
 _                   ___      _   
| |   __ _ _ _  __ _| _ ) ___| |_ 
| |__/ _` | ' \/ _` | _ \/ _ \  _|
|____\__,_|_||_\__, |___/\___/\__|
               |___/              

⭐️开源地址: https://github.com/RockChinQ/LangBot
📖文档地址: https://docs.langbot.app

以下文件不存在，已自动生成，请按需修改配置文件后重启：
- plugins/__init__.py
...
```

接下来可以使用 Ctrl+C 退出程序，继续查看[部署机器人](/zh/deploy/platforms/readme)页。

:::info
LangBot 在每次启动时会检查所有插件的依赖以便确保所有插件都能正常运行。  
如果由于网络问题导致 LangBot 无法正常检查依赖，可以提供`--skip-plugin-deps-check`参数跳过检查，并自行安装插件依赖：命令行切换目录到`plugins`目录下的每个子文件夹（若已安装插件），然后使用`uv sync`安装依赖。
:::