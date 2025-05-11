# Deploying the Mirai Messaging Platform

> This document provides only the basic steps. For detailed operations, troubleshooting, and the latest information, please visit the [Mirai Official Repository](https://github.com/mamoe/mirai) and the [Mirai Official Forum](https://mirai.mamoe.net/).

::: warning

This messaging platform is unstable. Do not use it.

:::

## Preparation

> Note: Due to the diverse and complex network environments, many steps may require the use of network magic. Those who understand will know.

1. Create a Folder

   Create a new folder on any drive (D, E, F, etc.), for example, name it `qqbot`.

2. Create Subfolders

   Double-click to enter the newly created folder, and create two subfolders (it is recommended to keep the names consistent): `mirai` and `LangBot`.

## Installing mirai-console

Download the corresponding version of the installer from the [mcl-installer releases page](https://github.com/iTXTech/mcl-installer/releases). Find the latest installer, which is marked with "Latest," click `show all 14 assets`, and download `mcl-installer-X.X.X-windows-amd64.exe`. For example, download `mcl-installer-1.0.7-windows-amd64.exe` and save it in the previously created `mirai` folder.

![Screenshot 2023-11-23 223909.png](/assets/image/mirai_dl_1.png)

![image-20231218170548696](/assets/image/mirai_dl_2.png)

Double-click to open it and press Enter all the way. Then, you will see some additional files.

![image-20231218170726759](/assets/image/mirai_dl_3.png)

Continue by clicking `mcl.cmd`. If you cannot see the file extension, refer to this article to display file extensions: [How to View File Extensions](https://jingyan.baidu.com/article/9158e0004c6cbea2541228da.html).

After double-clicking, an interface similar to the one below will appear. When `Enter to continue` appears, press Enter.

![Screenshot 2023-11-24 174015.png](/assets/image/mirai_dl_4.png)
![Screenshot 2023-11-24 174650.png](/assets/image/mirai_dl_5.png)
When the green text appears, the installation is complete. At this point, type `exit` and press Enter to quit.

## Installing mirai-api-http

Open `mcl.cmd`, enter `mcl --update-package net.mamoe:mirai-api-http --channel stable-v2 --type plugin`, and press Enter.

![image-20231218172022449](/assets/image/mah_dl_1.png)

Open `mcl.cmd` again, press Enter all the way until it exits.

Open `mcl.cmd` once more, and if you see the following interface, it means the installation was successful.
![Screenshot 2023-11-24 184618.png](/assets/image/mah_dl_2.png)
Press `Ctrl+C` to exit.
Locate the `mira/config/net.mamoe.mirai-api-http/setting.yml` file, right-click, and open it with Notepad.

![image-20231218172354159](/assets/image/mah_dl_3.png)

Delete all the content and replace it with:

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

Open `mcl.cmd` again, and you should see the following output:
![image-20231218174112536](/assets/image/mah_dl_4.png)
This indicates that mirai-api-http has been successfully installed.

## Configuring the Signature Service

Download the qsign one-click signature package from this link. Click to download the latest zip file, such as `qsign-1.2.1-beta-dev-d62ddce-all.zip` [as of December 19, 2023]. [Click here to go to the download page](https://github.com/MrXiaoM/qsign/releases).

![image-20231219211250617](/assets/image/mirai_sign_1.png)

After downloading, extract the files to get the following:

![image-20231219211634274](/assets/image/mirai_sign_2.png)

Copy the two files into the `mirai` folder.

![image-20231219211904375](/assets/image/mirai_sign_3.png)

Open the `txlib` folder and note the folder with the largest number.

![image-20231219212926059](/assets/image/mirai_sign_4.png)

Then, double-click to run `mcl.cmd`. After a while, when you see the prompt `mirai-console started successfully`, qsign is installed.

Next, open the `config.yml` file located in `mirai/config/top.mrxiaom.qsign` with Notepad.

![image-20231219213026138](/assets/image/mirai_sign_5.png)

![image-20231219213255993](/assets/image/mirai_sign_6.png)

Then, press `Ctrl+S` to save.

Double-click to run `mcl.cmd` again, and you should see a similar prompt, as shown below:

![image-20231219214603122](/assets/image/mirai_sign_7.png)

## Running Mirai

At this point, you have successfully installed and configured everything. Next, you can log in with your bot's QQ account.

Enter the following, replacing `123456` with your bot's QQ number and `67890` with your bot's QQ password:

```bash
login 12345 67890
```

Then, you will see the following prompt:

![image-20231219215234389](/assets/image/run_mirai_1.png)

Copy the link after `Captcha link:` and open it in Chrome or Edge. Press F12 to open the developer tools.

Open the `Network` tab.

![img5](/assets/image/get_captcha.png)

Complete the verification in the browser. In the `Network` tab, find the request named `cap_union_new_verify` at the bottom.

![img6](/assets/image/get_gocq_login_token.png)

The content after `ticket` is what you need to input back into Mirai, but do not include the quotes at the beginning and end.

**Note**

- Remember to delete the quotes (`"`, one at the beginning and one at the end) when copying; they are not part of the ticket content.
- Be quick.
- Make sure not to miss any characters (the content is long, so ensure you copy everything).

Paste the copied content into the terminal running Mirai.

![image-20231219220645708](/assets/image/paste_token.png)

Then press Enter. If you're lucky, you will be prompted to enter a verification code. Type `yes` and press Enter, then enter the verification code and press Enter to log in successfully.

If you're unlucky and encounter error code 237, it is recommended to try with a different account.

## Next Steps

Check the configuration information page and connect via the YiriMirai adapter.