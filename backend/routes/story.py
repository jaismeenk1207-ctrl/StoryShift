from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Story, Scene, Character
from ai.story_generator import generate_continuation


router = APIRouter()


@router.get("/story/{story_id}/continue")
def continue_story(
    story_id: int,
    character: str = Query(..., description="Name of the character whose POV to write from"),
    scene_number: int = Query(1, description="Which plot beat to narrate"),
    db: Session = Depends(get_db)
):
    story = db.query(Story).filter(Story.id == story_id).first()

    if not story:
        return {"error": "Story not found"}

    current_scene = db.query(Scene).filter(
        Scene.story_id == story_id,
        Scene.scene_number == scene_number
    ).first()

    if not current_scene:
        # No more plot beats left for this story
        return {
            "story_id": story_id,
            "scene_number": scene_number,
            "character": character,
            "finished": True,
            "narration": "",
            "has_next": False
        }

    character_row = db.query(Character).filter(
        Character.story_id == story_id,
        Character.name == character
    ).first()

    character_description = character_row.description if character_row else ""

    previous_scenes = db.query(Scene).filter(
        Scene.story_id == story_id,
        Scene.scene_number < scene_number
    ).order_by(Scene.scene_number).all()

    story_context = "\n".join(s.content for s in previous_scenes)
    if not story_context:
        story_context = "This is the very beginning of the story."

    narration = generate_continuation(
        story_context=story_context,
        current_scene=current_scene.content,
        character_name=character,
        character_description=character_description
    )

    has_next = db.query(Scene).filter(
        Scene.story_id == story_id,
        Scene.scene_number == scene_number + 1
    ).first() is not None

    return {
        "story_id": story_id,
        "scene_number": scene_number,
        "character": character,
        "finished": False,
        "narration": narration,
        "has_next": has_next
    }