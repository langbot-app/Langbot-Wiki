# 部署消息平台 mirai

> 本文档仅为基本步骤，详细操作、答疑解惑及最新信息请前往[Mirai官方代码库](https://github.com/mamoe/mirai)、[Mirai官方论坛](https://mirai.mamoe.net/)

::: warning

此消息平台不稳定，不要使用

:::

## 准备工作

> 注意：由于网络环境多样复杂，很多步骤中，有可能需要使用网络魔法，懂的都懂

1. 创建文件夹

   在你的任意盘（D，E，F什么都都可以）里面新建一个文件夹（例如命名qqbot）

2. 创建子文件夹

   双击进入刚刚创建的文件夹，分别新建两个文件夹（建议命名保持一致）：mirai、LangBot

## 安装 mirai-console

在 [mcl-installer 的 releases 页面](https://github.com/iTXTech/mcl-installer/releases)下载对应版本的安装包，找到最新的安装包，即有“Latest”标志的安装包，点击`show all 14 assets`,下载 mcl-installer-X.X.X-windows-amd64.exe，如图，则下载`mcl-installer-1.0.7-windows-amd64.exe`，保存在刚才创建的`mirai文件夹`中
![屏幕截图 2023-11-23 223909.png](/assets/image/mirai_dl_1.png)

![image-20231218170548696](/assets/image/mirai_dl_2.png)

双击打开，一路回车。然后，你可以看到多出来一些文件。

![image-20231218170726759](/assets/image/mirai_dl_3.png)

继续点击`mcl.cmd`，看不到文件后缀的，参考这个文章来显示文件后缀名：[如何查看文件后缀](https://jingyan.baidu.com/article/9158e0004c6cbea2541228da.html)

双击后会显示如下图所示的类似界面，当出现`Enter to continue`时，表明你需要按回车健

![屏幕截图 2023-11-24 174015.png](/assets/image/mirai_dl_4.png)
![屏幕截图 2023-11-24 174650.png](/assets/image/mirai_dl_5.png)
当出现上面的一行绿字时，说明安装完成，到这里输入 exit，回车退出

## 安装 mirai-api-http

打开 `mcl.cmd`，输入`mcl --update-package net.mamoe:mirai-api-http --channel stable-v2 --type plugin` ，回车

![image-20231218172022449](/assets/image/mah_dl_1.png)

再次打开`mcl.cmd`，一路回车，直至退出。

再打开 mcl.cmd，看到如以下界面，说明成功
![屏幕截图 2023-11-24 184618.png](/assets/image/mah_dl_2.png)
键盘按下`Ctrl+C`，退出。
找到mira/config/net.mamoe.mirai-api-http/setting.yml文件，右键用记事本打开

![image-20231218172354159](/assets/image/mah_dl_3.png)

把内容全部删掉，换成

```yml
adapters:
  - ws
debug: true
enableVerify: true
verifyKey: yirimirai
singleMode: false
cacheSize: 4096
adapterSettings:
  ws:
    host: localhost
    port: 8080
    reservedSyncId: -1
```

再打开 `mcl.cmd`，可以看到输出
![image-20231218174112536](/assets/image/mah_dl_4.png)
则 mirai-api-http 安装成功。

## 配置签名服务

在这个链接下载qsign一键签名包，点击下载最新的那个zip压缩包，如下图的`qsign-1.2.1-beta-dev-d62ddce-all.zip`【写于2023年12月19日】，[点我跳转下载页面](https://github.com/MrXiaoM/qsign/releases)

![image-20231219211250617](/assets/image/mirai_sign_1.png)

下载完成后，解压得到如图文件

![image-20231219211634274](/assets/image/mirai_sign_2.png)

将两个文件复制到mirai文件夹中

![image-20231219211904375](/assets/image/mirai_sign_3.png)

打开`txlib`文件夹，发现有若干数字命名的文件夹，记录下最大的那个

![image-20231219212926059](/assets/image/mirai_sign_4.png)

然后，双击运行`mcl.cmd`，稍等一会儿后，当提示`mirai-console started successfully`时，qsign就安装上了

之后，打开`mirai/config/top.mrxiaom.qsign`下的`config.yml`文件，用记事本打开

![image-20231219213026138](/assets/image/mirai_sign_5.png)

![image-20231219213255993](/assets/image/mirai_sign_6.png)

然后，按下`Ctrl+S`保存

然后，再次双击运行`mcl.cmd`，可以看到类似提示，如图

![image-20231219214603122](/assets/image/mirai_sign_7.png)

## 运行mirai

到这里，你已经安装并配置成功了，接下来，你就可以登录机器人QQ了

输入，其中 123456 是替换为你机器人的 QQ 号，67890 替换为你机器人 QQ 的密码

```bash
login 12345 67890
```

然后，可以看到提示

![image-20231219215234389](/assets/image/run_mirai_1.png)

把`Captcha link: `后边的链接复制下来，用Chrome或者Edge浏览器打开，按F12打开开发者工具

点开 `Network`

![img5](/assets/image/get_captcha.png)

在浏览器中完成验证, 在 `Network` 中找到名为 `cap_union_new_verify` 的请求, 在最下面

![img6](/assets/image/get_gocq_login_token.png)

ticket 后那一坨就是要输入回 mirai 的内容，但不包括首尾的双引号

**注意**

- 复制的时候记得删掉引号(`"`, 前后都有一个), 那个不是ticket内容
- 速度要快
- 注意不要漏字符(没复制完, 后面还有很长)

把复制下来的东西，粘贴到运行mirai的终端中

![image-20231219220645708](/assets/image/paste_token.png)

然后回车，如果运气好的话，会提示你要收验证码，输入yes并回车，之后把验证码输入上去，然后回车即可成功登录了

如果运气不好，报错code=237了，建议换号

## 后续步骤

查看填写配置信息页，通过 YiriMirai 适配器接入。