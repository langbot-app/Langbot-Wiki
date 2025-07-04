# Discord 适配器快速入门

## 概述

本指南将引导您快速上手 LangBot Discord 适配器的完整功能，包括消息处理、图像功能和语音连接等。

## 前置条件

### 环境要求
- Python 3.8+
- LangBot 框架环境
- discord.py、aiohttp（自动安装）
- discord.py[voice]、PyNaCl、FFmpeg（语音功能可选）

### Discord 设置

本指南假设您已经创建好了 Discord 应用和 Bot。如需创建，请访问 [Discord Developer Portal](https://discord.com/developers/applications)。


## 基本使用

### 1. 文本消息处理

```python
from pkg.platform.types import message as platform_message
from pkg.platform.types import events as platform_events

@handler(platform_events.MessageEvent)
async def text_message_handler(ctx: EventContext):
    """处理文本消息的基本示例"""
    
    # 获取适配器实例
    adapter = ctx.event.query.adapter
    
    # 提取消息文本
    text_content = ""
    for element in ctx.event.message_chain:
        if isinstance(element, platform_message.Plain):
            text_content += element.text
    
    # 发送回复
    reply_chain = platform_message.MessageChain([
        platform_message.Plain(f"您说了: {text_content}")
    ])
    
    await adapter.reply_message(ctx.event, reply_chain, quote_origin=True)
```

### 2. 图像消息处理

```python
@handler(platform_events.MessageEvent)
async def image_message_handler(ctx: EventContext):
    """处理图像消息的示例"""
    
    adapter = ctx.event.query.adapter
    
    # 检测消息中的图像
    image_count = 0
    for element in ctx.event.message_chain:
        if isinstance(element, platform_message.Image):
            image_count += 1
    
    if image_count > 0:
        # 回复图像信息
        reply_chain = platform_message.MessageChain([
            platform_message.Plain(f"收到 {image_count} 张图片！"),
            platform_message.Plain("\\n正在处理...")
        ])
        await adapter.reply_message(ctx.event, reply_chain)
        
        # 可以添加图像处理逻辑
        # processed_image = process_images(images)
        
        # 发送处理结果
        result_chain = platform_message.MessageChain([
            platform_message.Plain("处理完成！"),
            # platform_message.Image(path="path/to/processed/image.jpg")
        ])
        await adapter.send_message("channel", ctx.event.query.channel_id, result_chain)
```

### 3. 发送不同类型的图像

```python
async def send_various_images(adapter, channel_id):
    """发送不同来源的图像示例"""
    
    message_chain = platform_message.MessageChain([
        platform_message.Plain("以下是不同类型的图像：\\n"),
        
        # 本地文件图像
        platform_message.Plain("1. 本地文件：\\n"),
        platform_message.Image(path="/path/to/local/image.jpg"),
        
        # 网络图像
        platform_message.Plain("\\n2. 网络图像：\\n"),
        platform_message.Image(url="https://example.com/image.png"),
        
        # Base64 图像
        platform_message.Plain("\\n3. Base64 图像：\\n"),
        platform_message.Image(base64="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==")
    ])
    
    await adapter.send_message("channel", channel_id, message_chain)
```

## 语音功能使用

### 语音连接管理

```python
@handler(platform_events.MessageEvent)
async def voice_connect_handler(ctx: EventContext):
    """语音连接示例"""
    
    adapter = ctx.event.query.adapter
    
    # 解析指令
    text = ""
    for element in ctx.event.message_chain:
        if isinstance(element, platform_message.Plain):
            text += element.text
    
    if "加入语音" in text:
        try:
            # 这里需要根据实际情况获取 guild_id 和 channel_id
            guild_id = get_guild_id_from_context(ctx)
            channel_id = get_voice_channel_id_from_user(ctx.event.sender.id, guild_id)
            
            voice_client = await adapter.join_voice_channel(
                guild_id=guild_id,
                channel_id=channel_id,
                user_id=ctx.event.sender.id
            )
            
            await ctx.reply("成功加入语音频道！")
            
        except VoicePermissionError as e:
            if "user_not_in_channel" in e.missing_permissions:
                await ctx.reply("请先加入语音频道")
            elif "connect" in e.missing_permissions:
                await ctx.reply("机器人没有连接权限")
            else:
                await ctx.reply(f"权限错误: {', '.join(e.missing_permissions)}")
                
        except Exception as e:
            await ctx.reply(f"连接失败: {e}")
    
    elif "离开语音" in text:
        guild_id = get_guild_id_from_context(ctx)
        success = await adapter.leave_voice_channel(guild_id)
        
        if success:
            await ctx.reply("已离开语音频道")
        else:
            await ctx.reply("未连接到语音频道")
```

### 音频播放

```python
@handler(platform_events.MessageEvent)
async def audio_play_handler(ctx: EventContext):
    """音频播放示例"""
    
    adapter = ctx.event.query.adapter
    
    # 检查是否有播放音频的指令
    text = extract_text_from_message(ctx.event.message_chain)
    
    if "播放音频" in text:
        guild_id = get_guild_id_from_context(ctx)
        
        # 获取语音客户端
        voice_client = await adapter.get_voice_client(guild_id)
        
        if not voice_client:
            await ctx.reply("请先连接到语音频道")
            return
        
        if voice_client.is_playing():
            await ctx.reply("正在播放其他音频，请稍候")
            return
        
        try:
            # 播放音频文件
            import discord
            
            # 配置 FFmpeg 选项
            ffmpeg_options = {
                'before_options': '-loglevel quiet',
                'options': '-vn -filter:a "volume=0.5"'
            }
            
            # 创建音频源
            audio_source = discord.FFmpegPCMAudio(
                "path/to/your/audio.mp3",
                **ffmpeg_options
            )
            
            # 开始播放
            voice_client.play(audio_source)
            await ctx.reply("开始播放音频")
            
        except Exception as e:
            await ctx.reply(f"播放失败: {e}")
    
    elif "停止播放" in text:
        guild_id = get_guild_id_from_context(ctx)
        voice_client = await adapter.get_voice_client(guild_id)
        
        if voice_client and voice_client.is_playing():
            voice_client.stop()
            await ctx.reply("已停止播放")
        else:
            await ctx.reply("当前没有播放音频")
```

### 语音状态查询

```python
@handler(platform_events.MessageEvent)
async def voice_status_handler(ctx: EventContext):
    """语音状态查询示例"""
    
    adapter = ctx.event.query.adapter
    text = extract_text_from_message(ctx.event.message_chain)
    
    if "语音状态" in text:
        guild_id = get_guild_id_from_context(ctx)
        
        # 获取详细状态
        status = await adapter.get_voice_connection_status(guild_id)
        
        if status:
            status_text = f"""语音连接状态:
                频道: {status['channel_name']}
                连接时间: {status['connection_time'].strftime('%H:%M:%S')}
                延迟: {status['latency']:.2f}ms
                用户数: {status['user_count']}
                健康度: {status['connection_health']}
                状态: {status['status']}"""
            
            await ctx.reply(status_text)
        else:
            await ctx.reply("当前未连接到语音频道")
    
    elif "连接列表" in text:
        # 获取所有活跃连接
        connections = await adapter.list_active_voice_connections()
        
        if connections:
            conn_list = "活跃语音连接:\\n"
            for i, conn in enumerate(connections, 1):
                conn_list += f"{i}. {conn['channel_name']} ({conn['user_count']} 用户)\\n"
            await ctx.reply(conn_list)
        else:
            await ctx.reply("当前没有活跃的语音连接")
```

## 完整插件示例

以下是一个完整的 Discord 插件示例，包含所有主要功能：

```python
import asyncio
import os
from pkg.platform.types import message as platform_message
from pkg.platform.types import events as platform_events
from pkg.core.entities.classes import EventContext
from pkg.plugin import handler

# 辅助函数
def extract_text_from_message(message_chain):
    """从消息链中提取文本"""
    text = ""
    for element in message_chain:
        if isinstance(element, platform_message.Plain):
            text += element.text
    return text.strip()

def extract_images_from_message(message_chain):
    """从消息链中提取图像"""
    images = []
    for element in message_chain:
        if isinstance(element, platform_message.Image):
            images.append(element)
    return images

# 消息处理器
@handler(platform_events.MessageEvent)
async def discord_message_handler(ctx: EventContext):
    """Discord 消息处理主函数"""
    
    adapter = ctx.event.query.adapter
    text = extract_text_from_message(ctx.event.message_chain)
    images = extract_images_from_message(ctx.event.message_chain)
    
    # 文本处理
    if text.startswith("!echo"):
        echo_text = text[5:].strip()
        await ctx.reply(f"回声: {echo_text}")
    
    # 图像处理
    elif text.startswith("!image"):
        if images:
            reply_chain = platform_message.MessageChain([
                platform_message.Plain(f"检测到 {len(images)} 张图像"),
                platform_message.Plain("\\n图像信息:\\n")
            ])
            
            for i, img in enumerate(images, 1):
                if img.url:
                    reply_chain.append(platform_message.Plain(f"{i}. 网络图像: {img.url}\\n"))
                elif img.path:
                    reply_chain.append(platform_message.Plain(f"{i}. 本地图像: {os.path.basename(img.path)}\\n"))
                elif img.base64:
                    reply_chain.append(platform_message.Plain(f"{i}. Base64 图像\\n"))
            
            await ctx.reply(reply_chain)
        else:
            await ctx.reply("请发送图像")
    
    # 语音功能
    elif text.startswith("!voice"):
        await handle_voice_command(ctx, text[6:].strip())
    
    # 帮助信息
    elif text.startswith("!help"):
        help_text = """Discord 插件命令:
            !echo <文本> - 回声功能
            !image - 分析图像信息
            !voice join - 加入语音频道
            !voice leave - 离开语音频道
            !voice play <文件> - 播放音频
            !voice stop - 停止播放
            !voice status - 查看状态
            !help - 显示此帮助"""
        await ctx.reply(help_text)

async def handle_voice_command(ctx: EventContext, command: str):
    """处理语音相关命令"""
    
    adapter = ctx.event.query.adapter
    guild_id = get_guild_id_from_context(ctx)
    
    if command == "join":
        try:
            channel_id = get_user_voice_channel_id(ctx.event.sender.id, guild_id)
            if not channel_id:
                await ctx.reply("请先加入语音频道")
                return
            
            voice_client = await adapter.join_voice_channel(
                guild_id=guild_id,
                channel_id=channel_id,
                user_id=ctx.event.sender.id
            )
            
            await ctx.reply("成功加入语音频道！")
            
        except Exception as e:
            await ctx.reply(f"加入失败: {e}")
    
    elif command == "leave":
        success = await adapter.leave_voice_channel(guild_id)
        if success:
            await ctx.reply("已离开语音频道")
        else:
            await ctx.reply("未连接到语音频道")
    
    elif command.startswith("play"):
        audio_file = command[4:].strip()
        if not audio_file:
            audio_file = "path/to/default/audio.mp3"
        
        voice_client = await adapter.get_voice_client(guild_id)
        if not voice_client:
            await ctx.reply("请先加入语音频道")
            return
        
        if voice_client.is_playing():
            await ctx.reply("正在播放其他音频")
            return
        
        try:
            import discord
            audio_source = discord.FFmpegPCMAudio(audio_file)
            voice_client.play(audio_source)
            await ctx.reply(f"开始播放: {os.path.basename(audio_file)}")
        except Exception as e:
            await ctx.reply(f"播放失败: {e}")
    
    elif command == "stop":
        voice_client = await adapter.get_voice_client(guild_id)
        if voice_client and voice_client.is_playing():
            voice_client.stop()
            await ctx.reply("已停止播放")
        else:
            await ctx.reply("当前没有播放音频")
    
    elif command == "status":
        status = await adapter.get_voice_connection_status(guild_id)
        if status:
            status_text = f"""语音状态:
                频道: {status['channel_name']}
                延迟: {status['latency']:.2f}ms
                用户数: {status['user_count']}
                状态: {status['status']}"""
            await ctx.reply(status_text)
        else:
            await ctx.reply("未连接到语音频道")
    
    else:
        await ctx.reply("未知的语音命令，使用 !help 查看帮助")

# 辅助函数实现（需要根据实际情况调整）
def get_guild_id_from_context(ctx):
    """从上下文获取 guild_id"""
    # 这里需要根据实际的 LangBot 实现来获取 guild_id
    # 可能需要从 ctx.event.query 或其他地方获取
    return ctx.event.query.channel_id  # 示例实现

def get_user_voice_channel_id(user_id, guild_id):
    """获取用户当前所在的语音频道 ID"""
    # 这里需要实现获取用户语音频道的逻辑
    # 可能需要通过 Discord API 查询
    return None  # 示例实现，实际需要实现具体逻辑
```

## 错误处理最佳实践

### 语音错误处理

```python
async def safe_voice_operation(adapter, operation, *args, **kwargs):
    """安全的语音操作包装器"""
    try:
        return await operation(*args, **kwargs)
    except VoicePermissionError as e:
        if "user_not_in_channel" in e.missing_permissions:
            return "错误: 用户不在语音频道中"
        elif "connect" in e.missing_permissions:
            return "错误: 机器人没有连接权限"
        elif "speak" in e.missing_permissions:
            return "错误: 机器人没有发言权限"
        else:
            return f"权限错误: {', '.join(e.missing_permissions)}"
    except VoiceNetworkError as e:
        return f"网络错误: {e}"
    except Exception as e:
        return f"未知错误: {e}"
```

### 图像错误处理

```python
async def safe_image_processing(message_chain):
    """安全的图像处理"""
    processed_images = []
    errors = []
    
    for element in message_chain:
        if isinstance(element, platform_message.Image):
            try:
                # 处理图像
                if element.url:
                    # 处理网络图像
                    pass
                elif element.path:
                    # 处理本地图像
                    if not os.path.exists(element.path):
                        errors.append(f"文件不存在: {element.path}")
                        continue
                elif element.base64:
                    # 处理 Base64 图像
                    pass
                
                processed_images.append(element)
                
            except Exception as e:
                errors.append(f"图像处理失败: {e}")
    
    return processed_images, errors
```

## 性能优化建议

### 异步图像下载

```python
import aiohttp
import asyncio

async def download_images_concurrently(image_urls, max_concurrent=5):
    """并发下载多张图像"""
    semaphore = asyncio.Semaphore(max_concurrent)
    
    async def download_single(session, url):
        async with semaphore:
            try:
                async with session.get(url) as response:
                    return await response.read()
            except Exception as e:
                print(f"下载失败 {url}: {e}")
                return None
    
    async with aiohttp.ClientSession() as session:
        tasks = [download_single(session, url) for url in image_urls]
        return await asyncio.gather(*tasks)
```

### 语音连接复用

```python
class VoiceConnectionPool:
    """语音连接池管理"""
    
    def __init__(self, adapter):
        self.adapter = adapter
        self.connections = {}
    
    async def get_connection(self, guild_id, channel_id, user_id=None):
        """获取或创建语音连接"""
        if guild_id in self.connections:
            # 检查现有连接是否有效
            if await self.adapter.is_connected_to_voice(guild_id):
                return self.connections[guild_id]
        
        # 创建新连接
        voice_client = await self.adapter.join_voice_channel(
            guild_id, channel_id, user_id
        )
        self.connections[guild_id] = voice_client
        return voice_client
    
    async def cleanup_invalid_connections(self):
        """清理无效连接"""
        invalid_guilds = []
        for guild_id in self.connections:
            if not await self.adapter.is_connected_to_voice(guild_id):
                invalid_guilds.append(guild_id)
        
        for guild_id in invalid_guilds:
            del self.connections[guild_id]
```

---

> **提示**: 此快速入门基于实际的 discord.py 实现。建议在开发过程中参考 [Discord Developer Documentation](https://discord.com/developers/docs) 了解更多 Discord API 详情。
