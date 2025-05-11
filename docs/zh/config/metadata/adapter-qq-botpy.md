# adapter-qq-botpy.json 元数据

`data/metadata/adapter-qq-botpy.json`，QQ 官方 API 适配器元数据。官方 API 在使用群聊接口时，群id和成员id为字符串，而 LangBot 内部只支持整型 id，为使重启后仍然是相同的对应关系，因此需要保存到一个文件中。

## 格式

```json
{
    "mapping": {
        "groups": {
            "15944D6D2B525C6E3536134D4669F067": 443241151434655
        },
        "members": {
            "547A6244A731B4BEEBE5EE2AE4CD00A8": 232437565267568
        }
    }
}
```

- `groups`: 群id映射关系，key为字符串群id，value为整型群id。
- `members`: 成员id映射关系，key为字符串成员id，value为整型成员id。