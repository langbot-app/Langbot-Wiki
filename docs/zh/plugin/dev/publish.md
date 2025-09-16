# 发布插件

通过 CLI 将插件发布至 [LangBot 插件市场](https://space.langbot.app/market)。

## 在 LangBot Space 创建账号

LangBot Space 是 LangBot 提供中心化服务平台。请访问[LangBot Space](https://space.langbot.app)，点击右上角使用 GitHub 登录并创建账号。

<img width="600" src="/assets/image/zh/plugin/dev/login_space.png" />

这将跳转到 GitHub 授权页面，请根据提示完成授权。

## 使用 CLI 登录 LangBot Space

在任意目录执行命令`lbp login`：

```bash
➜  HelloPlugin > lbp login
Starting LangBot CLI login process...
Generating device code...

==================================================
Please copy the user code and complete verification in your browser:
User Code: 6CD64D56
Verification URL: https://space.langbot.app/auth/device
Device code expires in: 120 seconds
==================================================

Waiting for verification...
```

请点击`Verification URL`跳转至 LangBot Space，输入`User Code`完成登录。

<img width="600" src="/assets/image/zh/plugin/dev/space_device_flow.png" />

```bash
==================================================
✅ Login successful!
Access token saved to: ~/.langbot/cli/config.json
Token type: Bearer
Expires in: 21600 seconds
==================================================
```

登录成功后，您可以继续使用 CLI 上传插件。

## 上传插件

请在您的插件目录下执行`lbp publish`:

```bash
➜  HelloPlugin > lbp publish
Building plugin to dist/tmp...
  - Skipping ignored directory: dist
  - Skipping ignored directory: __pycache__
  ...
Plugin built successfully: dist/tmp/RockChinQ-HelloPlugin-0.1.0.lbpkg
✅ Plugin published successfully. You can check it on https://https://space.langbot.app/market
```

您现在可以在[LangBot 插件市场](https://space.langbot.app/market)查看您的插件提交任务。请等待审核通过后，您可以在插件市场查看您的插件。

<img width="600" src="/assets/image/zh/plugin/dev/plugin_submission.png" />

有任何问题，您可以发送邮件到`hello@langbot.app`或通过[社区](/zh/insight/community)联系我们。
