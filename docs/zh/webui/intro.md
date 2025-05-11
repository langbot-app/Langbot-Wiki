# 管理面板（Beta测试）

管理面板（WebUI）将在 v3.4.0 版本开始 Beta 测试，有任何问题或建议欢迎反馈到：https://github.com/RockChinQ/LangBot/issues

![WebUI](/assets/image/webui_intro_01.png)

## 部署 WebUI

依据本文档所述的部署方式新部署的实例，均自带 WebUI，默认启用。

### 从低于 3.4.0 版本升级的实例？

若是使用 Docker 拉取最新的镜像，也自带有 WebUI；若是手动部署的实例，请从 [Releases](https://github.com/RockChinQ/LangBot) 页面下载最新版的 `langbot-xxx-all.zip` 文件，解压覆盖之前部署的代码目录。

## 未实现功能

- Prompt 编辑器：单独一页，实现一个直观、便捷的 Prompt 编辑器。
- 消息平台管理页：现在仅支持在 设置 页修改消息平台，后续将把消息平台的修改、重载、统计整合到单独一页。
- 元数据文件编辑：目前暂不支持元数据编辑，请先根据文档修改文件内容来编辑。
- 模型数据更改：动态编辑模型元数据、所使用的模型、各会话区分模型等功能将在元数据编辑支持后规划，目前请先根据文档手动编辑文件。

