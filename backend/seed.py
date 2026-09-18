from database.database import SessionLocal
from database.models import Story, Scene, Character


db = SessionLocal()

story = Story(
    title="The Hidden Door",
    story_type="novel"
)

db.add(story)
db.commit()
db.refresh(story)


scenes = [
    Scene(
        story_id=story.id,
        scene_number=1,
        content="Maya discovers a mysterious door behind the library."
    ),
    Scene(
        story_id=story.id,
        scene_number=2,
        content="Maya hears footsteps approaching the door."
    ),
    Scene(
        story_id=story.id,
        scene_number=3,
        content="The stranger enters the room and hides a mysterious object."
    ),
    Scene(
        story_id=story.id,
        scene_number=4,
        content="Maya realizes that the stranger knows about the hidden door."
    ),
    Scene(
        story_id=story.id,
        scene_number=5,
        content="Maya confronts the stranger and demands the truth."
    )
]

for scene in scenes:
    db.add(scene)


characters = [
    Character(
        story_id=story.id,
        name="Maya",
        description="A curious student who wants to uncover the mystery."
    ),
    Character(
        story_id=story.id,
        name="The Stranger",
        description="A mysterious person hiding important information."
    )
]

for character in characters:
    db.add(character)


db.commit()
db.close()

print("Sample story created successfully!")