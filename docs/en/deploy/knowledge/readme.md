# Using Knowledge Base

LangBot natively supports RAG (Retrieval-Augmented Generation), you can create a knowledge base and bind it to a pipeline, and the pipeline will answer questions based on the content in the knowledge base.

:::info
- You need to configure the embedding model before creating a knowledge base, please read [Configure Models](/en/deploy/models/readme).
:::

## Build Knowledge Base

In the knowledge base page, click the `Create Knowledge Base` button, fill in the knowledge base name, select the configured embedding model, and click the `Create` button.

<img width="400px" src="/assets/image/zh/deploy/knowledge/upload_docs.png" alt="create_kb" />

## Use Knowledge Base

Please go to the pipeline configuration, in the "AI" page, select `Local Agent` as the runner, and select the knowledge base you just created below.

<img width="400px" src="/assets/image/zh/deploy/knowledge/use_local_agent.png" alt="use_kb" />

<img width="400px" src="/assets/image/zh/deploy/knowledge/use_kb.png" alt="use_kb" />

:::info
Only when the runner is `Local Agent`, can you use the LangBot native knowledge base, if you want to use the knowledge base with other runners, please refer to the documentation of the corresponding product.
:::

Now you can use the knowledge base to chat in the `Chat Debug` or the robot bound to the pipeline:

<img width="400px" src="/assets/image/zh/deploy/knowledge/use_kb_in_chat.png" alt="use_kb_in_chat" />