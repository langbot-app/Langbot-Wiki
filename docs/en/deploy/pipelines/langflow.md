# Using Langflow with LangBot

[Langflow](https://langflow.com/) is an open-source project for building and deploying AI-based Agents and Workflows. It supports local and cloud deployment, and provides APIs for other applications to integrate.

LangBot currently supports using Langflow as the runner.

## Creating a Workflow in Langflow

Please follow the [Langflow documentation](https://langflow.com/docs/introduction) to deploy Langflow instance.

As an example of the default template's Simple Agent:

![create_flow](/assets/image/zh/deploy/pipelines/langflow/create_flow.png)

You can modify the workflow according to your needs:

![edit_flow](/assets/image/zh/deploy/pipelines/langflow/edit_flow.png)

## Configuring LangBot

Open the LangBot WebUI page, add a new pipeline or switch to the AI capability configuration page in an existing pipeline, and select `Langflow API` as the runner.

![set_langflow_runner](/assets/image/zh/deploy/pipelines/langflow/set_langflow_runner.png)

Fill in the other settings according to the prompts, including `Base URL` (fill in according to actual network conditions), `API Key`, `Flow ID`, etc. The API Key can be obtained from Langflow's Settings:

![get_api_key](/assets/image/zh/deploy/pipelines/langflow/get_api_key.png)

Flow ID can be obtained by clicking the `Share` -> `API access` button in the top right corner of the edit page and obtaining it from the example code:

![get_flow_id](/assets/image/zh/deploy/pipelines/langflow/get_flow_id.png)