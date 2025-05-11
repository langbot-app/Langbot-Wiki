# [LangBot](https://github.com/RockChinQ/LangBot) 官方文档

> 此仓库是 LangBot 的文档仓库，代码仓库：  
> [LangBot 代码仓库](https://github.com/RockChinQ/LangBot)  
> 这是 LangBot 4.0 的文档，3.0 文档请见 `v3` 分支

## 参与编写

文档基于 VitePress 生成，本地编写需要安装 Node 和 VitePress

### NodeJS

自行安装

### VitePress 

Clone 本仓库，在目录下执行以下命令安装依赖：

```bash
npm install
```

完成后即可修改文档，修改完后使用以下命令本地启动：

```bash
npm run docs:dev
```

### 使用图片

把图片放到 `docs/assets/image` 目录下，然后在文档中使用Web访问时的绝对路径引用，如：

```markdown
![image](/assets/image/xxx.png)
```

### 部署细节

现在使用 Cloudflare Pages 托管，提交后 [@RockChinQ](https://github.com/RockChinQ) 更新分支进行自动部署。

### 一些规范化标准

- 文件夹和文件的命名：**一律使用全小写，单词直接`-`隔开，如**`plugin-intro.md`
- 子文件（夹）的命名，**不加前缀**（即文件夹的名称），如：`deploy`文件夹下的，文件夹`langbot`，`langbot`文件夹下的`manual`文件称之为`manual.md`
- 由于这是有关于文档的规范化命名，所以任何文件的名称都可以以教程的角度来理解，如`deploy`是有关部署的教程
- 除了配置文件板块的文档，其他的页面都不要在顶部加目录
