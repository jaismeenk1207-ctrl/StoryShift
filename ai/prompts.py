def build_continuation_prompt(
    story_context: str,
    current_scene: str,
    character_name: str,
    character_description: str
):
    return f"""
You are continuing an interactive story.

IMPORTANT:
The story must remain consistent with the events that already happened.

Story context:
{story_context}

Current scene:
{current_scene}

Selected character:
{character_name}

Character description:
{character_description}

Write the next part of the story from the perspective of {character_name}.

Rules:
1. Keep the events consistent with the existing story.
2. Do not change established facts.
3. Only reveal information this character could reasonably know.
4. Keep the character's personality consistent.
5. Continue the story naturally.
6. Do not restart the story.
7. Do not summarize the previous scenes.
8. Write approximately 2-4 paragraphs.

Return only the story continuation.
"""