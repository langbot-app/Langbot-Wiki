# Deploying with BT Panel

Deploy LangBot with one click using the [BT Panel](https://www.bt.cn/new/download.html?r=dk_LangBot).

## Installing BT Panel

:::warning
If you have already installed BT Panel, please update to version **9.2.0** or above.
:::

> Recommended server systems (from BT Panel): Debian 12, Ubuntu 22, etc.
>
> This guide assumes the server has a public IPv4 address. If you are using a home machine without a public IP, you can access the relevant pages via the intranet as described below.

Open the [BT Panel](https://www.bt.cn/new/download.html?r=dk_LangBot) and use the Linux panel installation script provided by BT Panel. Choose the script corresponding to your system.

![Installing BT Panel](/assets/image/bt_install_01.png)

Copy the corresponding script and paste it into your server to execute.

## Installing LangBot

After waiting for a while, the BT Panel installation will be completed.

You will see a prompt similar to the following. Copy the external panel address and open it in your browser.

![BT Panel Access Address](/assets/image/bt_install_02.png)

The first time you open it, a `Recommended Installation Suite` popup may appear. You can skip this by closing it.

Then, click on the `docker` option in the sidebar. If it’s your first time, you will be prompted to install Docker and Docker Compose services. Click `Install Now`. If they are already installed, you can ignore this step.

Next, go to `Docker -> App Store`, search for `LangBot` (note the case sensitivity), and click `Install` using the default configuration.

After a short wait, you will see a container named `langbot_XXXX` showing as `Running`.

![Creating LangBot Container](/assets/image/bt_langbot_01.png)

Click on the red circle in the image above to view the running logs.

![Viewing LangBot Container Logs](/assets/image/bt_langbot_02.png)

You will see the external and internal access paths for the WebUI configuration page (visual configuration page). Copy the public address, for example, `http://xxx.xxx.xxx.xxx:5300` (where `xxx.xxx.xxx.xxx` is the BT Panel IP and `5300` is the port number, which may vary as shown in the image).

Open the address, enter the admin email and password, and then click `Initialize`.

You can now configure settings in the visual interface.

If you prefer to directly modify the JSON configuration file, you can refer to the local mapped directory shown in the image above. Navigate to the installation directory, where the `data` folder stores configuration files and the `plugins` folder stores plugin-related files.

Next, please continue reading the [Deploying Message Platform](/deploy/platforms/aiocqhttp/napcat.html) page.