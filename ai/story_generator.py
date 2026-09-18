import os

from dotenv import load_dotenv
from google import genai

from ai.prompts import build_continuation_prompt


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_continuation(
    story_context: str,
    current_scene: str,
    character_name: str,
    character_description: str
):
    prompt = build_continuation_prompt(
        story_context,
        current_scene,
        character_name,
        character_description
    )

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text