# LangBot 常见问题

## Q：官方机器人 IP 白名单怎么填？

如果你是在自己电脑上运行机器人：打开[IP138](https://ip38.com/) 这个网址获取自己网络的出网 IP，填写这个 IP 如图

![](/assets/image/error_q3.png)

如果不是在自己电脑上（如云服务器），请自行检查主机的公网 IP。

## Q：各种请求失败报错案例：


1. 你的模型 api key 未填或者不正确

![](/assets/image/error_q4.png)

2. 中转站没有额度了

![](/assets/image/error_q5.png)

3. 检查 provider 的地址是否正确（末尾加了 /v1 吗？）

![](/assets/image/error_q6.png)

## Q：插件安装失败？

尝试在主机上开启网络代理，Linux 需要设置环境变量 http_proxy 和 https_proxy。