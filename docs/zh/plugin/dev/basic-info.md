# 完善插件信息

## 修改清单文件

插件目录下的`manifest.yaml`文件声明了插件的基础信息，这些信息会被展示到 LangBot UI 或插件市场等界面上。

```yaml
apiVersion: v1  # 请勿修改
kind: Plugin  # 请勿修改
metadata:
  author: RockChinQ  # 作者，符合正则表达式 ^[a-zA-Z0-9_-]+$
  name: HelloPlugin  # 插件名称，用于区分插件，符合正则表达式 ^[a-zA-Z0-9-]+$
  repository: 'https://github.com/langbot-app/HelloPlugin'  # 插件仓库地址
  version: 0.1.0  # 插件版本
  description:
    en_US: 'Hello LangBot Plugin'  # 插件描述，多语言
    zh_Hans: 'Hello LangBot Plugin'
  label:
    en_US: HelloPlugin  # 插件标签，用于在界面上展示，多语言
    zh_Hans: HelloPlugin
  icon: assets/icon.svg  # 插件图标，默认使用 assets/icon.svg，可自行替换，支持各种图片格式
spec:
  config: []  # 插件所需配置项格式
  components: {}  # 插件组件列表，无需手动修改
execution:
  python:
    path: main.py  # 请勿修改
    attr: HelloPlugin  # 请勿修改
```

插件多语言遵循 [RFC 4646](https://datatracker.ietf.org/doc/html/rfc4646) 标准，目前支持的语言有：

- `en_US` 英文
- `zh_Hans` 简体中文
- `zh_Hant` 繁体中文
- `ja_JP` 日语

## 插件配置项格式

在 `manifest.yaml` 文件中，`spec.config` 声明的字段将在 LangBot 渲染成配置项表单由用户填写，插件可通过 SDK 提供的 API 获取用户填写的配置项（见后文）。

例如：

```yaml
spec:
  config:
    - name: github_token  # 必填；配置项名称，用于在插件中获取
      type: string  # 必填；配置项类型，支持 string, integer, float, boolean, select, prompt-editor, llm-model-selector 等
      label:  # 必填；配置项显示名称，支持多语言。语言代码采用 RFC 4646 标准。
        en_US: Github Token
        zh_Hans: Github Token
      description:  # 配置项描述，支持多语言。可选。
        en_US: Image downloading requires a Github token
        zh_Hans: 如果不填的话，图片可能会下载失败
      default: ''  # 配置项默认值，可选。
      required: false  # 配置项是否必填，可选。
    - name: mode
      type: select
      ...
```

配置项支持的各个类型及字段如下：

### type: string

字符串。

```yaml
- name: api_key
  type: string
  ...
```

### type: array[string]

字符串数组。

```yaml
- name: tags
  type: array[string]
  ...
```

### type: integer

整数。

```yaml
- name: progress
  type: integer
  ...
```

### type: float

浮点数。

```yaml
- name: temperature
  type: float
  ...
```

### type: boolean

布尔值。

```yaml
- name: is_enabled
  type: boolean
  ...
```

### type: select

下拉框。需要配置 `options` 选项，表示下拉框的选项。

```yaml
- name: mode
  type: select
  options:  # 下拉框选项，支持多语言。
    - name: mode1  # 值
      label:  # 显示名称，支持多语言。
        en_US: Mode 1
        zh_Hans: 模式 1
    - name: mode2
      label:  # 显示名称，支持多语言。
        en_US: Mode 2
        zh_Hans: 模式 2
  ...
```

### type: prompt-editor

提示词编辑器。会展示一个流水线配置页面的提示词编辑器，最终结果表示为 OpenAI 的 `messages` 格式。

```yaml
- name: prompt
  type: prompt-editor
  ...
```

### type: llm-model-selector

LLM 模型选择器。会展示一个 LLM 模型选择器，可选择已配置的 LLM 模型，最终结果表示为 LLM 模型 uuid。

```yaml
- name: model
  type: llm-model-selector
  ...
```

## 接下来做什么

该教程将指引您逐步完善插件功能。

- 添加组件：插件组件是插件的核心功能单元，您可以根据需求[添加组件](/zh/plugin/dev/components/add)。
