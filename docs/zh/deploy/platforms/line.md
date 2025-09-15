# 接入LINE机器人

本文介绍如何将LangBot与LINE平台进行对接，实现LINE机器人功能。

## 创建LINE机器人

### 注册LINE开发者账号

1. 访问[LINE Developers官网](https://developers.line.biz/)，使用LINE账号登录
2. 登录后，进入开发者控制台

### 创建Provider和Channel

> [开发者控制台](https://developers.line.biz/console)

1. 在开发者控制台中，创建一个新的Provider（如果没有的话）
![alt text](/assets/image/zh/deploy/bots/line/line01.png)
2. 在Provider下，点击"Create"
![alt text](/assets/image/zh/deploy/bots/line/line02.png)
3. 填入名称,并点击create
![alt text](/assets/image/zh/deploy/bots/line/line03.png)

4. 跳转页面后选择create  a message api
![alt text](/assets/image/zh/deploy/bots/line/line04.png)
* 继续点击 create a message api
![alt text](/assets/image/zh/deploy/bots/line/line05.png)
* 跳转页面后填入基本信息
![alt text](/assets/image/zh/deploy/bots/line/line06.png)
   - Channel name（频道名称）
   - Channel description（频道描述）
   - Category（类别）
   - Subcategory（子类别）
   - Email address（邮箱地址）
5. 全部填好之后点击"Continue"创建
![alt text](/assets/image/zh/deploy/bots/line/line07.png)
6. 检查填入的信息，无问题点击submit即可
![alt text](/assets/image/zh/deploy/bots/line/line08.png)
7. 创建成功去使用
![alt text](/assets/image/zh/deploy/bots/line/line09.png)

### 获取配置信息

创建完成后，您将获得以下重要信息，请记录下来：

1. Channel secret
> [刚刚点击使用跳转页面](https://manager.line.biz/account)
* 选择settings
![alt text](/assets/image/zh/deploy/bots/line/line09.png)
* 点击message api
![alt text](/assets/image/zh/deploy/bots/line/line11.png)
* 开启message api
![alt text](/assets/image/zh/deploy/bots/line/line12.png)
* 选择刚刚新建的provider并点击agree
![alt text](/assets/image/zh/deploy/bots/line/line13.png)
* 隐私条款直接点击ok
![alt text](/assets/image/zh/deploy/bots/line/line14.png)
* 点击ok创建成功
![alt text](/assets/image/zh/deploy/bots/line/line15.png)
* copy 即可
![alt text](/assets/image/zh/deploy/bots/line/line16.png)

2. Channel access token（需要点击"Issue"按钮生成）
* 点击控制台或者直接访问[控制台](https://developers.line.biz/console/)
![alt text](/assets/image/zh/deploy/bots/line/line17.png)
* 选择你创建的provider并点击message api
![alt text](/assets/image/zh/deploy/bots/line/line18.png)
* 点击Message api
![alt text](/assets/image/zh/deploy/bots/line/line19.png)
* 下滑到最下面，点击issue
![alt text](/assets/image/zh/deploy/bots/line/line20.png)
* 点击图标复制
![alt text](/assets/image/zh/deploy/bots/line/line21.png)







## 配置Webhook

* 点击控制台或者直接访问[控制台](https://developers.line.biz/console/)
![alt text](/assets/image/zh/deploy/bots/line/line17.png)
* 选择你创建的provider并点击message api
![alt text](/assets/image/zh/deploy/bots/line/line18.png)
* 点击Message api
![alt text](/assets/image/zh/deploy/bots/line/line19.png)
* 点击edit填写连接
![alt text](/assets/image/zh/deploy/bots/line/line22.png)
* 填入连接（必须要https的连接，也就是要ssl证书），点击update
![alt text](/assets/image/zh/deploy/bots/line/line23.png)

* 选择use webhook
![alt text](/assets/image/zh/deploy/bots/line/line24.png)

5. 点击"Verify"按钮测试连接是否成功
![alt text](/assets/image/zh/deploy/bots/line/line25.png)


## 对接LangBot

接下来打开LangBot配置页面：

1. 点击"机器人"，然后点击"添加"
![alt text](/assets/image/zh/deploy/bots/line/line26.png)
2. 在"平台/适配器选择"中选择"LINE"
![alt text](/assets/image/zh/deploy/bots/line/line27.png)

3. 填写配置信息：
   - Channel Secret：您之前获取的Channel secret
   - Channel Access Token：您之前获取的Channel access token
   ![alt text](/assets/image/zh/deploy/bots/line/line28.png)

4. 点击"保存"完成配置
   ![alt text](/assets/image/zh/deploy/bots/line/line29.png)


## 功能配置

在LINE开发者控制台中，您可以进一步配置机器人的功能：

1. 在"Messaging API"选项卡中，找到"LINE Official Account features"部分
2. 根据需要开启或关闭以下功能：
   - 自动回复消息
   - 加好友欢迎消息
   - 群组和多人聊天
   - 机器人加入群组时的问候语

## 效果展示

配置完成后，用户可以通过以下方式与您的LINE机器人互动：

1. 扫描LINE开发者控制台中提供的QR码添加机器人为好友
2. 在聊天中发送消息，机器人将通过LangBot处理并回复

## 常见问题

### Webhook验证失败

- 确保您的服务器可以通过HTTPS访问
- 检查Webhook URL是否正确
- 确认LangBot服务是否正常运行

### 消息无法接收

- 检查Channel access token是否有效
- 确认"Use webhook"选项已开启
- 查看LangBot日志是否有错误信息

### 权限问题

- 确保您已在LINE开发者控制台中为机器人开启了必要的权限
- 对于某些高级功能，可能需要LINE Premium账号

::: info
注意，如果涉及多个docker容器的网络连接问题，请参考[网络配置详解](/zh/workshop/network-details)
:::