# 在 LangBot 上接入 Dify（NewAPI 中转方案）

::: info 
本文由社区贡献者编写。  
现已支持直接接入 Dify Service API 使用，请参考 [如何接入 Dify？](./dify-service-api)
:::

[Dify](https://dify.ai/) 是一个开源的 AI 应用开发平台，支持多种 AI 模型和丰富的插件，用于快速搭建 AI Agent、Workflow 等应用。通过中间件，我们可以在 LangBot 上使用 Dify 功能。

::: warning 
本教程使用的为 Linux 系统且已配置好 LangBot 的消息平台为前提，如您完全没有听说过 Linux 或者没有听说过 Debian 请不要使用此教程。如 LangBot 没部署，请先配置好 LangBot 再来参考此教程。
:::

## 安装并配置 Docker

Dify 推荐使用 Docker 安装，如果你已经使用 Docker 启动 LangBot，那么你可以跳过此步骤。

```bash
# Debian使用：
apt update
apt install -y docker docker-compose-plugin
# ubuntu使用：
apt update
apt install -y docker docker-compose-v2
```

国内封禁了 docker 的镜像站，但是正常情况下又无法使用官方镜像站，因此需要修改为目前可用的镜像站 https://docker.1panel.live

使用 vim 编辑器编辑 `/etc/docker/daemon.json` 文件

```bash
vim /etc/docker/daemon.json
```

里面应该是空的
然后按“I”键进入编辑模式将下方内容粘贴进去

```json
{
  "registry-mirrors": ["https://docker.1panel.live"]
}
```

![配置 Docker](/assets/image/dify_01.png)

然后按 `Esc` 键退出编辑模式，输入 `:wq` 保存并退出。

重启 docker 服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

使用 `docker info` 检查是否更换成功

![检查 Docker](/assets/image/dify_02.png)

## 安装并配置 Dify

首先安装 git

```bash
apt install -y git
```

使用 git 拉取 dify 源码，进入 Docker 目录

```bash
git clone https://github.com/langgenius/dify.git
cd dify/docker
```

复制环境配置文件并启动

```bash
cp .env.example .env
docker compose up -d
```

![启动 Dify](/assets/image/dify_03.png)

时间较长，耐心等待。

等待容器全部运行成功之后，大概等2-3分钟之后，使用浏览器进入 `http://你的服务器地址` 进行首次初始化。

设置管理员账号邮箱和密码，设置完成后进入 dify。

点击左上角的用户，找到设置并点击

![Dify 设置](/assets/image/dify_04.png)

然后点击`模型供应商`

![Dify 模型供应商](/assets/image/dify_05.png)

这里我已经根据自己需求添加好了。

前往工作室→创建空白应用，选择`聊天助手`

> 基础编排：可实现较少，但配置简单  
> 工作流编排：可基于工作流程实现复杂功能，但配置难，不适合新手  
> 
> 根据自身选择。

![Dify 创建应用](/assets/image/dify_06.png)

填写名称等基本信息，点击创建

![Dify 进入应用](/assets/image/dify_07.png)

右上角选择模型。
设置完成后点击右上角的发布→更新。进行更新，如不更新则无法使用

![Dify 更新应用](/assets/image/dify_08.png)

然后点击访问api，点击右上角API密钥→创建密钥 复制生成的密钥内容

![Dify 创建密钥](/assets/image/dify_09.png)

![Dify 复制密钥](/assets/image/dify_10.png)

Dify配置部分结束。

## 部署中间件 NewAPI

Dify 的 api 并不是使用的 openai api 的标准，因此需要使用中转。

使用的是 [new-api](https://github.com/Calcium-Ion/new-api)。

安装 wget

```bash
apt install -y wget
```

在~目录下新建目录存放new-api

```bash
mkdir ~/new-api
```

下载New-api

```bash
cd new-api
```

arm64使用：

```bash
wget https://github.com/Calcium-Ion/new-api/releases/download/v0.2.9.7/one-api-arm64
```

x86/64使用：

```bash
wget https://github.com/Calcium-Ion/new-api/releases/download/v0.2.9.7/one-api
```

(arm64一般为开发板，如你不知道什么是开发板或者不知道arm64则直接使用X86/64)

安装screen作为进程管理

```bash
apt install -y screen
```

使用

```bash
screen -R 名称
```

新建，如果存在相同名称则进入

```bash
cd ~/new-api
```

添加权限

```bash
chmod 775 new-api
```

运行new-api

```bash
./new-api
```

等待运行完成

```bash
Ctrl+a+d
```

退出当前窗口（后台运行）

使用浏览器进入：

```bash
http://你的服务器地址:3000/
```

默认用户名：root  
默认密码：123456

登录成功之后前往
`用户管理→编辑→密码`
修改root密码。
修改完毕后点击
`渠道→添加渠道`

![New-api 添加渠道](/assets/image/dify_11.png)

类型处选择 dify，填写名称，点击 填入相关模型
填写密钥，密钥为在dify配置中生成的密钥内容。

![New-api 填入模型](/assets/image/dify_12.png)

前往new-api的令牌页，点击添加令牌，根据提示信息填写基本信息 名称，过期信息及额度根据自身需要决定是否设置。

![New-api 添加令牌](/assets/image/dify_13.png)

点击提交后，找到新建的令牌，将鼠标移动至`查看`并复制出现的 sk- 开头内容。

new-api基本配置完成其余内容自行根据需要配置。

## 配置 LangBot

使用 OpenAI provider，将 NewAPI 的 地址作为 API 地址，将 NewAPI 的 key 作为 API Key。

![LangBot 修改 key](/assets/image/dify_14.png)

重启 LangBot 项目，接入 dify 已完成。
