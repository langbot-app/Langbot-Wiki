# adapter-qq-botpy.json Metadata

`data/metadata/adapter-qq-botpy.json` is the metadata for the QQ official API adapter. When using the group chat interface of the official API, the group ID and member ID are in string format, while LangBot internally only supports integer IDs. To ensure that the same correspondence is maintained after a restart, this data needs to be saved to a file.

## Format

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

- `groups`: Group ID mapping, where the key is the string group ID and the value is the integer group ID.
- `members`: Member ID mapping, where the key is the string member ID and the value is the integer member ID.