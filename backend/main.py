from fastapi import FastAPI

from database.database import Base, engine
from database import models

from routes.movie import router as movie_router
from routes.novel import router as novel_router
from routes.scene import router as scene_router
from routes.perspective import router as perspective_router
from routes.story import router as story_router
from routes.session import router as session_router
from routes.character import router as character_router


app = FastAPI(
    title="StoryShift API",
    description="Backend for the StoryShift interactive storytelling platform",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "StoryShift backend is working!"
    }


# Movie routes
app.include_router(movie_router)

# Novel routes
app.include_router(novel_router)

# Scene routes
app.include_router(scene_router)

# Perspective switching routes
app.include_router(perspective_router)

# Story continuation routes
app.include_router(story_router)

app.include_router(session_router)

app.include_router(character_router)