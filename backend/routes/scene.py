from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Scene


router = APIRouter()


@router.get("/story/{story_id}/scenes")
def get_story_scenes(
    story_id: int,
    db: Session = Depends(get_db)
):
    scenes = db.query(Scene).filter(
        Scene.story_id == story_id
    ).order_by(Scene.scene_number).all()

    return {
        "story_id": story_id,
        "scenes": [
            {
                "scene_id": scene.id,
                "scene_number": scene.scene_number,
                "content": scene.content
            }
            for scene in scenes
        ]
    }