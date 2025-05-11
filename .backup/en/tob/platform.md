# Message Platform Stability

:::info Table of Contents
[[toc]]
:::

Most mainstream bots use `reverse engineering` methods to crack QQ's communication protocol, enabling program-controlled functionalities. This approach has a certain gray area and may be subject to Tencent's system risk control.

Based on current cases, existing reverse engineering methods can achieve relatively stable operation for several months, with service downtime recovery not exceeding 24 hours. There is robust community support, making it suitable for commercial use.

## Reducing Risk of Being Flagged by Risk Control

- Enable `forced message delay` and `request rate limiting` in the configuration file to slow down the bot's response time to user messages, thereby reducing the risk of being flagged by risk control.

- Avoid using the bot in large groups with complex memberships. Generally, this does not cause issues, and there have been cases where bots have run stably in groups of 3000 members for nearly a year. However, if group members frequently report the bot account, it may be flagged by risk control.

- Run the message platform on a domestic host or a computer using a home network, and try to avoid using overseas hosts.

## Running Multiple Bot Services

If the bot's business is weakly related to the account itself, consider running multiple `message platforms` (for example, logging into two Lagrange instances with two accounts). If one bot is banned by Tencent, the other can continue to provide services.

## Using QQ Official Bot API

Tencent officially opened the Q group bot API in the second half of 2023. LangBot supports this API well, and you can refer to the deployment tutorial for configuration instructions.

However, the QQ official bot API has the following known limitations:

- Requires enterprise qualifications to apply
- Only supports group usage, not private chats
- Can only receive messages in the group that @mention the bot, and cannot receive other messages in the group
- Limited number of active message sends per day
- Tencent has strict reviews on bots with AIGC functionalities