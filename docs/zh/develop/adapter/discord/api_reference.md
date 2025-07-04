# Discord 适配器 API 参考

## 概述

Discord 适配器提供完整的 Discord 平台集成功能，包括消息处理、图像管理、语音连接等。所有功能基于 discord.py 库的原生 API 实现。

## 核心 API

### DiscordAdapter 类

Discord 平台适配器主类，提供与 Discord 平台交互的完整接口。

#### 消息相关方法

##### `send_message(target_type, target_id, message)`

发送消息到指定频道。

**参数:**
- `target_type` (str): 目标类型，通常为 "channel"
- `target_id` (str): 目标频道 ID
- `message` (MessageChain): 要发送的消息链

**功能:**
- 支持文本消息发送
- 支持图像文件批量发送
- 自动处理消息格式转换

**示例:**
```python
# 发送纯文本消息
await adapter.send_message("channel", "123456789", MessageChain([Plain("Hello!")]))

# 发送带图像的消息
message_chain = MessageChain([
    Plain("看看这张图片："),
    Image(path="path/to/image.jpg"),
    Image(url="https://example.com/image.png")
])
await adapter.send_message("channel", "123456789", message_chain)
```

---

##### `reply_message(message_source, message, quote_origin=False)`

回复指定消息。

**参数:**
- `message_source` (MessageEvent): 要回复的原始消息事件
- `message` (MessageChain): 回复内容
- `quote_origin` (bool): 是否引用原消息

**示例:**
```python
# 简单回复
await adapter.reply_message(
    message_event, 
    MessageChain([Plain("收到你的消息了！")])
)

# 引用回复
await adapter.reply_message(
    message_event,
    MessageChain([Plain("这是对你消息的回复")]),
    quote_origin=True
)
```

#### 语音相关方法

##### `join_voice_channel(guild_id, channel_id, user_id=None)`

加入指定的语音频道。

**参数:**
- `guild_id` (int): Discord 服务器 ID
- `channel_id` (int): 语音频道 ID  
- `user_id` (int, optional): 请求用户 ID，用于权限验证

**返回值:**
- `discord.VoiceClient`: 语音客户端对象

**异常:**
- `VoicePermissionError`: 权限不足
- `VoiceNetworkError`: 网络连接问题
- `VoiceConnectionError`: 其他连接错误

**示例:**
```python
try:
    voice_client = await adapter.join_voice_channel(
        guild_id=123456789,
        channel_id=987654321,
        user_id=555666777
    )
    print(f"成功连接，延迟: {voice_client.latency*1000:.2f}ms")
except VoicePermissionError as e:
    print(f"权限错误: {e.missing_permissions}")
```

---

##### `leave_voice_channel(guild_id)`

离开指定服务器的语音频道。

**参数:**
- `guild_id` (int): Discord 服务器 ID

**返回值:**
- `bool`: 成功断开返回 `True`

**示例:**
```python
success = await adapter.leave_voice_channel(guild_id=123456789)
if success:
    print("成功离开语音频道")
```

---

##### `get_voice_client(guild_id)`

获取指定服务器的语音客户端对象。

**参数:**
- `guild_id` (int): Discord 服务器 ID

**返回值:**
- `discord.VoiceClient`: 语音客户端对象，如果存在连接
- `None`: 如果没有活跃连接

**示例:**
```python
voice_client = await adapter.get_voice_client(guild_id=123456789)
if voice_client:
    # 播放音频
    import discord
    audio = discord.FFmpegPCMAudio("path/to/audio.mp3")
    voice_client.play(audio)
```

---

##### `is_connected_to_voice(guild_id)`

检查是否连接到指定服务器的语音频道。

**参数:**
- `guild_id` (int): Discord 服务器 ID

**返回值:**
- `bool`: 已连接返回 `True`

**示例:**
```python
if await adapter.is_connected_to_voice(guild_id=123456789):
    print("已连接到语音频道")
```

---

##### `get_voice_connection_status(guild_id)`

获取语音连接的详细状态信息。

**参数:**
- `guild_id` (int): Discord 服务器 ID

**返回值:**
- `dict`: 连接状态信息字典，如果存在连接
- `None`: 如果没有连接

**状态信息结构:**
```python
{
    'guild_id': int,
    'channel_id': int,
    'channel_name': str,
    'connected': bool,
    'connection_time': datetime,
    'last_activity': datetime,
    'status': str,  # VoiceConnectionStatus 枚举值
    'user_count': int,
    'latency': float,
    'connection_health': str
}
```

---

##### `list_active_voice_connections()`

获取所有活跃的语音连接列表。

**返回值:**
- `List[dict]`: 活跃连接状态列表

**示例:**
```python
connections = await adapter.list_active_voice_connections()
for conn in connections:
    print(f"服务器: {conn['guild_id']}, 频道: {conn['channel_name']}")
```

---

##### `get_voice_channel_info(guild_id, channel_id)`

获取指定语音频道的详细信息。

**参数:**
- `guild_id` (int): 服务器 ID
- `channel_id` (int): 频道 ID

**返回值:**
- `dict`: 频道信息字典
- `None`: 如果频道不存在

**频道信息结构:**
```python
{
    'channel_id': int,
    'channel_name': str,
    'guild_id': int,
    'guild_name': str,
    'user_limit': int,
    'current_users': List[dict],
    'user_count': int,
    'bitrate': int,
    'permissions': dict
}
```

#### 管理方法

##### `is_muted(group_id)`

检查群组是否被静音（Discord 适配器始终返回 False）。

**参数:**
- `group_id` (int): 群组 ID

**返回值:**
- `bool`: 是否静音

---

##### `register_listener(event_type, callback)`

注册事件监听器。

**参数:**
- `event_type` (Type[Event]): 事件类型
- `callback` (Callable): 回调函数

---

##### `unregister_listener(event_type, callback)`

注销事件监听器。

**参数:**
- `event_type` (Type[Event]): 事件类型
- `callback` (Callable): 回调函数

---

##### `run_async()`

启动 Discord 适配器，建立与 Discord 的连接。

**功能:**
- 初始化语音管理器
- 启动连接监控
- 建立 WebSocket 连接

---

##### `kill()`

关闭 Discord 适配器。

**返回值:**
- `bool`: 是否成功关闭

**功能:**
- 断开所有语音连接
- 关闭 Discord 客户端
- 清理资源

## 消息转换器 API

### DiscordMessageConverter 类

负责在 LangBot 和 Discord 消息格式之间进行转换。

#### `yiri2target(message_chain)`

将 LangBot MessageChain 转换为 Discord 格式。

**参数:**
- `message_chain` (MessageChain): LangBot 消息链

**返回值:**
- `Tuple[str, List[discord.File]]`: (文本内容, 文件列表)

**支持的消息元素:**
- `Plain`: 纯文本内容
- `Image`: 图像内容（支持 base64、URL、文件路径）
- `At`: @ 提及（会被移除）
- `Forward`: 转发消息

**图像处理特性:**
- **Base64 图像**: 自动检测格式并解码
- **URL 图像**: 异步下载并转换
- **文件路径**: 读取本地文件
- **格式检测**: 支持 PNG、JPG、GIF、WebP
- **错误处理**: 跳过无效图像

**示例:**
```python
message_chain = MessageChain([
    Plain("文本内容"),
    Image(base64="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="),
    Image(url="https://example.com/image.jpg"),
    Image(path="/path/to/local/image.png")
])

text, files = await DiscordMessageConverter.yiri2target(message_chain)
# text: "文本内容"
# files: [discord.File, discord.File, discord.File]
```

---

#### `target2yiri(message)`

将 Discord 消息转换为 LangBot MessageChain。

**参数:**
- `message` (discord.Message): Discord 消息对象

**返回值:**
- `MessageChain`: LangBot 消息链

**转换规则:**
- 文本内容 → `Plain` 元素
- 附件图像 → `Image` 元素
- 嵌入内容 → `Plain` 元素（描述文本）

## 事件转换器 API

### DiscordEventConverter 类

负责将 Discord 事件转换为 LangBot 平台事件。

#### `target2yiri(message)`

将 Discord 消息转换为 LangBot MessageEvent。

**参数:**
- `message` (discord.Message): Discord 消息对象

**返回值:**
- `MessageEvent`: LangBot 消息事件

**事件字段:**
- `message_chain`: 转换后的消息链
- `sender`: 发送者信息
- `query`: 查询上下文信息

## 异常类

### VoiceConnectionError

基础语音连接异常类。

**属性:**
- `error_code` (str): 错误代码
- `guild_id` (int): 相关服务器 ID
- `timestamp` (datetime): 错误发生时间

**常见错误代码:**
- `"GUILD_NOT_FOUND"`: 服务器不存在
- `"CHANNEL_NOT_FOUND"`: 频道不存在
- `"MANAGER_NOT_READY"`: 语音管理器未初始化
- `"OPUS_NOT_LOADED"`: Opus编码器未加载
- `"UNKNOWN_ERROR"`: 未知错误

### VoicePermissionError

语音权限异常，继承自 `VoiceConnectionError`。

**属性:**
- `missing_permissions` (List[str]): 缺失的权限列表
- `user_id` (int): 相关用户 ID
- `channel_id` (int): 相关频道 ID

**常见权限错误:**
- `"user_not_in_channel"`: 用户不在语音频道中
- `"member_not_found"`: 找不到用户
- `"connect"`: Bot缺少连接权限
- `"speak"`: Bot缺少发言权限

### VoiceNetworkError

语音网络异常，继承自 `VoiceConnectionError`。

**属性:**
- `retry_count` (int): 重试次数
- `last_attempt` (datetime): 最后尝试时间

## 使用示例

### 综合消息处理

```python
async def handle_complex_message(adapter, channel_id):
    """处理包含多种元素的复杂消息"""
    
    # 构建包含文本和图像的消息
    message_chain = MessageChain([
        Plain("这是一个包含多种内容的消息：\\n"),
        Plain("1. 文本内容\\n"),
        Plain("2. 网络图像\\n"),
        Image(url="https://example.com/image1.jpg"),
        Plain("3. 本地图像\\n"),
        Image(path="/path/to/local/image.png"),
        Plain("4. Base64 图像\\n"),
        Image(base64="data:image/png;base64,iVBORw0KGgo...")
    ])
    
    # 发送消息
    await adapter.send_message("channel", channel_id, message_chain)
```

### 语音播放控制

```python
async def voice_player_example(adapter, guild_id, channel_id, audio_files):
    """语音播放器示例"""
    
    # 连接到语音频道
    try:
        voice_client = await adapter.join_voice_channel(guild_id, channel_id)
    except VoicePermissionError as e:
        print(f"权限不足: {e.missing_permissions}")
        return
    
    # 播放音频队列
    for audio_file in audio_files:
        if voice_client.is_connected():
            # 等待当前播放完成
            while voice_client.is_playing():
                await asyncio.sleep(1)
            
            # 播放下一个音频
            audio_source = discord.FFmpegPCMAudio(audio_file)
            voice_client.play(audio_source)
            print(f"正在播放: {audio_file}")
    
    # 播放完成后离开频道
    await adapter.leave_voice_channel(guild_id)
```

### 状态监控

```python
async def monitor_connections(adapter):
    """监控所有语音连接状态"""
    
    connections = await adapter.list_active_voice_connections()
    
    for conn in connections:
        print(f"服务器: {conn['guild_id']}")
        print(f"频道: {conn['channel_name']}")
        print(f"延迟: {conn['latency']:.2f}ms")
        print(f"用户数: {conn['user_count']}")
        print(f"健康度: {conn['connection_health']}")
        print("---")
```

## 最佳实践

### 错误处理

```python
async def safe_discord_operation():
    try:
        # Discord 操作
        pass
    except VoicePermissionError as e:
        if "user_not_in_channel" in e.missing_permissions:
            await send_error("请先加入语音频道")
        elif "connect" in e.missing_permissions:
            await send_error("机器人没有连接权限")
    except discord.HTTPException as e:
        if e.status == 403:
            await send_error("权限不足")
        elif e.status == 404:
            await send_error("频道不存在")
    except Exception as e:
        await send_error(f"未知错误: {e}")
```

### 资源管理

```python
async def with_voice_connection(adapter, guild_id, channel_id, operation):
    """安全的语音连接管理"""
    voice_client = None
    try:
        voice_client = await adapter.join_voice_channel(guild_id, channel_id)
        await operation(voice_client)
    finally:
        if voice_client:
            await adapter.leave_voice_channel(guild_id)
```

### 图像处理优化

```python
async def batch_image_processing(image_list):
    """批量图像处理"""
    processed_images = []
    
    for image_element in image_list:
        try:
            if image_element.url:
                # 异步下载
                async with aiohttp.ClientSession() as session:
                    async with session.get(image_element.url) as response:
                        image_data = await response.read()
                        processed_images.append(process_image_data(image_data))
            elif image_element.path:
                # 本地文件处理
                with open(image_element.path, 'rb') as f:
                    image_data = f.read()
                    processed_images.append(process_image_data(image_data))
        except Exception as e:
            print(f"图像处理失败: {e}")
            continue
    
    return processed_images
```

---

> **注意**: 本 API 文档基于实际的 discord.py 实现，涵盖了 Discord 适配器的完整功能集。图像处理功能无需额外依赖，语音功能需要安装可选依赖。
