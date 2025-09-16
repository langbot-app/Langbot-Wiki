# Publish Plugin

Publish plugins to [LangBot Plugin Marketplace](https://space.langbot.app/market) via CLI.

## Create Account on LangBot Space

LangBot Space is LangBot's centralized service platform. Please visit [LangBot Space](https://space.langbot.app), click the top-right corner to log in with GitHub and create an account.

<img width="600" src="/assets/image/zh/plugin/dev/login_space.png" />

This will redirect to GitHub authorization page, please complete authorization as prompted.

## Log in to LangBot Space Using CLI

Execute command `lbp login` in any directory:

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

Please click `Verification URL` to redirect to LangBot Space, enter `User Code` to complete login.

<img width="600" src="/assets/image/zh/plugin/dev/space_device_flow.png" />

```bash
==================================================
✅ Login successful!
Access token saved to: ~/.langbot/cli/config.json
Token type: Bearer
Expires in: 21600 seconds
==================================================
```

After successful login, you can continue using CLI to upload plugins.

## Upload Plugin

Please execute `lbp publish` in your plugin directory:

```bash
➜  HelloPlugin > lbp publish
Building plugin to dist/tmp...
  - Skipping ignored directory: dist
  - Skipping ignored directory: __pycache__
  ...
Plugin built successfully: dist/tmp/RockChinQ-HelloPlugin-0.1.0.lbpkg
✅ Plugin published successfully. You can check it on https://https://space.langbot.app/market
```

You can now check your plugin submission task at [LangBot Plugin Marketplace](https://space.langbot.app/market). Please wait for approval, after which you can view your plugin in the marketplace.

<img width="600" src="/assets/image/zh/plugin/dev/plugin_submission.png" />

If you have any questions, you can send an email to `hello@langbot.app` or contact us through [Community](/en/insight/community).