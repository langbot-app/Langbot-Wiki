# 1Panel Deployment

Deploy LangBot with one click using [1Panel](https://www.bt.cn/new/download.html?r=dk_LangBot).

:::warning

Unless you plan to use messaging platforms that do not require additional containers (such as Discord or Lark), or you are familiar with the network connection between Docker containers on 1Panel, it is not recommended to use the one-click deployment of 1Panel. Please consider using [Docker Deployment](/en/deploy/langbot/docker) instead.

:::

:::info

With [Alibaba Cloud](https://www.aliyun.com/minisite/goods?userCode=ys4ad8gs), you can get a server for as low as 38 yuan per year, and even enjoy a 20% discount. It is more convenient to install 1Panel with one click.

:::

## Install 1Panel

> Recommended server systems (from 1Panel): Debian 12, Ubuntu 22, etc.

This article assumes that the server has a public IPv4 address by default. If you are using a home machine without a public IP, you can access the relevant pages through the internal network described below.

Visit [1Panel](https://www.bt.cn/new/download.html?r=dk_LangBot) and use the Linux panel installation script provided officially by 1Panel. Select the corresponding script according to your operating system.



![Install 1Panel](/assets/image/zh/deploy/langbot/one-click/1p_install_01.png)

Copy the corresponding script, paste it into the server, and execute it.

After waiting for a period of time, the installation of 1Panel will be completed.

Then copy the `External Address` and open it in a browser.

## Install LangBot

Open the `App Store`, select the `AI` category, and click to install LangBot.



![Install LangBot ](/assets/image/zh/deploy/langbot/one-click/1p_langbot_01.png)

Check the box for `External Port Access` and click Confirm.



![Install LangBot ](/assets/image/zh/deploy/langbot/one-click/1p_langbot_02.png)

Wait for a moment, and the installation will be completed.

Click `Containers` on the left side, then select the `Containers` category, and you will see the LangBot container bar.



![View LangBot Container Information](/assets/image/zh/deploy/langbot/one-click/1p_langbot_03.png)

Copy the public IP address of the server, for example, `http://xxx.xxx.xxx.xxx:5300` (where xxx.xxx.xxx.xxx is the IP address of the server where 1Panel is located, and 5300 is the port number).

Open the address, enter the administrator email and password, then click Initialize.

After that, you can configure LangBot in the visual interface.

Next, please continue to read the [Deploy Messaging Platforms](/en/deploy/platforms/readme) page.