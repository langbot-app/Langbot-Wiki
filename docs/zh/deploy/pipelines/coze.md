# 接入 Coze API

本文仅说明如何在 Coze 平台获取 Token 与 Bot ID，并将其填写到 LangBot 流水线配置中。

## 1. 获取 Token 与 Bot ID

1. 登录 Coze 平台，进入你的开发控制台。
![Coze 应用 API 密钥](/assets/image/zh/deploy/pipelines/coze/coze07.png)
2. 在“API 管理”中创建并复制令牌。
![Coze 应用 API 密钥](/assets/image/zh/deploy/pipelines/coze/coze06.png)
3. 从项目开发中选择你自己的智能体，或者新建智能体，拿到一下id就是bot_id。
![Coze bot_id](/assets/image/zh/deploy/pipelines/coze/coze05.png)
* 智能体发布一定要选上api的选项
![Coze 应用 API 密钥](/assets/image/zh/deploy/pipelines/coze/coze04.png)



请妥善保存以上两项信息：
- token：Coze 平台生成的令牌
- bot_id：机器人 ID

## 2. 在 LangBot 中填写配置

1. 打开 LangBot WebUI，进入一个流水线的配置页面（或新建流水线后进入配置页面）。
2. 在“AI 能力”中选择运行器为 `Coze API`。
3. 在运行器的配置项中，填写：
   - token：粘贴你在 Coze 平台复制的 API Token
   - bot_id：粘贴对应机器人的 Bot ID
    ![流水线配置](/assets/image/zh/deploy/pipelines/coze/coze08.png)
4. 点击“保存”完成配置。

完成后，你即可在该流水线中调用 Coze 机器人完成对话处理。

## 常见问题
- 保存失败或调用报错：请确认 token 与 bot_id 是否正确且未包含多余空格。
- 无法选择 `Coze API`：请确认当前版本是否已支持该运行器；若尚未支持，请升级到包含 Coze 运行器的版本。

更多流水线通用配置说明，请参考[修改对话流水线配置](/zh/deploy/pipelines/readme)。