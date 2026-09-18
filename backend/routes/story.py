from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import StoryBranch, Scene


router = APIRouter()


@router.get("/story/{story_id}/continue")
def continue_story(
    story_id: int,
    branch_id: int | None = None,
    db: Session = Depends(get_db)
):
    branch = None

    if branch_id is not None:
        branch = db.query(StoryBranch).filter(
            StoryBranch.id == branch_id,
            StoryBranch.story_id == story_id
        ).first()

        if not branch:
            return {
                "error": "Branch not found"
            }

    if branch:
        return {
            "story_id": story_id,
            "branch_id": branch.id,
            "character": branch.character,
            "starting_scene": branch.starting_scene,
            "message": "Story continuation will be generated from this character's perspective."
        }

    return {
        "story_id": story_id,
        "message": "Continue the original story."
    }