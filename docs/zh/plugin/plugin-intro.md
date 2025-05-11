# 插件介绍

:::info 目录
[[toc]]
:::

## 插件分类

**插件**，是LangBot的扩展模块，其中包含**事件监听器**和**内容函数**两种可执行内容。事件监听器由主程序运行中的事件驱动，而内容函数由GPT生成的内容驱动。这两种驱动方式都统一包装在插件类中。

### 事件监听器

插件监听 LangBot 运行期间的各种事件，LangBot 在事件发生时，携带事件相关信息调用插件注册的监听器。插件可以通过注册监听器以在指定情况下被触发。

### 内容函数

内容函数不同于 通过事件触发插件，而是在对话期间，当对话内容符合内容函数的描述时，由 GPT 指定要调用的函数，并由 LangBot 进行调用。
这是基于 [GPT的Function Calling能力](https://platform.openai.com/docs/guides/gpt/function-calling) 实现的，这是一种嵌入对话中，由GPT自动调用的函数。

> 就是 ChatGPT官方插件 那种东西

例如我们为GPT提供一个函数`access_the_web`，并提供其详细的描述以及其参数的描述，那么当我们在与GPT对话时涉及类似以下内容时：

```
Q: 请搜索一下github上有那些QQ机器人项目？
Q: 请为我搜索一些不错的云服务商网站？
Q：阅读并总结这篇文章：https://zhuanlan.zhihu.com/p/607570830
Q：搜一下清远今天天气如何
```

GPT将会回复一个对`access_the_web`的函数调用请求，LangBot将调用插件提供的内容函数，并返回调用结果给GPT使其生成新的回复。  
当然，函数调用功能不止局限于网络访问，还可以实现图片处理、科学计算、行程规划等需要调用函数的功能，理论上我们可以通过内容函数实现与`ChatGPT Plugins`相同的功能。

## 插件用法

### 安装

> 这里只是给出了插件的基本安装方法，详细需查看各插件文档或咨询其开发者

#### 储存库克隆(推荐)

在运行期间，使用管理员账号对机器人私聊发送`!plugin get <GitHub储存库地址>`即可自动获取源码并安装插件，程序会根据仓库中的`requirements.txt`文件自动安装依赖库  

例如安装`hello_plugin`插件
```
!plugin get https://github.com/langbot-app/HelloPlugin
```

安装完成后重启程序。

#### 手动安装

将获取到的插件程序放置到`plugins`目录下，具体使用方式请查看各插件文档或咨询其开发者。

### 管理

#### !plugin 命令

```
!plugin                    列出所有已安装的插件
!plugin get <储存库地址>    从GitHub储存库地址安装插件(需要管理员权限)
!plugin update all         更新所有插件(需要管理员权限，仅支持从储存库安装的插件)
!plugin update <插件名>    更新指定插件
!plugin del <插件名>       删除插件(需要管理员权限)
!plugin on <插件名>        启用插件(需要管理员权限)
!plugin off <插件名>       禁用插件(需要管理员权限)

!func                      列出所有内容函数
```

#### plugins/plugins.json 配置文件

程序启动时，会同步这里的设置和实际加载的插件设置。

**这个文件内容是由程序自动生成的，不要手动添加或删除项目，仅可修改优先级和启用状态**，修改后需重启。

示例：

```json
"plugins": [
    {
        "name": "Nahida",
        "description": "Hello Nahida",
        "version": "0.1",
        "author": "RockChinQ",
        "source": "",   
        "main_file": "plugins/Nahida/main.py",
        "pkg_path": "plugins/Nahida/",
        "priority": 0,  
        "enabled": true   
    }
]
```

`source`：源码地址，若无内容，则表示这个插件不支持程序自动更新

`priority`： 插件运行优先级，在初始化、事件调用时，高优先级的插件将优先被处理

`enabled`：设置为false时，不会初始化，也不会被调用

## 插件列表

以下是部分插件列表，所有插件请查看[RockChinQ的Star集](https://github.com/stars/RockChinQ/lists/qchatgpt-%E6%8F%92%E4%BB%B6)

- [ElvisChenML/Waifu](https://github.com/ElvisChenML/Waifu) - 一个LangBot的插件，旨在利用程式逻辑搭配LLM创建真实感聊天机器人，探索真实的聊天体验。
- [WebwlkrPlugin](https://github.com/RockChinQ/WebwlkrPlugin) - 让机器人能联网！！
- [https://github.com/the-lazy-me/NewChatVoice](https://github.com/the-lazy-me/miHoYoVoice) - LangBot语音插件，可利用多个TTS平台实现语音聊天
- [Yuumi0221/URLMaskerPlugin](https://github.com/Yuumi0221/URLMaskerPlugin) - 用于掩码（替换）URL，以应对QQ官方机器人API对消息中URL的限制
- [Pevernow/LangBot_Plugin_Emoticon_v3](https://github.com/Pevernow/QChatGPT_Plugin_Emoticon_v3) - LangBot v3可用，基于在线api的表情包插件。
- [https://github.com/kirifujinagisa/RussianRoulette](https://github.com/kirifujinagisa/RussianRoulette) - 一个 LangBot 俄罗斯轮盘赌的游戏插件
-  [https://github.com/kirifujinagisa/FileSender](https://github.com/kirifujinagisa/FileSender) - 基于 LangBot 的将本机指定文件发送给申请人的插件
- [https://github.com/ElvisChenML/GalgameMaker](https://github.com/ElvisChenML/GalgameMaker) - LangBot 插件，用于快速生成在QQ对话中进行的Galgame。
- [https://github.com/zzseki/QChatGPT_Plugin_News](https://github.com/zzseki/QChatGPT_Plugin_News) - 无介绍(看仓库名猜一下吧)
- [https://github.com/zzseki/QChatGPT_Plugin_Weather ](https://github.com/zzseki/QChatGPT_Plugin_Weather)- 无介绍(看仓库名猜一下吧)
- [https://github.com/zzseki/QChatGPT_Plugin_Music](https://github.com/zzseki/QChatGPT_Plugin_Music) - 无介绍(看仓库名猜一下吧)
- [https://github.com/inkOrCloud/Markdown2IMG](https://github.com/inkOrCloud/Markdown2IMG) - LangBot插件,将markdown文本转为图片输出
- [https://github.com/Annalasu/QcPlugin_Md2QQImage](https://github.com/Annalasu/QcPlugin_Md2QQImage) - 将消息中的md图片链接显示为正常图片
- [https://github.com/the-lazy-me/SillyTavernPlugin](https://github.com/the-lazy-me/SillyTavernPlugin) - LangBot插件，可将酒馆SillyTavern的角色卡转写，以适配LangBot的人格预设