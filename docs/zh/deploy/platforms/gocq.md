# 部署消息平台 go-cqhttp

> 本文档仅为基本步骤，详细操作、答疑解惑及最新信息请前往[go-cqhttp官方文档](https://docs.go-cqhttp.org/)。

::: warning 

gocq未归档，但原开发者表示：[https://github.com/Mrs4s/go-cqhttp/issues/2471](https://github.com/Mrs4s/go-cqhttp/issues/2471)

:::

## 下载go-cqhttp

从[go-cqhttp的Release](https://github.com/Mrs4s/go-cqhttp/releases/latest)下载最新的go-cqhttp可执行文件（建议直接下载可执行文件压缩包，而不是安装器）

![下载gocq](/assets/image/dl_gocq.png)

## 运行并配置go-cqhttp

解压并运行，首次运行会询问需要开放的网络协议，**请填入`02`并回车，必须输入`02`❗❗❗❗❗❗❗**

```
C:\Softwares\go-cqhttp.old> .\go-cqhttp.exe
未找到配置文件，正在为您生成配置文件中！
请选择你需要的通信方式:
> 0: HTTP通信
> 1: 云函数服务
> 2: 正向 Websocket 通信
> 3: 反向 Websocket 通信
请输入你需要的编号(0-9)，可输入多个，同一编号也可输入多个(如: 233)
您的选择是:02
```

提示已生成`config.yml`文件，关闭go-cqhttp。

打开go-cqhttp同目录的`config.yml`

1. 编辑账号登录信息

只需要修改下方`uin`和`password`为你要登录的机器人账号的QQ号和密码即可。  

```yaml
account: # 账号相关
    uin: 1233456 # QQ账号
    password: '' # 密码为空时使用扫码登录
    encrypt: false  # 是否开启密码加密
    status: 0      # 在线状态 请参考 https://docs.go-cqhttp.org/guide/config.html#在线状态
    relogin: # 重连设置
        delay: 3   # 首次重连延迟, 单位秒
        interval: 3   # 重连间隔
        max-times: 0  # 最大重连次数, 0为无限制
```

2. 修改websocket端口

在`config.yml`下方找到以下内容

```yaml
  - ws:
    # 正向WS服务器监听地址
    address: 0.0.0.0:8080
    middlewares:
        <<: *default # 引用默认中间件
```

**将`0.0.0.0:8080`改为`0.0.0.0:6700`**，保存并关闭`config.yml`。

3. 配置签名服务器

按照如下填写，

```yaml
  sign-servers: 
    - url: 'https://qsign.trpgbot.com/'  # 主签名服务器地址， 必填
      key: 'selfshare' 
      authorization: '-' 
    - url: 'https://qsign-v3.trpgbot.com/'  # 次要服务器地址，选填
      key: 'selfshare' 
      authorization: '-' 

  auto-register: true
```   

写入文件/data/versions/6.json,

```json
{
    "apk_id": "com.tencent.mobileqq",
    "app_id": 537220362,
    "sub_app_id": 537220362,
    "app_key": "0S200MNJT807V3GE",
    "sort_version_name": "9.0.56.16830",
    "build_time": 1713424357,
    "apk_sign": "a6b745bf24a2c277527716f6f36eb68d",
    "sdk_version": "6.0.0.2560",
    "sso_version": 21,
    "misc_bitmap": 150470524,
    "main_sig_map": 34869472,
    "sub_sig_map": 66560,
    "dump_time": 1713424357,
    "qua": "V1_AND_SQ_9.0.56_6372_YYB_D",
    "protocol_type": 6
}
```

感谢zhaodice大佬带来的QQ 9.0.56签名服务器

4. 若您的服务器位于公网，强烈建议您填写`access-token` (可选)

```yaml
# 默认中间件锚点
default-middlewares: &default
    # 访问密钥, 强烈推荐在公网的服务器设置
    access-token: ''
```

5. 配置完成，重新启动go-cqhttp

## 登录

双击登录脚本，一段时间后，可以看到提示

![登录gocq](/assets/image/first_launch.png)

把`Captcha link: `后边的链接复制下来，用Chrome或者Edge浏览器打开，按F12打开开发者工具

点开 `Network`

![过验证码](/assets/image/get_captcha.png)

在浏览器中完成验证, 在 `Network` 中找到名为 `cap_union_new_verify` 的请求, 在最下面

![获取token](/assets/image/get_gocq_login_token.png)

ticket 后那一坨就是要输入回 go-cqhttp 的内容，但不包括首尾的双引号

**注意**

- 复制的时候记得删掉引号(`"`, 前后都有一个), 那个不是ticket内容
- 速度要快
- 注意不要漏字符(没复制完, 后面还有很长)

把复制下来的东西，粘贴到运行go-cq的终端中

![粘贴token](/assets/image/paste_token.png)

> 若启动后登录不成功，请尝试根据[此文档](https://docs.go-cqhttp.org/guide/config.html#%E8%AE%BE%E5%A4%87%E4%BF%A1%E6%81%AF)修改`device.json`的协议编号。


## 后续步骤

查看填写配置信息页，通过 Nakuru 适配器接入。