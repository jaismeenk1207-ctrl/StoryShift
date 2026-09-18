from ai.story_generator import generate_continuation


result = generate_continuation(
    story_context="""
    Maya discovered a hidden door behind the library.
    She confronted a mysterious stranger.
    """,
    current_scene="""
    Maya confronts the stranger and demands the truth.
    """,
    character_name="The Stranger",
    character_description="""
    A mysterious person hiding important information.
    """,
)

print("\n--- AI CONTINUATION ---\n")
print(result)