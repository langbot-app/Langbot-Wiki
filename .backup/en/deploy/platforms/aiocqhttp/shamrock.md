# Deploying the Shamrock Messaging Platform

> This document only covers the basic steps. For detailed operations, troubleshooting, and the latest information, please refer to the [OpenShamrock Official Documentation](https://whitechi73.github.io/OpenShamrock/).

::: tip

Project archived, not recommended for continued use.

:::

## Introduction to OpenShamrock

While tools like go-cqhttp simulate the QQ protocol for communication, Shamrock uses Android hooks to simulate clicks on QQ, offering higher stability.

Optional platforms (or devices):

- Emulator
- Linux server
- PVE
- Cloud phone
- Physical phone

## Steps (Emulator)

### Environment Setup

**Note: It is recommended to use the [mumu emulator](https://mumu.163.com/).**

Refer to [this document](https://forum.libfekit.so/d/60-mumu12mo-ni-qi-an-zhuang-magiskhe-lsposed) to install Magisk and LSPosed.

Remember to enable the writable system disk and root permissions in the mumu emulator.

![](/assets/image/sham_env_1.png)

![image-20240119154032682](/assets/image/sham_env_2.png)

### Installing OpenShamrock

Download the latest OpenShamrock installation package from [OpenShamrock's Actions](https://github.com/whitechi73/OpenShamrock/actions). Make sure to download the version with the `all` suffix, such as `Shamrock-v1.0.7.r253.81be383-all.zip`. Extract the package and install it in the mumu emulator.

#### Configuring Shamrock

1. Modify the settings on the Shamrock settings page as shown:

Enable passive WebSocket and fill in the address and port that the LangBot's aiocqhttp adapter is listening on (see the configuration information page for details).

![img](/assets/image/sham_cfg_1.png)

![img](/assets/image/sham_cfg_2.png)

The passive WebSocket address should be the address and port that the LangBot's aiocqhttp adapter is listening on, and the path must be `/ws`, for example, `ws://127.0.0.1:2280/ws`. Refer to the configuration information page for details.

2. Go to the LSPosed module management page and enable the Shamrock module.

![image-20240119154110877](/assets/image/sham_cfg_3.png)

### Installing QQ

Refer to [this page](https://whitechi73.github.io/OpenShamrock/guide/faq.html#%E6%94%AF%E6%8C%81%E7%9A%84qq%E7%89%88%E6%9C%AC) for the supported QQ versions and choose the latest one.

Download the corresponding version from [here](https://qq.cn.uptodown.com/android/versions) and install it in the mumu emulator.

### Logging into the Bot QQ Account

1. Open QQ, log in to the bot QQ account, close QQ, and restart the emulator.
2. Start LSPosed, and Shamrock will automatically run. Start QQ.
3. Open the Shamrock page, and it should display `Activated` and show the account information and related message logs.

### Next Steps

Refer to the configuration information page to connect via the aiocqhttp adapter.

![img](https://cos.thelazy.cn/pictures/202405292250017.jpeg)

Next, please read [Filling in Configuration Information](/deploy/quick-config/config).