# 部署消息平台 shamrock

> 本文档仅为基本步骤，详细操作、答疑解惑及最新信息请前往[OpenShamrock官方文档](https://whitechi73.github.io/OpenShamrock/)。

::: tip

项目归档，不建议继续使用

:::

## OpenShamrock简介

go-cqhttp 之类的是模拟 QQ 的协议进行通信，而 Shamrock 使用的是 安卓的 Hook 来操作 QQ 模拟点击，稳定性较高。

可选平台(or设备)：

- 模拟器
- Linux服务器
- PVE
- 云手机
- 实体手机

## 步骤(模拟器)

### 环境配置

**注：建议使用[mumu模拟器](https://mumu.163.com/)**

参考[此文档](https://forum.libfekit.so/d/60-mumu12mo-ni-qi-an-zhuang-magiskhe-lsposed)安装Magisk和LSPosed

记得打开mumu模拟器的可写系统盘和root权限

![](/assets/image/sham_env_1.png)

![image-20240119154032682](/assets/image/sham_env_2.png)

### 安装OpenShamrock

从[OpenShamrock的Actions](https://github.com/whitechi73/OpenShamrock/actions)下载最新的OpenShamrock安装包，注意下载带有`all`字样的版本，如`Shamrock-v1.0.7.r253.81be383-all.zip`，解压，在mumu模拟器安装


#### 配置Shamrock

1. 在 Shamrock 的设置页面修改设置如图：

启用被动 Websocket，并填写 LangBot 的 aiocqhttp 适配器监听的地址和端口（详见填写配置信息页）。

![img](/assets/image/sham_cfg_1.png)

![img](/assets/image/sham_cfg_2.png)

填写的被动 Websocket 地址为 LangBot 的 aiocqhttp 适配器监听的地址和端口，且路径必须为 `/ws`，例如 `ws://127.0.0.1:2280/ws`，详见填写配置信息页。

2. 并前往 LSPosed 的模块管理页面 启用模块 Shamrock

![image-20240119154110877](/assets/image/sham_cfg_3.png)

### 安装QQ

参考[此页面](https://whitechi73.github.io/OpenShamrock/guide/faq.html#%E6%94%AF%E6%8C%81%E7%9A%84qq%E7%89%88%E6%9C%AC)给出的支持的QQ版本，选择最新即可

在[这里](https://qq.cn.uptodown.com/android/versions)选择对应的版本下载，在mumu模拟器安装即可

### 登录机器人QQ

1. 打开QQ，登录机器人QQ，关闭QQ，重启模拟器。
2. 启动 LSPosed，Shamrock 将会自动运行，启动 QQ。
3. 打开 Shamrock 页面，此时应显示 `已激活` 并可以查看到账号信息和相关消息日志。

### 后续步骤

查看填写配置信息页，通过 aiocqhttp 适配器接入。

![img](https://cos.thelazy.cn/pictures/202405292250017.jpeg)


接下来请阅读[填写配置信息](/deploy/quick-config/config)。
