# Discord 适配器故障排除

## 概述

本文档提供 Discord 适配器常见问题的诊断和解决方案，涵盖连接问题、消息处理、图像功能、语音连接等各个方面。

## 连接相关问题

### 1. 无法启动 Discord 适配器

#### 症状
- 适配器启动失败
- 连接超时错误
- 认证失败

#### 可能原因和解决方案

##### 1.1 Token 配置错误

```python
# 错误信息示例
discord.errors.LoginFailure: Improper token has been passed.

# 解决方案
1. 检查配置文件中的 token 是否正确
2. 确认 token 没有包含额外的空格或特殊字符
3. 验证 token 是否仍然有效

# 验证 token 的方法
import aiohttp
import asyncio

async def verify_token(token):
    headers = {'Authorization': f'Bot {token}'}
    async with aiohttp.ClientSession() as session:
        async with session.get('https://discord.com/api/v10/users/@me', headers=headers) as response:
            if response.status == 200:
                print("Token 有效")
                data = await response.json()
                print(f"Bot 用户名: {data['username']}")
            else:
                print(f"Token 无效: {response.status}")
```

##### 1.2 网络连接问题

```python
# 错误信息示例
aiohttp.client_exceptions.ClientConnectorError: Cannot connect to host discord.com

# 解决方案
1. 检查网络连接
2. 配置代理（如果需要）
3. 检查防火墙设置

# 代理配置示例
export http_proxy="http://proxy.example.com:8080"
export https_proxy="http://proxy.example.com:8080"

# 或在代码中设置
import os
os.environ['http_proxy'] = 'http://proxy.example.com:8080'
```

##### 1.3 权限配置问题

```python
# 确保 Bot 具有必要权限
required_permissions = [
    'Read Messages',
    'Send Messages', 
    'Embed Links',
    'Attach Files',
    'Read Message History'
]

# 语音功能额外权限
voice_permissions = [
    'Connect',
    'Speak',
    'Use Voice Activity'
]
```

### 2. 连接频繁断开

#### 症状
- WebSocket 连接频繁中断
- 消息发送失败
- 事件接收延迟

#### 解决方案

```python
# 启用详细日志查看连接状态
import logging
logging.basicConfig(level=logging.DEBUG)

# 检查网络稳定性
async def network_stability_test():
    import aiohttp
    import asyncio
    
    for i in range(10):
        try:
            async with aiohttp.ClientSession() as session:
                start_time = asyncio.get_event_loop().time()
                async with session.get('https://discord.com/api/v10/gateway') as response:
                    end_time = asyncio.get_event_loop().time()
                    latency = (end_time - start_time) * 1000
                    print(f"测试 {i+1}: {response.status}, 延迟: {latency:.2f}ms")
        except Exception as e:
            print(f"测试 {i+1} 失败: {e}")
        
        await asyncio.sleep(1)
```

## 消息处理问题

### 1. 消息发送失败

#### 症状
- 发送消息时抛出异常
- 消息内容被截断
- 消息格式错误

#### 常见问题和解决方案

##### 1.1 消息长度超限

```python
# Discord 消息长度限制: 2000 字符
def check_message_length(text):
    if len(text) > 2000:
        print(f"消息过长: {len(text)} 字符，需要分割")
        return False
    return True

# 自动分割长消息
def split_long_message(text, max_length=2000):
    chunks = []
    while len(text) > max_length:
        # 找到合适的分割点
        split_pos = text.rfind('\n', 0, max_length)
        if split_pos == -1:
            split_pos = text.rfind(' ', 0, max_length)
        if split_pos == -1:
            split_pos = max_length
        
        chunks.append(text[:split_pos])
        text = text[split_pos:].lstrip()
    
    if text:
        chunks.append(text)
    
    return chunks

# 使用示例
async def send_long_message(adapter, channel_id, long_text):
    chunks = split_long_message(long_text)
    for chunk in chunks:
        await adapter.send_message("channel", channel_id, MessageChain([Plain(chunk)]))
        await asyncio.sleep(0.5)  # 避免速率限制
```

##### 1.2 频道权限不足

```python
# 检查 Bot 在频道中的权限
async def check_channel_permissions(bot, channel_id):
    try:
        channel = bot.get_channel(channel_id)
        if not channel:
            channel = await bot.fetch_channel(channel_id)
        
        permissions = channel.permissions_for(channel.guild.me)
        
        required_perms = {
            'send_messages': permissions.send_messages,
            'embed_links': permissions.embed_links,
            'attach_files': permissions.attach_files,
            'read_messages': permissions.read_messages
        }
        
        print("频道权限检查:")
        for perm, has_perm in required_perms.items():
            status = "✓" if has_perm else "✗"
            print(f"  {status} {perm}: {has_perm}")
        
        return all(required_perms.values())
        
    except Exception as e:
        print(f"权限检查失败: {e}")
        return False
```

### 2. 消息接收问题

#### 症状
- 收不到用户消息
- 事件处理延迟
- 消息内容缺失

#### 解决方案

```python
# 检查 Intents 配置
import discord

# 确保启用了必要的 intents
intents = discord.Intents.default()
intents.message_content = True  # 必须启用才能读取消息内容
intents.guild_messages = True
intents.dm_messages = True

# 在 Discord Developer Portal 中也需要启用对应的 Privileged Gateway Intents

# 调试消息接收
class DebugClient(discord.Client):
    async def on_message(self, message):
        print(f"收到消息: {message.author} -> {message.content}")
        if message.author.bot:
            print("跳过 Bot 消息")
            return
        
        # 处理消息...
```

## 图像处理问题

### 1. 图像发送失败

#### 症状
- 图像无法上传
- 图像格式错误
- 文件大小超限

#### 解决方案

##### 1.1 文件大小检查

```python
import os

def check_image_size(image_path, max_size=25*1024*1024):  # 25MB 限制
    """检查图像文件大小"""
    if not os.path.exists(image_path):
        return False, "文件不存在"
    
    size = os.path.getsize(image_path)
    if size > max_size:
        return False, f"文件过大: {size/1024/1024:.2f}MB, 限制: {max_size/1024/1024}MB"
    
    return True, "文件大小正常"

# 图像压缩示例
from PIL import Image
import io

def compress_image(image_path, max_size=1024, quality=85):
    """压缩图像以减小文件大小"""
    try:
        with Image.open(image_path) as img:
            # 调整尺寸
            if max(img.size) > max_size:
                ratio = max_size / max(img.size)
                new_size = tuple(int(dim * ratio) for dim in img.size)
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # 保存为 JPEG 以减小文件大小
            output = io.BytesIO()
            img.convert('RGB').save(output, format='JPEG', quality=quality, optimize=True)
            return output.getvalue()
    
    except Exception as e:
        print(f"图像压缩失败: {e}")
        return None
```

##### 1.2 格式检测和转换

```python
def detect_image_format(image_data):
    """检测图像格式"""
    if image_data.startswith(b'\xff\xd8\xff'):
        return 'jpeg'
    elif image_data.startswith(b'\x89PNG\r\n\x1a\n'):
        return 'png'
    elif image_data.startswith(b'GIF87a') or image_data.startswith(b'GIF89a'):
        return 'gif'
    elif image_data.startswith(b'RIFF') and b'WEBP' in image_data[:20]:
        return 'webp'
    else:
        return 'unknown'

# 安全的图像读取
async def safe_image_processing(image_element):
    """安全地处理图像元素"""
    try:
        image_data = None
        filename = f'{uuid.uuid4()}.png'
        
        if image_element.base64:
            # 处理 Base64 图像
            if image_element.base64.startswith('data:'):
                base64_data = image_element.base64.split(',')[1]
            else:
                base64_data = image_element.base64
            
            image_data = base64.b64decode(base64_data)
            
        elif image_element.url:
            # 下载网络图像
            async with aiohttp.ClientSession() as session:
                async with session.get(image_element.url, timeout=30) as response:
                    if response.status == 200:
                        image_data = await response.read()
                    else:
                        raise Exception(f"下载失败: HTTP {response.status}")
                        
        elif image_element.path:
            # 读取本地文件
            clean_path = os.path.abspath(image_element.path.replace('\x00', ''))
            if os.path.exists(clean_path):
                with open(clean_path, 'rb') as f:
                    image_data = f.read()
            else:
                raise Exception(f"文件不存在: {clean_path}")
        
        if image_data:
            # 检测格式并设置文件名
            format_name = detect_image_format(image_data)
            if format_name != 'unknown':
                filename = f'{uuid.uuid4()}.{format_name}'
            
            # 检查文件大小
            if len(image_data) > 25*1024*1024:  # 25MB
                raise Exception(f"图像过大: {len(image_data)/1024/1024:.2f}MB")
            
            return discord.File(fp=io.BytesIO(image_data), filename=filename)
        
    except Exception as e:
        print(f"图像处理失败: {e}")
        return None
```

### 2. 网络图像下载问题

#### 症状
- 图像下载超时
- 网络连接错误
- 图像内容损坏

#### 解决方案

```python
async def robust_image_download(url, max_retries=3, timeout=30):
    """健壮的图像下载"""
    
    for attempt in range(max_retries):
        try:
            async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=timeout)) as session:
                async with session.get(url, headers={'User-Agent': 'LangBot/1.0'}) as response:
                    if response.status == 200:
                        content_length = response.headers.get('Content-Length')
                        if content_length and int(content_length) > 25*1024*1024:
                            raise Exception("图像文件过大")
                        
                        image_data = await response.read()
                        
                        # 验证图像数据
                        if len(image_data) < 100:  # 太小可能不是有效图像
                            raise Exception("图像数据太小")
                        
                        # 检查格式
                        if detect_image_format(image_data) == 'unknown':
                            raise Exception("不支持的图像格式")
                        
                        return image_data
                    else:
                        raise Exception(f"HTTP错误: {response.status}")
                        
        except asyncio.TimeoutError:
            print(f"下载超时 (尝试 {attempt + 1}/{max_retries}): {url}")
        except Exception as e:
            print(f"下载失败 (尝试 {attempt + 1}/{max_retries}): {e}")
        
        if attempt < max_retries - 1:
            await asyncio.sleep(2 ** attempt)  # 指数退避
    
    raise Exception(f"下载失败，已重试 {max_retries} 次")
```

## 语音功能问题

### 1. 语音连接失败

#### 症状
- 无法加入语音频道
- 连接超时
- 权限错误

#### 解决方案

##### 1.1 依赖检查

```python
def check_voice_dependencies():
    """检查语音功能依赖"""
    try:
        import discord.voice_client
        print("✓ discord.py 语音支持正常")
    except ImportError:
        print("✗ discord.py 语音支持未安装，请运行: pip install discord.py[voice]")
        return False
    
    try:
        import nacl
        print("✓ PyNaCl 已安装")
    except ImportError:
        print("✗ PyNaCl 未安装，请运行: pip install PyNaCl")
        return False
    
    # 检查 FFmpeg
    import shutil
    if shutil.which('ffmpeg'):
        print("✓ FFmpeg 已安装")
    else:
        print("✗ FFmpeg 未安装，请安装 FFmpeg")
        return False
    
    try:
        import discord
        if not discord.opus.is_loaded():
            discord.opus.load_opus()
        print("✓ Opus 编码器已加载")
    except Exception as e:
        print(f"✗ Opus 编码器加载失败: {e}")
        return False
    
    return True
```

##### 1.2 权限诊断

```python
async def diagnose_voice_permissions(bot, guild_id, channel_id, user_id):
    """诊断语音权限问题"""
    try:
        guild = bot.get_guild(guild_id)
        if not guild:
            return "错误: 找不到服务器"
        
        channel = guild.get_channel(channel_id)
        if not channel or not isinstance(channel, discord.VoiceChannel):
            return "错误: 找不到语音频道"
        
        # 检查用户是否在频道中
        member = guild.get_member(user_id)
        if not member:
            return "错误: 找不到用户"
        
        if not member.voice or member.voice.channel != channel:
            return "错误: 用户不在指定语音频道中"
        
        # 检查 Bot 权限
        bot_member = guild.me
        permissions = channel.permissions_for(bot_member)
        
        missing_perms = []
        if not permissions.connect:
            missing_perms.append("Connect")
        if not permissions.speak:
            missing_perms.append("Speak")
        if not permissions.use_voice_activation:
            missing_perms.append("Use Voice Activity")
        
        if missing_perms:
            return f"权限不足: {', '.join(missing_perms)}"
        
        return "权限检查通过"
        
    except Exception as e:
        return f"权限检查失败: {e}"
```

### 2. 音频播放问题

#### 症状
- 音频无法播放
- 播放中断
- 音质问题

#### 解决方案

##### 2.1 音频文件检查

```python
def check_audio_file(file_path):
    """检查音频文件有效性"""
    import os
    import subprocess
    
    if not os.path.exists(file_path):
        return False, "文件不存在"
    
    # 使用 FFmpeg 检查文件
    try:
        result = subprocess.run([
            'ffprobe', '-v', 'quiet', '-print_format', 'json', 
            '-show_format', '-show_streams', file_path
        ], capture_output=True, text=True, timeout=10)
        
        if result.returncode != 0:
            return False, "不是有效的音频文件"
        
        import json
        info = json.loads(result.stdout)
        
        # 检查是否有音频流
        audio_streams = [s for s in info['streams'] if s['codec_type'] == 'audio']
        if not audio_streams:
            return False, "文件中没有音频流"
        
        return True, f"音频文件正常 ({info['format']['format_name']})"
        
    except subprocess.TimeoutExpired:
        return False, "文件检查超时"
    except Exception as e:
        return False, f"文件检查失败: {e}"
```

##### 2.2 音频播放优化

```python
async def play_audio_with_error_handling(voice_client, audio_path):
    """带错误处理的音频播放"""
    
    if not voice_client or not voice_client.is_connected():
        raise Exception("语音客户端未连接")
    
    if voice_client.is_playing():
        voice_client.stop()
        await asyncio.sleep(0.5)  # 等待停止完成
    
    # 检查音频文件
    is_valid, message = check_audio_file(audio_path)
    if not is_valid:
        raise Exception(f"音频文件无效: {message}")
    
    try:
        # 优化的 FFmpeg 选项
        ffmpeg_options = {
            'before_options': (
                '-loglevel quiet '
                '-reconnect 1 '
                '-reconnect_streamed 1 '
                '-reconnect_delay_max 5'
            ),
            'options': (
                '-vn '  # 禁用视频
                '-filter:a "volume=0.5" '  # 音量控制
                '-ac 2 '  # 立体声
                '-ar 48000 '  # 采样率
                '-f s16le'  # 输出格式
            )
        }
        
        audio_source = discord.FFmpegPCMAudio(audio_path, **ffmpeg_options)
        
        # 播放音频
        voice_client.play(audio_source)
        
        # 监控播放状态
        while voice_client.is_playing():
            await asyncio.sleep(1)
        
        print("音频播放完成")
        
    except Exception as e:
        print(f"音频播放失败: {e}")
        raise
```

### 3. 连接稳定性问题

#### 症状
- 连接频繁断开
- 延迟过高
- 音频卡顿

#### 解决方案

```python
async def monitor_voice_connection(adapter, guild_id, monitoring_duration=60):
    """监控语音连接质量"""
    
    start_time = asyncio.get_event_loop().time()
    latencies = []
    disconnection_count = 0
    
    while asyncio.get_event_loop().time() - start_time < monitoring_duration:
        try:
            status = await adapter.get_voice_connection_status(guild_id)
            
            if status:
                latencies.append(status['latency'])
                print(f"延迟: {status['latency']:.2f}ms, 健康度: {status['connection_health']}")
            else:
                disconnection_count += 1
                print("连接已断开")
                
                # 尝试重连
                if disconnection_count < 3:
                    print("尝试重连...")
                    # 这里需要实现重连逻辑
            
        except Exception as e:
            print(f"监控错误: {e}")
        
        await asyncio.sleep(5)
    
    if latencies:
        avg_latency = sum(latencies) / len(latencies)
        max_latency = max(latencies)
        print(f"平均延迟: {avg_latency:.2f}ms, 最大延迟: {max_latency:.2f}ms")
        print(f"断开次数: {disconnection_count}")
```

## 性能问题

### 1. 内存使用过高

#### 症状
- 内存占用持续增长
- 程序响应变慢
- 内存溢出错误

#### 解决方案

```python
import gc
import psutil
import os

def monitor_memory_usage():
    """监控内存使用情况"""
    process = psutil.Process(os.getpid())
    memory_info = process.memory_info()
    memory_mb = memory_info.rss / 1024 / 1024
    
    print(f"内存使用: {memory_mb:.2f} MB")
    return memory_mb

async def cleanup_resources(adapter):
    """清理资源"""
    # 清理语音连接
    if hasattr(adapter, 'voice_manager') and adapter.voice_manager:
        await adapter.voice_manager.cleanup_inactive_connections()
    
    # 强制垃圾回收
    gc.collect()
    
    print(f"清理后内存使用: {monitor_memory_usage():.2f} MB")

# 定期内存监控
async def memory_monitor_task(adapter, interval=300):  # 5分钟检查一次
    """内存监控任务"""
    while True:
        memory_usage = monitor_memory_usage()
        
        if memory_usage > 500:  # 500MB 阈值
            print("内存使用过高，执行清理...")
            await cleanup_resources(adapter)
        
        await asyncio.sleep(interval)
```

### 2. 连接数过多

#### 症状
- 达到连接限制
- 新连接失败
- 性能下降

#### 解决方案

```python
class ConnectionLimiter:
    """连接数限制器"""
    
    def __init__(self, max_connections=10):
        self.max_connections = max_connections
        self.active_connections = {}
        
    async def acquire_connection(self, guild_id, adapter):
        """获取连接"""
        if len(self.active_connections) >= self.max_connections:
            # 断开最旧的连接
            oldest_guild = min(self.active_connections.keys(), 
                             key=lambda g: self.active_connections[g]['created_at'])
            
            await adapter.leave_voice_channel(oldest_guild)
            del self.active_connections[oldest_guild]
            print(f"断开最旧连接: {oldest_guild}")
        
        self.active_connections[guild_id] = {
            'created_at': asyncio.get_event_loop().time(),
            'last_activity': asyncio.get_event_loop().time()
        }
    
    def release_connection(self, guild_id):
        """释放连接"""
        if guild_id in self.active_connections:
            del self.active_connections[guild_id]
    
    def update_activity(self, guild_id):
        """更新活动时间"""
        if guild_id in self.active_connections:
            self.active_connections[guild_id]['last_activity'] = asyncio.get_event_loop().time()
```

## 调试工具

### 1. 详细日志配置

```python
import logging
import sys

def setup_detailed_logging():
    """设置详细日志"""
    
    # 创建格式化器
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
    )
    
    # 控制台处理器
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    console_handler.setLevel(logging.INFO)
    
    # 文件处理器
    file_handler = logging.FileHandler('discord_debug.log', encoding='utf-8')
    file_handler.setFormatter(formatter)
    file_handler.setLevel(logging.DEBUG)
    
    # Discord.py 日志
    discord_logger = logging.getLogger('discord')
    discord_logger.setLevel(logging.DEBUG)
    discord_logger.addHandler(console_handler)
    discord_logger.addHandler(file_handler)
    
    # 适配器日志
    adapter_logger = logging.getLogger('discord_adapter')
    adapter_logger.setLevel(logging.DEBUG)
    adapter_logger.addHandler(console_handler)
    adapter_logger.addHandler(file_handler)
    
    return discord_logger, adapter_logger
```

### 2. 连接诊断工具

```python
async def comprehensive_diagnostic(adapter):
    """综合诊断工具"""
    
    print("=== Discord 适配器诊断 ===")
    
    # 1. 基础连接检查
    print("1. 基础连接状态:")
    if hasattr(adapter, 'bot') and adapter.bot.is_ready():
        print("  ✓ Discord 连接正常")
        print(f"  ✓ Bot 用户: {adapter.bot.user}")
        print(f"  ✓ 延迟: {adapter.bot.latency*1000:.2f}ms")
    else:
        print("  ✗ Discord 连接异常")
    
    # 2. 语音功能检查
    print("\\n2. 语音功能状态:")
    voice_deps_ok = check_voice_dependencies()
    if voice_deps_ok:
        print("  ✓ 语音依赖正常")
    else:
        print("  ✗ 语音依赖异常")
    
    if hasattr(adapter, 'voice_manager') and adapter.voice_manager:
        connections = await adapter.list_active_voice_connections()
        print(f"  ✓ 语音管理器正常，活跃连接: {len(connections)}")
        for conn in connections:
            print(f"    - {conn['guild_id']}: {conn['channel_name']} ({conn['latency']:.2f}ms)")
    else:
        print("  ✗ 语音管理器未初始化")
    
    # 3. 内存使用检查
    print("\\n3. 资源使用状态:")
    memory_usage = monitor_memory_usage()
    print(f"  内存使用: {memory_usage:.2f} MB")
    
    # 4. 网络连接测试
    print("\\n4. 网络连接测试:")
    await network_stability_test()
    
    print("\\n=== 诊断完成 ===")
```

### 3. 实时监控面板

```python
import asyncio
import time

class DiscordMonitor:
    """Discord 适配器实时监控"""
    
    def __init__(self, adapter):
        self.adapter = adapter
        self.stats = {
            'messages_sent': 0,
            'messages_received': 0,
            'voice_connections': 0,
            'errors': 0,
            'start_time': time.time()
        }
    
    async def start_monitoring(self):
        """启动监控"""
        while True:
            await self.display_status()
            await asyncio.sleep(10)
    
    async def display_status(self):
        """显示状态信息"""
        uptime = time.time() - self.stats['start_time']
        uptime_str = f"{int(uptime//3600)}h {int((uptime%3600)//60)}m {int(uptime%60)}s"
        
        print("\\n" + "="*50)
        print(f"Discord 适配器监控 - 运行时间: {uptime_str}")
        print("="*50)
        
        # 基础状态
        if hasattr(self.adapter, 'bot') and self.adapter.bot.is_ready():
            print(f"连接状态: ✓ 正常 (延迟: {self.adapter.bot.latency*1000:.2f}ms)")
        else:
            print("连接状态: ✗ 异常")
        
        # 统计信息
        print(f"消息发送: {self.stats['messages_sent']}")
        print(f"消息接收: {self.stats['messages_received']}")
        print(f"语音连接: {self.stats['voice_connections']}")
        print(f"错误次数: {self.stats['errors']}")
        
        # 内存使用
        memory = monitor_memory_usage()
        print(f"内存使用: {memory:.2f} MB")
        
        # 语音连接详情
        if hasattr(self.adapter, 'voice_manager') and self.adapter.voice_manager:
            connections = await self.adapter.list_active_voice_connections()
            if connections:
                print("\\n语音连接:")
                for conn in connections:
                    print(f"  {conn['guild_id']}: {conn['channel_name']} "
                          f"({conn['user_count']} 用户, {conn['latency']:.2f}ms)")
        
        print("="*50)
    
    def record_message_sent(self):
        self.stats['messages_sent'] += 1
    
    def record_message_received(self):
        self.stats['messages_received'] += 1
    
    def record_voice_connection(self):
        self.stats['voice_connections'] += 1
    
    def record_error(self):
        self.stats['errors'] += 1

# 使用示例
async def run_with_monitoring(adapter):
    monitor = DiscordMonitor(adapter)
    
    # 启动监控任务
    monitor_task = asyncio.create_task(monitor.start_monitoring())
    
    try:
        # 运行适配器
        await adapter.run_async()
    finally:
        monitor_task.cancel()
```

## 常见问题速查表

| 问题类型 | 症状 | 快速检查 | 解决方案 |
|---------|------|----------|----------|
| 连接失败 | LoginFailure | 检查 token | 验证并更新 token |
| 网络超时 | ClientConnectorError | 检查网络 | 配置代理或检查防火墙 |
| 权限不足 | Forbidden 403 | 检查 Bot 权限 | 在 Discord 中添加权限 |
| 消息过长 | 消息被截断 | 检查字符数 | 分割长消息 |
| 图像失败 | 文件上传错误 | 检查文件大小/格式 | 压缩或转换格式 |
| 语音连接失败 | VoiceConnectionError | 检查依赖和权限 | 安装依赖，检查频道权限 |
| 音频播放失败 | FFmpeg 错误 | 检查 FFmpeg 和文件 | 安装 FFmpeg，验证音频文件 |
| 内存泄漏 | 内存持续增长 | 监控内存使用 | 清理连接，执行 GC |
| 高延迟 | 响应慢 | 检查网络延迟 | 优化网络，减少并发 |

---

> **提示**: 遇到问题时，首先启用详细日志记录，然后使用诊断工具进行系统性排查。大多数问题都与配置、权限或网络环境相关。
