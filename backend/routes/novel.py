from fastapi import APIRouter
from models.schemas import NovelRequest

router = APIRouter()


@router.post("/novel")
def receive_novel(request: NovelRequest):
    return {
        "title": request.novel_name,
        "type": "novel",
        "status": "received"
    }