from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import ReadingSession
from models.schemas import SessionRequest


router = APIRouter()


@router.post("/session")
def create_session(
    request: SessionRequest,
    db: Session = Depends(get_db)
):
    session = ReadingSession(
        story_id=request.story_id,
        current_scene=request.current_scene,
        current_character=request.current_character,
        branch_id=request.branch_id
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return {
        "session_id": session.id,
        "story_id": session.story_id,
        "current_scene": session.current_scene,
        "current_character": session.current_character,
        "branch_id": session.branch_id
    }


@router.get("/session/{session_id}")
def get_session(
    session_id: int,
    db: Session = Depends(get_db)
):
    session = db.query(ReadingSession).filter(
        ReadingSession.id == session_id
    ).first()

    if not session:
        return {
            "error": "Session not found"
        }

    return {
        "session_id": session.id,
        "story_id": session.story_id,
        "current_scene": session.current_scene,
        "current_character": session.current_character,
        "branch_id": session.branch_id
    }