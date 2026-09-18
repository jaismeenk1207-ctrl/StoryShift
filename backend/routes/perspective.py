# backend/routes/perspective.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import StoryBranch
from models.schemas import PerspectiveRequest

router = APIRouter()


@router.post("/perspective")
def switch_perspective(
    request: PerspectiveRequest,
    db: Session = Depends(get_db)
):
    branch = StoryBranch(
        story_id=request.story_id,
        starting_scene=request.scene_id,
        current_scene=request.scene_id,
        character=request.character,
        generated_story=""
    )

    db.add(branch)
    db.commit()
    db.refresh(branch)

    return {
        "branch_id": branch.id,
        "story_id": branch.story_id,
        "starting_scene": branch.starting_scene,
        "current_scene": branch.current_scene,
        "character": branch.character,
        "message": "Perspective switched successfully."
    }