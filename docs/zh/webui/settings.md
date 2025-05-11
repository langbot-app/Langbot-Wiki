# 设置项管理

设置项编辑页的内容均对应[功能配置页](/config/function/platform.html)中各个配置文件的内容。目前支持`可视化编辑`和`JSON编辑`两种，JSON 编辑器与功能配置页中的配置文件内容一致，可直接编辑。

## 可视化编辑

### 基本字段

基本的字段直接编辑或者选择即可。

![开关](/assets/image/webui_settings_01.png)

![文本框](/assets/image/webui_settings_02.png)

### 字符串数组

输入要添加的字符串，按回车键即可添加。

![字符串数组](/assets/image/webui_settings_03.png)

### 对象数组

例如消息平台适配器，数组内均为对象，可以点击下方`添加`按钮，添加新的适配器，选择类型后会展示对应需要填写的参数，按照文档所述填写。

![对象数组](/assets/image/webui_settings_04.png)

![添加对象](/assets/image/webui_settings_05.png)

::: tip
消息平台适配器更改之后需要手动进行[`热重载`](/webui/system.html#%E7%83%AD%E9%87%8D%E8%BD%BD)以生效
:::