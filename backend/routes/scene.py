from fastapi import APIRouter

router = APIRouter()


@router.get("/scene/{scene_id}")
def get_scene(scene_id: int):
    return {
        "scene_id": scene_id,
        "title": "The First Encounter",
        "content": "This is a sample story scene.",
        "characters": [
            "Hero",
            "Villain"
        ]
    }