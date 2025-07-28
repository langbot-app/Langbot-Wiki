# [LangBot](https://github.com/langbot-app/LangBot) Official Documentation

> This repository is the documentation repository for LangBot. Code repository:  
> [LangBot Code Repository](https://github.com/langbot-app/LangBot)  
> This is the documentation for LangBot 4.0. For 3.0 documentation, please see the `v3` branch

## Contributing to Documentation

The documentation is generated based on VitePress. Local development requires Node and VitePress installation.

Clone this repository and execute the following command in the directory to install dependencies:

```bash
npm install
```

After completion, you can modify the documentation. After modifications, use the following command to start locally:

```bash
npm run docs:dev
```

### Using Images

Place images in the `docs/assets/image` directory, then reference them using the absolute path when accessed via web, such as:

```markdown
![image](/assets/image/xxx.png)
```

### Deployment Details

Currently hosted on Cloudflare Pages. After submission, [@RockChinQ](https://github.com/RockChinQ) updates the branch for automatic deployment.

### Some Standardization Guidelines

- Folder and file naming: **Use all lowercase, separate words with `-`, such as** `plugin-intro.md`
- Sub-file (folder) naming: **No prefix** (i.e., the folder name), such as: in the `deploy` folder, the folder `langbot`, the `manual` file in the `langbot` folder is called `manual.md`
- Since this is about standardized naming for documentation, any file name can be understood from a tutorial perspective, such as `deploy` being about deployment tutorials
- Except for configuration file section documents, other pages should not have a table of contents at the top

---

**[中文版 README](README.md)** 