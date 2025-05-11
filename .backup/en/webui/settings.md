# Settings Management

The content of the settings editing page corresponds to the configuration files in the [Function Configuration Page](/config/function/platform.html). Currently, it supports two editing modes: `Visual Editing` and `JSON Editing`. The JSON editor is consistent with the configuration file content in the Function Configuration Page and can be directly edited.

## Visual Editing

### Basic Fields

Basic fields can be directly edited or selected.

![Switch](/assets/image/webui_settings_01.png)

![Text Box](/assets/image/webui_settings_02.png)

### String Array

Enter the string you want to add and press the Enter key to add it.

![String Array](/assets/image/webui_settings_03.png)

### Object Array

For example, the message platform adapter, where the array contains objects. You can click the `Add` button below to add a new adapter. After selecting the type, the corresponding parameters that need to be filled will be displayed. Fill them in as described in the documentation.

![Object Array](/assets/image/webui_settings_04.png)

![Add Object](/assets/image/webui_settings_05.png)

::: tip
After changing the message platform adapter, you need to manually perform a [`Hot Reload`](/webui/system.html#%E7%83%AD%E9%87%8D%E8%BD%BD) to make it effective.
:::