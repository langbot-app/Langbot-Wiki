# Completing Plugin Information

## Modifying the Manifest File

The `manifest.yaml` file in the plugin directory declares the basic information about the plugin, which will be displayed in the LangBot UI or plugin marketplace interfaces.

```yaml
apiVersion: v1  # Do not modify
kind: Plugin  # Do not modify
metadata:
  author: RockChinQ  # Author, must match regex ^[a-zA-Z0-9_-]+$
  name: HelloPlugin  # Plugin name, used to distinguish plugins, must match regex ^[a-zA-Z0-9-]+$
  repository: 'https://github.com/langbot-app/HelloPlugin'  # Plugin repository URL
  version: 0.1.0  # Plugin version
  description:
    en_US: 'Hello LangBot Plugin'  # Plugin description, multilingual
    zh_Hans: 'Hello LangBot Plugin'
  label:
    en_US: HelloPlugin  # Plugin label, displayed in the interface, multilingual
    zh_Hans: HelloPlugin
  icon: assets/icon.svg  # Plugin icon, defaults to assets/icon.svg, can be replaced with various image formats
spec:
  config: []  # Plugin configuration item format
  components: {}  # Plugin component list, no need to modify manually
execution:
  python:
    path: main.py  # Do not modify
    attr: HelloPlugin  # Do not modify
```

Plugin multilingual support follows the [RFC 4646](https://datatracker.ietf.org/doc/html/rfc4646) standard. Currently supported languages include:

- `en_US` English
- `zh_Hans` Simplified Chinese
- `zh_Hant` Traditional Chinese
- `ja_JP` Japanese

## Plugin Configuration Item Format

In the `manifest.yaml` file, fields declared in `spec.config` will be rendered by LangBot as configuration item forms for users to fill out. Plugins can retrieve user-filled configuration items through APIs provided by the SDK (see later sections).

For example:

```yaml
spec:
  config:
    - name: github_token  # Required; configuration item name, used for retrieval in the plugin
      type: string  # Required; configuration item type, supports string, integer, float, boolean, select, prompt-editor, llm-model-selector, etc.
      label:  # Required; configuration item display name, supports multilingual. Language codes follow RFC 4646 standard.
        en_US: Github Token
        zh_Hans: Github Token
      description:  # Configuration item description, supports multilingual. Optional.
        en_US: Image downloading requires a Github token
        zh_Hans: 如果不填的话，图片可能会下载失败
      default: ''  # Configuration item default value, optional.
      required: false  # Whether the configuration item is required, optional.
    - name: mode
      type: select
      ...
```

The supported types and fields for configuration items are as follows:

### type: string

String type.

```yaml
- name: api_key
  type: string
  ...
```

### type: array[string]

String array.

```yaml
- name: tags
  type: array[string]
  ...
```

### type: integer

Integer type.

```yaml
- name: progress
  type: integer
  ...
```

### type: float

Float type.

```yaml
- name: temperature
  type: float
  ...
```

### type: boolean

Boolean type.

```yaml
- name: is_enabled
  type: boolean
  ...
```

### type: select

Dropdown menu. Requires configuring `options`, which represents the dropdown menu options.

```yaml
- name: mode
  type: select
  options:  # Dropdown options, supports multilingual.
    - name: mode1  # Value
      label:  # Display name, supports multilingual.
        en_US: Mode 1
        zh_Hans: 模式 1
    - name: mode2
      label:  # Display name, supports multilingual.
        en_US: Mode 2
        zh_Hans: 模式 2
  ...
```

### type: prompt-editor

Prompt editor. Displays a prompt editor from the pipeline configuration page, with the final result represented in OpenAI's `messages` format.

```yaml
- name: prompt
  type: prompt-editor
  ...
```

### type: llm-model-selector

LLM model selector. Displays an LLM model selector where you can choose configured LLM models, with the final result represented as the LLM model UUID.

```yaml
- name: model
  type: llm-model-selector
  ...
```

## What's Next

This tutorial will guide you through step-by-step completion of plugin functionality.

- Adding Components: Plugin components are the core functional units of plugins. You can [add components](/en/plugin/dev/components/add) based on your needs.