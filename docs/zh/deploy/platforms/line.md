# 接入LINE机器人

本文介绍如何将 LangBot 与 LINE 平台进行对接，实现 LINE 机器人功能。

## 创建LINE机器人

### 注册LINE开发者账号

1. 访问 [LINE Developers 官网](https://developers.line.biz/)，使用 LINE 账号登录
2. 登录后，进入开发者控制台

### 创建 Provider 和 Channel

> [开发者控制台](https://developers.line.biz/console)

1. 在开发者控制台中，创建一个新的 Provider（如果没有的话）

![alt text](/assets/image/zh/deploy/bots/line/line01.png)

2. 在 Provider 下，点击 "Create"

![alt text](/assets/image/zh/deploy/bots/line/line02.png)

3. 填入名称，并点击 Create

![alt text](/assets/image/zh/deploy/bots/line/line03.png)

4. 跳转页面后选择 Create a Message API
![alt text](/assets/image/zh/deploy/bots/line/line04.png)
* 继续点击 Create a Message API
![alt text](/assets/image/zh/deploy/bots/line/line05.png)
* 跳转页面后填入基本信息
![alt text](/assets/image/zh/deploy/bots/line/line06.png)
   - Channel Name（频道名称）
   - Channel Description（频道描述）
   - Category（类别）
   - Subcategory（子类别）
   - Email Address（邮箱地址）
5. 全部填好之后点击 "Continue" 创建
![alt text](/assets/image/zh/deploy/bots/line/line07.png)
6. 检查填入的信息，无问题点击 Submit 即可
![alt text](/assets/image/zh/deploy/bots/line/line08.png)
7. 创建成功去使用
![alt text](/assets/image/zh/deploy/bots/line/line09.png)

### 获取配置信息

创建完成后，您将获得以下重要信息，请记录下来：

1. Channel Secret
> [刚刚点击使用跳转页面](https://manager.line.biz/account)
* 选择 Settings
![alt text](/assets/image/zh/deploy/bots/line/line09.png)
* 点击 Message API
![alt text](/assets/image/zh/deploy/bots/line/line11.png)
* 开启 Message API
![alt text](/assets/image/zh/deploy/bots/line/line12.png)
* 选择刚刚新建的 Provider 并点击 Agree
![alt text](/assets/image/zh/deploy/bots/line/line13.png)
* 隐私条款直接点击 OK
![alt text](/assets/image/zh/deploy/bots/line/line14.png)
* 点击 OK 创建成功
![alt text](/assets/image/zh/deploy/bots/line/line15.png)
* Copy 即可
![alt text](/assets/image/zh/deploy/bots/line/line16.png)

2. Channel Access Token（需要点击 "Issue" 按钮生成）
* 点击控制台或者直接访问 [控制台](https://developers.line.biz/console/)
![alt text](/assets/image/zh/deploy/bots/line/line17.png)
* 选择你创建的 Provider 并点击 Message API
![alt text](/assets/image/zh/deploy/bots/line/line18.png)
* 点击 Message API
![alt text](/assets/image/zh/deploy/bots/line/line19.png)
* 下滑到最下面，点击 Issue
![alt text](/assets/image/zh/deploy/bots/line/line20.png)
* 点击图标复制
![alt text](/assets/image/zh/deploy/bots/line/line21.png)







## 配置Webhook

* 点击控制台或者直接访问 [控制台](https://developers.line.biz/console/)
![alt text](/assets/image/zh/deploy/bots/line/line17.png)
* 选择你创建的 Provider 并点击 Message API
![alt text](/assets/image/zh/deploy/bots/line/line18.png)
* 点击 Message API
![alt text](/assets/image/zh/deploy/bots/line/line19.png)
* 点击 Edit 填写连接
![alt text](/assets/image/zh/deploy/bots/line/line22.png)
* 填入连接（必须要 HTTPS 的连接，也就是要 SSL 证书），点击 Update
![alt text](/assets/image/zh/deploy/bots/line/line23.png)

* 选择 Use Webhook
![alt text](/assets/image/zh/deploy/bots/line/line24.png)

5. 点击 "Verify" 按钮测试连接是否成功
![alt text](/assets/image/zh/deploy/bots/line/line25.png)


## 对接 LangBot

接下来打开 LangBot 配置页面：

1. 点击 "机器人"，然后点击 "添加"
![alt text](/assets/image/zh/deploy/bots/line/line26.png)
2. 在 "平台/适配器选择" 中选择 "LINE"
![alt text](/assets/image/zh/deploy/bots/line/line27.png)

3. 填写配置信息：
   - Channel Secret：您之前获取的 Channel Secret
   - Channel Access Token：您之前获取的 Channel Access Token
   ![alt text](/assets/image/zh/deploy/bots/line/line28.png)

4. 点击 "保存" 完成配置
   ![alt text](/assets/image/zh/deploy/bots/line/line29.png)


## 功能配置

在 LINE 开发者控制台中，您可以进一步配置机器人的功能：

1. 在 "Messaging API" 选项卡中，找到 "LINE Official Account Features" 部分
2. 根据需要开启或关闭以下功能：
   - 自动回复消息
   - 加好友欢迎消息
   - 群组和多人聊天
   - 机器人加入群组时的问候语

## 使用

配置完成后，用户可以通过以下方式与您的 LINE 机器人互动：

1. 扫描 LINE 开发者控制台中提供的 QR 码添加机器人为好友
2. 在聊天中发送消息，机器人将通过 LangBot 处理并回复

## 常见问题

### Webhook 验证失败

- 确保您的服务器可以通过 HTTPS 访问
- 检查 Webhook URL 是否正确
- 确认 LangBot 服务是否正常运行

### 消息无法接收

- 检查 Channel Access Token 是否有效
- 确认 "Use Webhook" 选项已开启
- 查看 LangBot 日志是否有错误信息

### 权限问题

- 确保您已在 LINE 开发者控制台中为机器人开启了必要的权限
- 对于某些高级功能，可能需要 LINE Premium 账号
