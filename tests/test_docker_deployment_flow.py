"""Keep the beginner Docker guide ordered and actionable in every locale."""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class DockerDeploymentFlowTests(unittest.TestCase):
    def test_all_locales_follow_one_setup_path(self):
        for locale in ("zh", "en", "ja"):
            with self.subTest(locale=locale):
                text = (ROOT / locale / "deploy/langbot/docker.mdx").read_text()
                headings = re.findall(r"^## (\d+)\. .+$", text, re.MULTILINE)
                self.assertEqual(headings, ["1", "2", "3", "4"])
                download = "cd /opt\ngit clone https://github.com/langbot-app/LangBot\ncd LangBot/docker"
                start = "docker compose --profile all up -d"
                mirror = "docker.langbot.app/langbot-public/rockchin/langbot:latest"
                self.assertIn(download, text)
                self.assertNotIn("&&", text)
                self.assertEqual(text.count(start), 1)
                self.assertLess(text.index(download), text.index(mirror))
                self.assertLess(text.index(mirror), text.index(start))
                self.assertLess(text.index(start), text.index("http://127.0.0.1:5300"))
                self.assertIn("`/root`", text)
                self.assertIn("`/etc`", text)
                self.assertNotIn("seekdb", text.lower())
                self.assertNotIn("LANGBOT_BOX_ROOT", text)

    def test_optional_security_precedes_start_without_extra_start_commands(self):
        for locale in ("zh", "en", "ja"):
            with self.subTest(locale=locale):
                text = (ROOT / locale / "deploy/langbot/docker.mdx").read_text()
                accordion = re.search(r"<Accordion\b[^>]*>(.*?)</Accordion>", text, re.DOTALL)
                assert accordion is not None, f"{locale}: missing optional security section"
                content = accordion.group(1)
                for value in (".env", "openssl rand -hex 32", "LANGBOT_PLUGIN_RUNTIME_CONTROL_TOKEN", "LANGBOT_BOX_CONTROL_TOKEN"):
                    self.assertIn(value, content)
                self.assertNotIn("docker compose", content)
                self.assertLess(accordion.end(), text.index("docker compose --profile all up -d"))
                for target in ("usage/models/readme", "usage/platforms/readme"):
                    self.assertIn(f"/{locale}/{target}", text)


if __name__ == "__main__":
    unittest.main()
