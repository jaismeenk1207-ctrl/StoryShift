from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Character

router = APIRouter()


@router.get("/story/{story_id}/characters")
def get_characters(
    story_id: int,
    db: Session = Depends(get_db)
):
    characters = db.query(Character).filter(
        Character.story_id == story_id
    ).all()

    return {
        "story_id": story_id,
        "characters": [
            {
                "character_id": character.id,
                "name": character.name,
                "description": character.description
            }
            for character in characters
        ]
    }