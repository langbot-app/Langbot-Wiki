# Integrating LINE Bot

This article explains how to connect LangBot with the LINE platform to implement LINE bot functionality.

## Creating a LINE Bot

### Register a LINE Developer Account

1. Visit the [LINE Developers website](https://developers.line.biz/) and log in with your LINE account
2. After logging in, enter the developer console

### Create Provider and Channel

> [Developer Console](https://developers.line.biz/console)

1. In the developer console, create a new Provider (if you don't have one)
![alt text](/assets/image/zh/deploy/bots/line/line01.png)
2. Under the Provider, click "Create"
![alt text](/assets/image/zh/deploy/bots/line/line02.png)
3. Enter a name and click Create
![alt text](/assets/image/zh/deploy/bots/line/line03.png)

4. After being redirected, select Create a Message API
![alt text](/assets/image/zh/deploy/bots/line/line04.png)
* Continue by clicking Create a Message API
![alt text](/assets/image/zh/deploy/bots/line/line05.png)
* After being redirected, fill in the basic information
![alt text](/assets/image/zh/deploy/bots/line/line06.png)
   - Channel Name
   - Channel Description
   - Category
   - Subcategory
   - Email Address
5. After filling in all information, click "Continue" to create
![alt text](/assets/image/zh/deploy/bots/line/line07.png)
6. Check the information you entered, and if there are no issues, click Submit
![alt text](/assets/image/zh/deploy/bots/line/line08.png)
7. Successfully created, proceed to use
![alt text](/assets/image/zh/deploy/bots/line/line09.png)

### Get Configuration Information

After creation, you will obtain the following important information, please record it:

1. Channel Secret
> [Page after clicking use](https://manager.line.biz/account)
* Select Settings
![alt text](/assets/image/zh/deploy/bots/line/line09.png)
* Click Message API
![alt text](/assets/image/zh/deploy/bots/line/line11.png)
* Enable Message API
![alt text](/assets/image/zh/deploy/bots/line/line12.png)
* Select the Provider you just created and click Agree
![alt text](/assets/image/zh/deploy/bots/line/line13.png)
* For privacy terms, simply click OK
![alt text](/assets/image/zh/deploy/bots/line/line14.png)
* Click OK to complete creation
![alt text](/assets/image/zh/deploy/bots/line/line15.png)
* Copy it
![alt text](/assets/image/zh/deploy/bots/line/line16.png)

2. Channel Access Token (need to click the "Issue" button to generate)
* Click console or directly visit [Console](https://developers.line.biz/console/)
![alt text](/assets/image/zh/deploy/bots/line/line17.png)
* Select the Provider you created and click Message API
![alt text](/assets/image/zh/deploy/bots/line/line18.png)
* Click Message API
![alt text](/assets/image/zh/deploy/bots/line/line19.png)
* Scroll to the bottom, click Issue
![alt text](/assets/image/zh/deploy/bots/line/line20.png)
* Click the icon to copy
![alt text](/assets/image/zh/deploy/bots/line/line21.png)

## Configure Webhook

* Click console or directly visit [Console](https://developers.line.biz/console/)
![alt text](/assets/image/zh/deploy/bots/line/line17.png)
* Select the Provider you created and click Message API
![alt text](/assets/image/zh/deploy/bots/line/line18.png)
* Click Message API
![alt text](/assets/image/zh/deploy/bots/line/line19.png)
* Click Edit to fill in the connection
![alt text](/assets/image/zh/deploy/bots/line/line22.png)
* Enter the connection (must be an HTTPS connection, which means you need an SSL certificate), click Update
![alt text](/assets/image/zh/deploy/bots/line/line23.png)

* Select Use Webhook
![alt text](/assets/image/zh/deploy/bots/line/line24.png)

5. Click the "Verify" button to test if the connection is successful
![alt text](/assets/image/zh/deploy/bots/line/line25.png)

## Connecting to LangBot

Next, open the LangBot configuration page:

1. Click "Bots", then click "Add"
![alt text](/assets/image/zh/deploy/bots/line/line26.png)
2. Select "LINE" in "Platform/Adapter Selection"
![alt text](/assets/image/zh/deploy/bots/line/line27.png)

3. Fill in the configuration information:
   - Channel Secret: The Channel secret you obtained earlier
   - Channel Access Token: The Channel access token you obtained earlier
   ![alt text](/assets/image/zh/deploy/bots/line/line28.png)

4. Click "Save" to complete the configuration
   ![alt text](/assets/image/zh/deploy/bots/line/line29.png)

## Feature Configuration

In the LINE developer console, you can further configure the bot's features:

1. In the "Messaging API" tab, find the "LINE Official Account Features" section
2. Enable or disable the following features as needed:
   - Auto-reply messages
   - Welcome messages when adding friends
   - Group and multi-person chat
   - Greeting when the bot joins a group

## Usage

After configuration, users can interact with your LINE bot through the following methods:

1. Scan the QR code provided in the LINE developer console to add the bot as a friend
2. Send messages in the chat, and the bot will process and reply through LangBot

## Common Issues

### Webhook Verification Failed

- Ensure your server can be accessed via HTTPS
- Check if the Webhook URL is correct
- Confirm that the LangBot service is running properly

### Unable to Receive Messages

- Check if the Channel Access Token is valid
- Confirm that the "Use Webhook" option is enabled
- Check the LangBot logs for error messages

### Permission Issues

- Ensure you have enabled the necessary permissions for the bot in the LINE developer console
- For some advanced features, a LINE Premium account may be required
