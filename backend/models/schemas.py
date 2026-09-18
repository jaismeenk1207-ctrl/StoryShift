from pydantic import BaseModel


class MovieRequest(BaseModel):
    movie_name: str


class NovelRequest(BaseModel):
    novel_name: str


class PerspectiveRequest(BaseModel):
    story_id: int
    scene_id: int
    character: str


class SessionRequest(BaseModel):
    story_id: int
    current_scene: int
    current_character: str
    branch_id: int | None = None