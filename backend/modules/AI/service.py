import json
import base64
import re
from gigachat import GigaChat


class AIService:
    def __init__(self, auth_token: str):
        self.auth_token = auth_token
        self.base_tags = [
            "IT", "Программирование", "Робототехника", "Искусственный интеллект",
            "3D-моделирование", "Дизайн", "Графика", "Web-разработка", "Кибербезопасность",
            "Физика", "Математика", "Химия", "Биология", "Экология", "Медицина",
            "Спорт", "Футбол", "Волейбол", "Баскетбол", "Единоборства",
            "Культура", "Музыка", "Живопись", "Театр", "Хореография",
            "Волонтерство", "Лидерство", "Проектная деятельность", "Предпринимательство",
            "Олимпиада", "Хакатон", "Конференция"
        ]

    def analyze_diploma(self, image_path: str):
        try:
            with open(image_path, "rb") as f:
                image_bytes = f.read()
                image_data = base64.b64encode(image_bytes).decode("utf-8")
        except Exception as e:
            return {"name": "", "desc": f"Ошибка чтения: {repr(e)}", "org": ""}

        tags_str = ", ".join(self.base_tags)

        prompt = (
            "Проанализируй фото документа (грамота, диплом, сертификат). "
            "Верни ответ СТРОГО в формате JSON без лишнего текста: "
            "{"
            "\"name\": \"название мероприятия\", "
            "\"desc\": \"краткое описание за что получен (место, участие)\", "
            "\"org\": \"организатор\", "
            "\"tags\": [\"тег1\", \"тег2\"]"
            "}. "
            f"Для поля 'tags' выбирай только из этого списка: [{tags_str}]. "
            "Выбери 1-3 наиболее подходящих тега. Не пиши ничего, кроме JSON."
        )

        try:
            with GigaChat(credentials=self.auth_token, verify_ssl_certs=False) as giga:
                response = giga.chat({
                    "messages": [
                        {"role": "user", "content": prompt, "attachments": [image_data]}
                    ]
                })

                content = response.choices[0].message.content

                match = re.search(r'\{.*\}', content, re.DOTALL)
                if match:
                    ai_data = json.loads(match.group())
                    raw_tags = ai_data.get("tags", [])
                    valid_tags = [t for t in raw_tags if t in self.base_tags]

                    return {
                        "name": ai_data.get("name", "Новое достижение"),
                        "desc": ai_data.get("desc", ""),
                        "org": ai_data.get("org", "Не указано"),
                        "tags": valid_tags,
                        "filepath": image_path
                    }

                return {"name": "Ошибка парсинга", "desc": content, "org": "", "tags": []}

        except Exception as e:
            return {"name": "Ошибка AI", "desc": repr(e), "org": "", "tags": []}