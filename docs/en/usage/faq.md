# LangBot Frequently Asked Questions

## Q: How to fill in the official bot IP whitelist?

If you are running the bot on your own computer: Open the [IP138](https://ip38.com/) website to get your network's outbound IP, and fill in this IP as shown in the image.

![](/assets/image/error_q3.png)

If it's not on your own computer (e.g., a cloud server), please check the public IP of the host yourself.

## Q: Various request failure error cases:

1. Your model API key is either not filled in or incorrect.

![](/assets/image/error_q4.png)

2. The relay station has run out of quota.

![](/assets/image/error_q5.png)

3. Check if the provider's address is correct (did you add /v1 at the end?).

![](/assets/image/error_q6.png)

## Q: Plugin installation failed?

Try enabling a network proxy on the host. For Linux, you need to set the environment variables `http_proxy` and `https_proxy`.