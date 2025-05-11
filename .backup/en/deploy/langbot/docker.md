# Docker Deployment (Recommended for Linux Only)

:::warning
Please **ensure** you have the following capabilities:  
 - Familiarity with `Docker` and `Docker Compose`  
 - Understanding of network communication configuration between containers  
 - Knowledge of container file mounting mechanisms  
 - Strong hands-on skills and ability to search for resources
::: 

:::info
Please make sure Git, Docker, and Docker Compose are installed first.
:::

Clone the project using Git:

```bash
git clone https://github.com/RockChinQ/LangBot
cd LangBot
```

Start the container:

```bash
docker compose up
```

On the first startup, you will be prompted to create a configuration file. Please proceed with the configuration as instructed.

The container will map port `5300` for the WebUI, which you can access at `http://127.0.0.1:5300`.  
It will also map ports `2280-2290` for reverse connections from message platform adapters using the OneBot protocol. Please continue reading the [Message Platform Integration Documentation](/deploy/platforms/aiocqhttp/napcat).

## Notes

- Installed plugins will be saved in the `plugins` directory (mapped to the local `plugins` directory). When installing plugins, the necessary dependencies may be automatically installed. If you **recreate** the container, the installed plugins will be loaded, but the incremental dependencies will not be installed, which may cause issues. You can delete the plugin directory and restart, then reinstall the plugins to allow the program to automatically install the required dependencies.