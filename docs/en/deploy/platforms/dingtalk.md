# Deploy DingTalk Bot

Deploy LangBot to DingTalk.

## Create Bot

Enter the [DingTalk Developer Backend](https://open-dev.dingtalk.com/?spm=ding_open_doc.document.0.0.74f445e5MkawbT#/), log in and enter the organization. After successful login, enter the open platform, which looks like this:
![DingTalk Open Platform](/assets/image/zh/deploy/bots/dingtalk/dingtalk1.png)

Click `Application Development` at the top, then click the blue button `Create Application` on the right, fill in the basic information of the bot, and click save.

Enter the bot's backend, for example, if we have a bot named langbot2, its management page looks like this:
![Bot Page](/assets/image/zh/deploy/bots/dingtalk/dingtalk2.png)

## Configure Bot

Click `Add Application Capability`, `Other Application Capabilities`, `Configure` in `Robot`, click configure and fill in the information, as shown below:
![Bot Configuration](/assets/image/zh/deploy/bots/dingtalk/dingtalk3.png)

Click `Publish` at the bottom of the page, after successful publication, click `Version Management and Publishing` at the bottom left of the bot page, as shown:
![Version Management and Publishing](/assets/image/zh/deploy/bots/dingtalk/dingtalk4.png)

If this is the first time creating a bot, the right side is empty, you need to click `Create New Version`, set information in it, then set `Application Visibility Range`, and click save.

Click `Event Subscription`, change the push method to `Stream Mode Push`.

If card streaming is needed, you must apply for card permissions in the permission management, as shown:
![Before applying for card permissions](/assets/image/zh/deploy/bots/dingtalk/dingtalk6.png)

![After applying for card permissions](/assets/image/zh/deploy/bots/dingtalk/dingtalk7.png)

Additionally, for card messages you mainly need to create a card template and record the template ID to fill in the configuration, the process is as follows:
> The card content template ID can be obtained by logging into the developer backend > [Card Platform](https://open-dev.dingtalk.com/fe/card?spm=ding_open_doc.document.0.0.33cf2281L0fXsV)

Fill in information when creating a new template, as shown:
![Fill in information for new template](/assets/image/zh/deploy/bots/dingtalk/dingtalk8.png)

Select a preset template (just choose the first one and modify the template content later), as shown:
![Select preset template](/assets/image/zh/deploy/bots/dingtalk/dingtalk9.png)
Click Use
![Click](/assets/image/zh/deploy/bots/dingtalk/dingtalk10.png)
Create
![Create](/assets/image/zh/deploy/bots/dingtalk/dingtalk11.png)

After clicking Create you'll be redirected to edit the template. As shown, you can freely edit your desired card message:
![Edit template](/assets/image/zh/deploy/bots/dingtalk/dingtalk12.png)

For the main content, keep the default 'content' unchanged:
![Don't modify](../../../assets/image/zh/deploy/bots/dingtalk/dingtalk13.png)

After editing and confirming everything is correct, save it and copy the template ID to fill in the configuration file:
![Save](../../../assets/image/zh/deploy/bots/dingtalk/dingtalk14.png)
![Copy template ID](../../../assets/image/zh/deploy/bots/dingtalk/dingtalk15.png)

## Fill in Configuration Information

Click `Credentials and Basic Information`, record `Client ID` and `Client Secret`,
Click `Application Capabilities`, `Robot`, record the RobotCode and Robot Name.
`markdown_card` is whether to enable Markdown form replies.
Record the above configuration items and fill them in the LangBot bot configuration form

Click [Card Platform](https://open-dev.dingtalk.com/fe/card?spm=ding_open_doc.document.0.0.33cf2281L0fXsV), copy the corresponding bound template ID from the template list, and fill it into the card template ID field.

![Connect to LangBot](/assets/image/zh/deploy/bots/dingtalk/connect_to_langbot.png)

Streaming related:
![img.png](../../../assets/image/zh/deploy/bots/lark/lark_15.png)

**Start LangBot**.

## Add Bot

This article uses DingTalk Windows desktop version as an example, click `Search` at the top, `Features`, then enter the name of the bot you just created, as shown:
![robot_png](/assets/image/zh/deploy/bots/dingtalk/dingtalk5.png)

Click on the bot to chat with it.

If you want to add it to a group, click `Group Management`, `Robots`, `Add Robot` in the DingTalk group, then search for the bot name to use it in the group.
