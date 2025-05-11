# AI Content Compliance

> References to national regulations on AIGC management
>
> - [Interim Measures for the Management of Generative Artificial Intelligence Services](https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm)

In terms of content control, LangBot has built-in content filters such as `Keyword Detection` and `Baidu Intelligent Cloud Review`. For more details, please refer to the configuration file section.

In practice, content management should be supplemented by methods such as group administrator muting. Regarding the model, the following are recommended solutions (in order of recommendation):

1. Use domestic models.
2. Use strict content filters (can be implemented independently, refer to the plugin function section for details).
3. When using foreign models, supplement with strict Prompt controls.