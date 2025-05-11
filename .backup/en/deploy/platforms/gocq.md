# Deploying the Messaging Platform go-cqhttp

> This document only covers the basic steps. For detailed operations, troubleshooting, and the latest information, please refer to the [official go-cqhttp documentation](https://docs.go-cqhttp.org/).

::: warning 

gocq is not archived, but the original developer has stated: [https://github.com/Mrs4s/go-cqhttp/issues/2471](https://github.com/Mrs4s/go-cqhttp/issues/2471)

:::

## Download go-cqhttp

Download the latest go-cqhttp executable from the [go-cqhttp Release](https://github.com/Mrs4s/go-cqhttp/releases/latest) (it is recommended to directly download the executable zip file instead of the installer).

![Download gocq](/assets/image/dl_gocq.png)

## Run and Configure go-cqhttp

Unzip and run the file. The first time you run it, it will ask for the network protocol to be opened. **Please enter `02` and press Enter. You must enter `02`❗❗❗❗❗❗❗**

```
C:\Softwares\go-cqhttp.old> .\go-cqhttp.exe
Configuration file not found, generating configuration file for you!
Please select the communication method you need:
> 0: HTTP communication
> 1: Cloud function service
> 2: Forward Websocket communication
> 3: Reverse Websocket communication
Please enter the number(s) you need (0-9), you can enter multiple, and the same number can be entered multiple times (e.g., 233)
Your choice is:02
```

A prompt will indicate that the `config.yml` file has been generated. Close go-cqhttp.

Open the `config.yml` file in the same directory as go-cqhttp.

1. Edit the account login information

Only modify the `uin` and `password` below to the QQ number and password of the bot account you want to log in to.

```yaml
account: # Account related
    uin: 1233456 # QQ account
    password: '' # Use QR code login when the password is empty
    encrypt: false  # Whether to enable password encryption
    status: 0      # Online status, please refer to https://docs.go-cqhttp.org/guide/config.html#在线状态
    relogin: # Reconnection settings
        delay: 3   # First reconnection delay, in seconds
        interval: 3   # Reconnection interval
        max-times: 0  # Maximum reconnection times, 0 means unlimited
```

2. Modify the websocket port

Find the following content in `config.yml`

```yaml
  - ws:
    # Forward WS server listening address
    address: 0.0.0.0:8080
    middlewares:
        <<: *default # Reference default middleware
```

**Change `0.0.0.0:8080` to `0.0.0.0:6700`**, save and close `config.yml`.

3. Configure the signature server

Fill in as follows,

```yaml
  sign-servers: 
    - url: 'https://qsign.trpgbot.com/'  # Main signature server address, required
      key: 'selfshare' 
      authorization: '-' 
    - url: 'https://qsign-v3.trpgbot.com/'  # Secondary server address, optional
      key: 'selfshare' 
      authorization: '-' 

  auto-register: true
```   

Write to the file /data/versions/6.json,

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

Thanks to zhaodice for bringing the QQ 9.0.56 signature server.

4. If your server is on the public network, it is strongly recommended to fill in the `access-token` (optional)

```yaml
# Default middleware anchor
default-middlewares: &default
    # Access token, strongly recommended for servers on the public network
    access-token: ''
```

5. Configuration is complete, restart go-cqhttp.

## Login

Double-click the login script. After a while, you will see a prompt.

![Login gocq](/assets/image/first_launch.png)

Copy the link after `Captcha link: ` and open it in Chrome or Edge. Press F12 to open the developer tools.

Open `Network`.

![Pass captcha](/assets/image/get_captcha.png)

Complete the verification in the browser. In `Network`, find the request named `cap_union_new_verify`, at the very bottom.

![Get token](/assets/image/get_gocq_login_token.png)

The content after `ticket` is what you need to input back into go-cqhttp, but do not include the double quotes at the beginning and end.

**Note**

- Remember to delete the quotes (`"`, there is one at the beginning and end) when copying, as they are not part of the ticket content.
- Be quick.
- Make sure not to miss any characters (the content is long, make sure you copy it all).

Paste the copied content into the terminal running go-cqhttp.

![Paste token](/assets/image/paste_token.png)

> If the login is unsuccessful after starting, please try modifying the protocol number in `device.json` according to [this document](https://docs.go-cqhttp.org/guide/config.html#%E8%AE%BE%E5%A4%87%E4%BF%A1%E6%81%AF).

## Next Steps

Check the configuration information page and connect via the Nakuru adapter.