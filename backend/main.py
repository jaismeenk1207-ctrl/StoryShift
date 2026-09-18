from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine

from routes.story import router as story_router
from routes.perspective import router as perspective_router


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StoryShift API",
    version="1.0.0"
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# ROUTES
# ---------------------------------------------------------

app.include_router(story_router)
app.include_router(perspective_router)


@app.get("/")
def root():
    return {
        "message": "StoryShift backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }