from database.database import SessionLocal, Base, engine
from database.models import Story, Scene, Character

print("Running the UPDATED seed.py (v2) — creating tables if needed...")

# Create the tables if they don't exist yet. Without this, seed.py
# fails on a fresh/deleted database because nothing has made the tables.
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Wipe old data first so ids line up cleanly with frontend/src/data/stories.js.
# (For a truly clean run, also delete storyshift.db before running this script.)
db.query(Scene).delete()
db.query(Character).delete()
db.query(Story).delete()
db.commit()


books = [
    {
        "title": "Pride & Prejudice",
        "characters": [
            ("Elizabeth Bennet", "Witty and independent, quick to judge but slowly learning to see people more clearly."),
            ("Mr. Darcy", "Proud and reserved on the surface, but increasingly drawn to Elizabeth despite himself."),
            ("Jane Bennet", "Elizabeth's warm-hearted older sister, gentle and quick to think the best of others."),
        ],
        "scenes": [
            "Elizabeth attends a ball where she first meets the proud and distant Mr. Darcy.",
            "Darcy finds himself drawn to Elizabeth despite his attempts to resist her wit and independence.",
            "A misunderstanding about Darcy's past actions deepens Elizabeth's dislike of him.",
            "Jane falls ill and is invited to stay nearby, drawing Elizabeth and Darcy into closer contact.",
        ],
    },
    {
        "title": "The Adventures of Sherlock Holmes",
        "characters": [
            ("Sherlock Holmes", "A brilliant, restless detective who notices what everyone else overlooks."),
            ("Dr. Watson", "Holmes's loyal friend, steady and observant, often two steps behind him."),
            ("Inspector Lestrade", "A dutiful police inspector, confident in his own theories until Holmes proves otherwise."),
        ],
        "scenes": [
            "A mysterious client arrives at 221B Baker Street with a case that seems impossible to solve.",
            "Holmes examines the scene and notices small details everyone else missed.",
            "Watson grows suspicious that the case is more dangerous than Holmes is letting on.",
            "Inspector Lestrade arrives, already convinced he knows who is responsible.",
        ],
    },
    {
        "title": "Dracula",
        "characters": [
            ("Jonathan Harker", "A young solicitor sent to finalize a property deal, uneasy about his strange host."),
            ("Mina Harker", "Jonathan's intelligent, resourceful fiancée, sensing something is wrong from afar."),
            ("Count Dracula", "An ancient, courteous nobleman whose castle hides something far darker."),
        ],
        "scenes": [
            "Jonathan Harker arrives at a remote castle to finalize a property deal with a strange nobleman.",
            "Jonathan slowly realizes he is being kept in the castle against his will.",
            "Mina grows uneasy back home as Jonathan's letters become fewer and stranger.",
            "Dark rumors spread of a mysterious figure appearing in the nearby town at night.",
        ],
    },
    {
        "title": "Alice's Adventures in Wonderland",
        "characters": [
            ("Alice", "A curious young girl who follows her questions wherever they lead, even underground."),
            ("The White Rabbit", "Perpetually anxious and late, muttering about time as he hurries along."),
            ("The Cheshire Cat", "Mischievous and cryptic, appearing and vanishing whenever it suits him."),
        ],
        "scenes": [
            "Alice follows a hurried rabbit down a strange hole and falls into an unfamiliar world.",
            "She discovers a bottle and a cake that change her size in confusing ways.",
            "Alice wanders further into Wonderland, meeting increasingly odd creatures.",
            "She hears rumors of a Queen who rules the land with an unpredictable temper.",
        ],
    },
    {
        "title": "The Time Machine",
        "characters": [
            ("The Time Traveller", "An inventive scientist convinced his machine can carry him through the ages."),
            ("Weena", "A gentle, childlike Eloi who grows attached to the Time Traveller."),
            ("A Morlock", "An unseen, unsettling presence stirring beneath the peaceful surface of the future."),
        ],
        "scenes": [
            "A scientist unveils a machine he claims can travel through time.",
            "He arrives in a distant future inhabited by a gentle, childlike people.",
            "He begins to sense something unsettling lurking beneath their peaceful world.",
            "Strange sounds at night hint that the Eloi are not alone in this future.",
        ],
    },
    {
        "title": "Frankenstein",
        "characters": [
            ("Victor Frankenstein", "An obsessive scientist who pushes the boundary between life and death."),
            ("The Creature", "Intelligent and lonely, abandoned by his creator and wronged by the world."),
            ("Elizabeth Lavenza", "Victor's beloved companion, unaware of the secret he is carrying."),
        ],
        "scenes": [
            "A scientist grows obsessed with an experiment that pushes the boundaries of life and death.",
            "In a moment of triumph and horror, his creation opens its eyes for the first time.",
            "Overwhelmed by what he has done, the scientist flees, leaving his creation alone and confused.",
            "Rumors begin to spread of a strange figure wandering the countryside at night.",
        ],
    },
]

for book in books:
    story = Story(title=book["title"], story_type="novel")
    db.add(story)
    db.commit()
    db.refresh(story)

    for name, description in book["characters"]:
        db.add(Character(story_id=story.id, name=name, description=description))

    for index, scene_text in enumerate(book["scenes"], start=1):
        db.add(Scene(story_id=story.id, scene_number=index, content=scene_text))

    db.commit()

db.close()

print("Seeded 6 books with characters and scenes successfully!")

