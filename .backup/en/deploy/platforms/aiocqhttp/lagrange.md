# Deploying the Message Platform Lagrange

## Introduction to Lagrange

Lagrange is a reverse engineering framework for the QQNT protocol, designed to be lightweight and relatively stable. It connects via the OneBot 11 protocol and requires the use of `aiocqhttp` as the adapter.

::: warning
You need to use NT QQ to interact with the bot; the older version of QQ will not work properly.
:::

## Deployment Steps

The following provides a general guide for deployment on Windows. For detailed steps or instructions for other platforms, please refer to the [Lagrange Official Documentation](https://lagrangedev.github.io/Lagrange.Doc/Lagrange.OneBot/).

### Environment Setup

Install the .NET 8 runtime. [Click here to download directly from the Microsoft official website](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-8.0.4-windows-x64-installer).

### Download the Latest Build from Github Actions

You need to log in to Github to download. If you don't need certain features, you can download from the Release section. Refer to image 3.

[Github Actions](https://github.com/KonataDev/Lagrange.Core/actions)  

Follow the images to download:

![Image 1](/assets/image/dl_lgr_1.png)

![Image 2](/assets/image/dl_lgr_2.png)

![Image 3](/assets/image/dl_lgr_3.png)

### Final Steps

Unzip the downloaded zip file, navigate to the directory containing `Lagrange.OneBot.exe`, and open a command prompt in this directory. Enter the following command:

```bash
.\Lagrange.OneBot
```

Run it once. If a QR code is output, you can directly scan it with your bot account to log in (if the QR code is unclear, you can find the image file in the `lagrange/data` directory).  

If you cannot log in, please check if the `SignServerUrl` in the `appsettings.json` configuration file of Lagrange is correctly filled. You can find the signing address in the Lagrange documentation.  

## Modifying Configuration

To configure Lagrange to connect to LangBot, edit the `appsettings.json` configuration file of Lagrange. Ensure that the connection settings under `Implementations` match the content shown in the image below:

![Configuration Connection](/assets/image/config_lgr.png)

The `Type` must be `ReverseWebSocket`;  
The `Host` should be the IP address of the host running LangBot. If it's on the same host, you can use `127.0.0.1`;  
The `Suffix` must be `/ws`;  
The `Port` must match the port that the `aiocqhttp` adapter in the LangBot message platform configuration is listening on.

Next, please read [Filling in Configuration Information](/deploy/quick-config/config).