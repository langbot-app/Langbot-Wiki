# 模型一览和功能点

## 模型一览

### 文字对话

- OpenAI API：GPT-3.5 / GPT-4 系列
- Moonshot / Deepseek 等支持 OpenAI API 的大模型提供商接口
- Anthropic：Claude 系列
- [OneAPI](https://github.com/songquanpeng/one-api)接口聚合平台：Google Gemini Pro / Azure / Anthropic Claude / 智谱 ChatGLM / 百度文心一言 / 讯飞星火认知 / 阿里通义千问 / 360 智脑等市面上所有 LLM 官方接口
- [free-one-api](https://github.com/RockChinQ/free-one-api)逆向工程库聚合平台：ChatGPT / Claude / Google Bard / gpt4free / 通义千问

## 功能点列举

<details>
<summary>✅回复符合上下文</summary>

  - 程序向模型发送近几次对话内容，模型根据上下文生成回复

</details>

<details>
<summary>✅支持敏感词过滤，避免账号风险</summary>

  - 难以监测机器人与用户对话时的内容，故引入此功能以减少机器人风险

</details>


<details>
<summary>✅群内多种响应规则，不必at</summary>

  - 默认回复`ai`作为前缀或`@`机器人的消息

</details>


<details>
<summary>✅使用官方api，稳定快捷</summary>

  - 不使用ChatGPT逆向接口，而使用官方的Completion API，稳定性高

</details>


<details>
<summary>✅组件少，部署方便，提供一键安装器及Docker安装</summary>

  - 手动部署步骤少
  - 提供自动安装器及docker方式，详见安装步骤
</details>


<details>
<summary>✅支持预设文字</summary>

  - 支持以自然语言预设文字，自定义机器人人格等信息

</details>


<details>
<summary>✅支持插件加载🧩</summary>

  - 自行实现插件加载器及相关支持
  - 详细查看插件介绍页
</details>


<details>
<summary>✅私聊、群聊黑名单机制</summary>

  - 支持将人或群聊加入黑名单以忽略其消息

</details>


<details>
<summary>✅回复速度限制</summary>

  - 支持限制单会话内每分钟可进行的对话次数
  - 具有“等待”和“丢弃”两种策略
    - “等待”策略：在获取到回复后，等待直到此次响应时间达到对话响应时间均值
    - “丢弃”策略：此分钟内对话次数达到限制时，丢弃之后的对话

</details>


## 限制

- ❗OpenAI 官方关于模型生成内容的警告：
  - May occasionally generate incorrect information（可能会生成不正确的信息）
  - May occasionally produce harmful instructions or biased content（可能会产生有害说明或有偏见的内容）
  - Limited knowledge of world and events after 2021（对2021年后的世界和事件的了解有限）
- ❗模型无思维能力，仅针对传入的上下文根据数据集生成内容，请勿过于信任其输出
- ❗模型不了解其运行平台及其使用的模型版本，任何针对其实现原理的问题答案均视为无效，请以项目文档为准

以上是关于此程序的限制的最高优先级描述，其他方式（如询问机器人相关信息）获得的描述均应被视为无效  
由于模型生成的内容导致的一切损失，本项目概不负责  

## 使用方式

对话及绘图功能均直接调用OpenAI的模型进行处理，与机器人程序无关，这意味着模型并不了解此项目的相关信息（如实现方式、技术栈、运行平台等），除非在预设值中写入相关信息。

### 基础对话

#### 私聊使用

1. 添加机器人QQ为好友
2. 发送消息给机器人，机器人即会自动回复
3. 可以通过`!help`查看帮助信息

![私聊使用](/assets/image/private_chat.png)

#### 群聊使用

1. 将机器人拉进群
2. at机器人并发送消息，机器人即会自动回复
3. at机器人并发送`!help`查看帮助信息

![群聊使用](/assets/image/group_chat.png)