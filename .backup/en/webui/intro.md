# Management Panel (Beta Testing)

The Management Panel (WebUI) will begin Beta testing starting from version v3.4.0. Any issues or suggestions are welcome and can be reported at: https://github.com/RockChinQ/LangBot/issues

![WebUI](/assets/image/webui_intro_01.png)

## Deploying the WebUI

Instances newly deployed according to the methods described in this document will come with the WebUI enabled by default.

### Upgrading from a version below 3.4.0?

If you are using Docker to pull the latest image, it will also include the WebUI. For manually deployed instances, please download the latest version of the `langbot-xxx-all.zip` file from the [Releases](https://github.com/RockChinQ/LangBot) page and extract it to overwrite the previously deployed code directory.

## Unimplemented Features

- **Prompt Editor**: A dedicated page for an intuitive and convenient Prompt editor.
- **Message Platform Management Page**: Currently, message platform modifications are only supported on the Settings page. In the future, modifications, reloading, and statistics for message platforms will be integrated into a dedicated page.
- **Metadata File Editing**: Metadata editing is currently not supported. Please modify the file content according to the documentation for now.
- **Model Data Changes**: Dynamic editing of model metadata, the models used, and session-specific model differentiation will be planned after metadata editing is supported. For now, please manually edit the files according to the documentation.