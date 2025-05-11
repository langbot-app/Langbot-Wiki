# Integrating Dify on LangBot (NewAPI Relay Solution)

::: info 
This article is written by a community contributor.  
Direct integration with Dify Service API is now supported. Please refer to [How to Integrate Dify?](./dify-service-api) for details.
:::

[Dify](https://dify.ai/) is an open-source AI application development platform that supports multiple AI models and a rich set of plugins for quickly building AI Agents, Workflows, and other applications. Through middleware, we can utilize Dify's features on LangBot.

::: warning 
This tutorial assumes the use of a Linux system with LangBot's messaging platform already configured. If you are unfamiliar with Linux or Debian, please do not use this tutorial. If LangBot is not deployed, please configure LangBot first before referring to this tutorial.
:::

## Install and Configure Docker

Dify recommends using Docker for installation. If you have already started LangBot using Docker, you can skip this step.

```bash
# For Debian:
apt update
apt install -y docker docker-compose-plugin
# For Ubuntu:
apt update
apt install -y docker docker-compose-v2
```

The Docker image repository is blocked in China, and the official repository is often inaccessible. Therefore, you need to switch to an available mirror site: https://docker.1panel.live

Use the vim editor to modify the `/etc/docker/daemon.json` file.

```bash
vim /etc/docker/daemon.json
```

The file should be empty. Press the "I" key to enter edit mode and paste the following content:

```json
{
  "registry-mirrors": ["https://docker.1panel.live"]
}
```

![Configure Docker](/assets/image/dify_01.png)

Press the `Esc` key to exit edit mode, then enter `:wq` to save and exit.

Restart the Docker service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Use `docker info` to check if the change was successful.

![Check Docker](/assets/image/dify_02.png)

## Install and Configure Dify

First, install git:

```bash
apt install -y git
```

Use git to clone the Dify source code and enter the Docker directory:

```bash
git clone https://github.com/langgenius/dify.git
cd dify/docker
```

Copy the environment configuration file and start Dify:

```bash
cp .env.example .env
docker compose up -d
```

![Start Dify](/assets/image/dify_03.png)

This process may take some time, so please be patient.

After all containers are running successfully, wait for 2-3 minutes, then use a browser to access `http://your-server-address` for the initial setup.

Set up the administrator account email and password. After setup, log in to Dify.

Click on the user icon in the top-left corner, then click on Settings.

![Dify Settings](/assets/image/dify_04.png)

Then click on `Model Providers`.

![Dify Model Providers](/assets/image/dify_05.png)

Here, I have already added the necessary configurations based on my requirements.

Go to the Studio → Create a Blank Application, and select `Chat Assistant`.

> Basic Orchestration: Fewer features but simpler configuration  
> Workflow Orchestration: Complex functionality based on workflows but harder to configure, not suitable for beginners  
> 
> Choose based on your needs.

![Dify Create Application](/assets/image/dify_06.png)

Fill in the basic information such as the name, then click Create.

![Dify Enter Application](/assets/image/dify_07.png)

Select the model in the top-right corner.
After setting up, click on Publish → Update in the top-right corner to update the application. If not updated, it cannot be used.

![Dify Update Application](/assets/image/dify_08.png)

Then click on Access API, and in the top-right corner, click on API Keys → Create Key. Copy the generated key content.

![Dify Create Key](/assets/image/dify_09.png)

![Dify Copy Key](/assets/image/dify_10.png)

The Dify configuration part is now complete.

## Deploy the NewAPI Middleware

Dify's API does not use the standard OpenAI API, so a relay is needed.

We will use [new-api](https://github.com/Calcium-Ion/new-api).

Install wget:

```bash
apt install -y wget
```

Create a directory in the ~ directory to store new-api:

```bash
mkdir ~/new-api
```

Download New-api:

```bash
cd new-api
```

For arm64:

```bash
wget https://github.com/Calcium-Ion/new-api/releases/download/v0.2.9.7/one-api-arm64
```

For x86/64:

```bash
wget https://github.com/Calcium-Ion/new-api/releases/download/v0.2.9.7/one-api
```

(arm64 is generally for development boards. If you don't know what a development board is or what arm64 is, just use x86/64.)

Install screen for process management:

```bash
apt install -y screen
```

Use:

```bash
screen -R name
```

Create a new screen. If a screen with the same name exists, it will enter that screen.

```bash
cd ~/new-api
```

Add permissions:

```bash
chmod 775 new-api
```

Run new-api:

```bash
./new-api
```

Wait for it to finish running.

```bash
Ctrl+a+d
```

Exit the current window (run in the background).

Access the following URL in a browser:

```bash
http://your-server-address:3000/
```

Default username: root  
Default password: 123456

After logging in, go to:
`User Management → Edit → Password`
Change the root password.
After changing the password, click on
`Channels → Add Channel`

![New-api Add Channel](/assets/image/dify_11.png)

Select dify in the Type field, fill in the name, and click on Fill in the relevant models.
Fill in the key, which is the key content generated during the Dify configuration.

![New-api Fill in Models](/assets/image/dify_12.png)

Go to the Tokens page in new-api, click on Add Token, and fill in the basic information as prompted. Set the name, expiration, and quota as needed.

![New-api Add Token](/assets/image/dify_13.png)

After submitting, find the newly created token, hover over `View`, and copy the sk- prefixed content.

The basic configuration of new-api is now complete. Configure the rest as needed.

## Configure LangBot

Use the OpenAI provider, set the NewAPI address as the API address, and the NewAPI key as the API Key.

![LangBot Modify Key](/assets/image/dify_14.png)

Restart the LangBot project. The integration with Dify is now complete.