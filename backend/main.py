from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="StoryShift Backend")


@app.get("/")
def home():
    return {
        "message": "StoryShift backend is working!"
    }


class MovieRequest(BaseModel):
    movie_name: str


@app.post("/movie")
def receive_movie(request: MovieRequest):
    return {
        "movie": request.movie_name,
        "message": "Movie received successfully!"
    }


class NovelRequest(BaseModel):
    novel_name: str


@app.post("/novel")
def receive_novel(request: NovelRequest):
    return {
        "novel": request.novel_name,
        "message": "Novel received successfully!"
    }


@app.get("/scene/{scene_id}")
def get_scene(scene_id: int):
    return {
        "scene_id": scene_id,
        "scene": "This is a sample scene."
    }


class PerspectiveRequest(BaseModel):
    scene_id: int
    character: str


@app.post("/perspective")
def get_perspective(request: PerspectiveRequest):
    return {
        "scene_id": request.scene_id,
        "character": request.character,
        "perspective": "This is a sample character perspective."
    }