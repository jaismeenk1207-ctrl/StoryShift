from fastapi import APIRouter
from models.schemas import MovieRequest

router = APIRouter()


@router.post("/movie")
def receive_movie(request: MovieRequest):
    return {
        "title": request.movie_name,
        "type": "movie",
        "status": "received"
    }