import json
import base64
import re
from gigachat import GigaChat


class AIService:
    def __init__(self, auth_token: str):
        self.auth_token = auth_token

    def analyze_diploma(self, image_path: str):
        try:
            with open(image_path, "rb") as f:
                image_bytes = f.read()
                # Здесь используем стандартный base64
                image_data = base64.b64encode(image_bytes).decode("utf-8")
        except Exception as e:
            # Используем repr(e), чтобы избежать проблем с кодировкой при выводе ошибки
            return {"name": "", "desc": f"Ошибка чтения: {repr(e)}", "org": ""}

        prompt = (
            "Проанализируй фото документа. Верни ответ СТРОГО в формате JSON: "
            "{\"name\": \"название\", \"desc\": \"описание\", \"org\": \"кто выдал\"}. "
            "Не пиши ничего, кроме JSON."
        )

        try:
            with GigaChat(credentials=self.auth_token, verify_ssl_certs=False) as giga:
                response = giga.chat({
                    "messages": [
                        {"role": "user", "content": prompt, "attachments": [image_data]}
                    ]
                })

                content = response.choices[0].message.content

                # Защита: ищем JSON внутри текста, если нейронка добавила лишнее
                match = re.search(r'\{.*\}', content, re.DOTALL)
                if match:
                    return json.loads(match.group())

                return {"name": "Ошибка парсинга", "desc": content, "org": ""}

        except Exception as e:
            return {"name": "Ошибка AI", "desc": repr(e), "org": ""}