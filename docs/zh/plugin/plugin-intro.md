# LangBot 插件

LangBot 内部由多种组件组成，如大模型工具、命令、消息平台适配器、大模型请求器等。为了满足扩展性和灵活性的需求，我们实现了一套生产级的插件系统。

每个插件被运行在独立的进程中，由 Plugin Runtime 统一管理。

<img width="600" src="/assets/image/zh/plugin/dev/plugin_system_arch.png" />

## 插件结构

插件根据具体功能可由以下组件构成：

- 事件处理器：监听流水线执行期间的事件，对上下文或流水线进行修改。
- 命令：由用户通过`!`（或其他已设置的前缀）开头的命令消息触发。
- 工具：供 LangBot 内置的 Local Agent 在执行期间由 LLM 调用。

后续还将支持更多组件的插件化。

## 安装插件

目前支持上传插件包和从插件市场安装插件。  
在 LangBot 的插件管理页面，点击右上角即可选择安装方式

<img width="600" src="/assets/image/zh/plugin/install_from_local.png" />

选择他人分享的或从 Marketplace 下载的`.lbpkg`文件，即可安装插件。

或点击插件市场 Tab，选择插件后点击安装。

<img width="600" src="/assets/image/zh/plugin/install_from_marketplace.png" />

## 插件管理

### 插件配置项

某些插件可能会要求您填入特定的配置项（请参考插件 README 说明），请点击插件卡片进入插件详情页，按照提示获取并输入。

<img width="600" src="/assets/image/zh/plugin/plugin_config.png" />

### 更新插件

仅支持更新从插件市场安装的插件。

<img width="600" src="/assets/image/zh/plugin/update_plugin.png" />

## 插件市场

插件市场可以从 LangBot 内部的`插件管理`页面进入，也可以访问独立站点[LangBot 插件市场](https://space.langbot.app/market)。
