# Development Configuration

This guide explains how to set up a development environment for LangBot and contribute to the project.

## Prerequisites

Before you start, make sure you have the following installed:

- Python 3.10 or higher
- Git
- Node.js 16 or higher (for WebUI development)
- A code editor (VS Code recommended)

## Setting Up the Development Environment

1. Fork the LangBot repository on GitHub
2. Clone your fork:

```bash
git clone https://github.com/your-username/LangBot.git
cd LangBot
```

3. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

5. Set up pre-commit hooks:

```bash
pre-commit install
```

## Project Structure

The LangBot project is organized as follows:

```
LangBot/
├── data/                  # Data directory (configs, plugins, etc.)
├── langbot/               # Core package
│   ├── bot/               # Bot implementations
│   ├── pipeline/          # Pipeline components
│   ├── model/             # Model providers
│   ├── plugin/            # Plugin system
│   ├── webui/             # WebUI backend
│   └── utils/             # Utility functions
├── tests/                 # Test cases
├── web/                   # WebUI frontend
├── main.py                # Entry point
└── requirements.txt       # Dependencies
```

## Running LangBot in Development Mode

To run LangBot in development mode:

```bash
python main.py --debug
```

This will start LangBot with debug logging enabled.

## WebUI Development

To develop the WebUI:

1. Navigate to the web directory:

```bash
cd web
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. In another terminal, start LangBot with the WebUI enabled:

```bash
python main.py --webui
```

## Testing

LangBot uses pytest for testing. To run the tests:

```bash
pytest
```

To run a specific test:

```bash
pytest tests/test_file.py::test_function
```

## Code Style

LangBot follows the PEP 8 style guide with some modifications. We use black for code formatting and isort for import sorting.

To format your code:

```bash
black langbot tests
isort langbot tests
```

## Creating a Pull Request

1. Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:

```bash
git add .
git commit -m "Add your feature or fix"
```

3. Push your branch to GitHub:

```bash
git push origin feature/your-feature-name
```

4. Create a pull request on GitHub

## Documentation

When adding new features, make sure to update the documentation. The documentation is written in Markdown and is located in the [QChatGPT-Wiki](https://github.com/RockChinQ/QChatGPT-Wiki) repository.

## Getting Help

If you need help with development, you can:

- Join the [community chat](https://qm.qq.com/q/Nnz7Vbj8OU)
- Open an issue on [GitHub](https://github.com/RockChinQ/LangBot/issues)
- Check the existing documentation and code for examples
