# backend/routes/story.py

import sys
from pathlib import Path

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Story, Scene, Character, StoryBranch

ROOT_DIR = Path(__file__).resolve().parents[2]

if str(ROOT_DIR) not in sys.path:
    sys.path.append(str(ROOT_DIR))

from ai.story_generator import generate_continuation

router = APIRouter()


@router.get("/story/{story_id}")
def get_story(
    story_id: int,
    db: Session = Depends(get_db)
):
    story = db.query(Story).filter(
        Story.id == story_id
    ).first()

    if not story:
        return {"error": "Story not found"}

    return {
        "id": story.id,
        "title": story.title,
        "story_type": story.story_type
    }


@router.get("/story/{story_id}/scenes")
def get_scenes(
    story_id: int,
    db: Session = Depends(get_db)
):
    scenes = (
        db.query(Scene)
        .filter(Scene.story_id == story_id)
        .order_by(Scene.scene_number)
        .all()
    )

    return [
        {
            "id": scene.id,
            "scene_number": scene.scene_number,
            "content": scene.content
        }
        for scene in scenes
    ]


@router.get("/story/{story_id}/characters")
def get_characters(
    story_id: int,
    db: Session = Depends(get_db)
):
    characters = (
        db.query(Character)
        .filter(Character.story_id == story_id)
        .all()
    )

    return [
        {
            "id": character.id,
            "name": character.name,
            "description": character.description or ""
        }
        for character in characters
    ]


@router.get("/story/{story_id}/continue")
def continue_story(
    story_id: int,
    branch_id: int | None = None,
    db: Session = Depends(get_db)
):

    story = db.query(Story).filter(
        Story.id == story_id
    ).first()

    if not story:
        return {"error": "Story not found"}

    # Create branch if this is the first chapter
    if branch_id is None:

        first_character = (
            db.query(Character)
            .filter(Character.story_id == story_id)
            .first()
        )

        if not first_character:
            return {"error": "No characters found"}

        branch = StoryBranch(
            story_id=story_id,
            starting_scene=1,
            current_scene=1,
            character=first_character.name,
            generated_story=""
        )

        db.add(branch)
        db.commit()
        db.refresh(branch)

    else:

        branch = (
            db.query(StoryBranch)
            .filter(
                StoryBranch.id == branch_id,
                StoryBranch.story_id == story_id
            )
            .first()
        )

        if not branch:
            return {"error": "Branch not found"}

    character = (
        db.query(Character)
        .filter(
            Character.story_id == story_id,
            Character.name == branch.character
        )
        .first()
    )

    if not character:
        return {"error": "Character not found"}

    scenes = (
        db.query(Scene)
        .filter(
            Scene.story_id == story_id,
            Scene.scene_number <= branch.current_scene
        )
        .order_by(Scene.scene_number)
        .all()
    )

    original_context = "\n\n".join(
        scene.content for scene in scenes
    )

    previous_generated = branch.generated_story or ""

    story_context = original_context

    if previous_generated:
        story_context += (
            "\n\nPREVIOUSLY GENERATED STORY:\n"
            + previous_generated
        )

    current_scene = (
        scenes[-1].content
        if scenes
        else ""
    )

    continuation = generate_continuation(
        story_context=story_context,
        current_scene=current_scene,
        character_name=character.name,
        character_description=character.description or ""
    )

    if previous_generated:
        branch.generated_story = (
            previous_generated
            + "\n\n"
            + continuation
        )
    else:
        branch.generated_story = continuation

    branch.current_scene += 1

    db.commit()

    return {
        "story_id": story_id,
        "branch_id": branch.id,
        "character": branch.character,
        "current_scene": branch.current_scene,
        "continuation": continuation
    }