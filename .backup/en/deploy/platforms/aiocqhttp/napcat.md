# Deploying the Messaging Platform NapCat

## NapCat Installation Tutorial

Follow the [NapCat Official Documentation for Installation](https://napcat.napneko.icu/guide/start-install).

## NapCat Configuration Tutorial

This example uses the webui operation. For other configuration methods, please refer to the NapCat documentation.

After logging in, you can view the logs in the console or Bash. Look for the following line:  
`[NapCat] [WebUi] WebUi Publish Panel Url: http://x.x.x.x:6099/webui?token=xxxxx`  
![napcat_webui_0](/assets/image/napcat_webui_0.png)

Copy the URL to your browser, or on Windows 11, press Ctrl and click the URL. After scanning the QR code to log in, you will be directed to the network configuration page.

Click to add a network configuration for the WebSocket client, then enable it. In the URL field, enter `ws://127.0.0.1:2280/ws` and save it.  
![napcat_webui_1](/assets/image/napcat_webui_1.png)  
![napcat_webui_2](/assets/image/napcat_webui_2.png)

::: info
- The port number depends on the `port` field of `aiocqhttp` in `data/config/platform.json`. The default is 2280. Please refer to [Filling in Configuration Information](/deploy/quick-config/config) to continue the configuration.
- You must use the WebSocket Client (Reverse WS) to connect to LangBot. Make sure to modify the IP address and port according to your actual situation, and the suffix must be `/ws`.
- If both LangBot and NapCat are running in containers, please refer to [Container Network Configuration](/deploy/network-details).
:::

Next, please read [Filling in Configuration Information](/deploy/quick-config/config).