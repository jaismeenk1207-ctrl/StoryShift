from database.database import SessionLocal, Base, engine
from database.models import Story, Scene, Character

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear old demo data
db.query(Character).delete()
db.query(Scene).delete()
db.query(Story).delete()
db.commit()


def create_story(title, characters, scenes):
    story = Story(
        title=title,
        story_type="novel"
    )

    db.add(story)
    db.commit()
    db.refresh(story)

    for number, content in enumerate(scenes, start=1):
        db.add(
            Scene(
                story_id=story.id,
                scene_number=number,
                content=content
            )
        )

    for name, description in characters:
        db.add(
            Character(
                story_id=story.id,
                name=name,
                description=description
            )
        )

    db.commit()


# --------------------------------------------------
# 1. PRIDE & PREJUDICE
# --------------------------------------------------

create_story(
    "Pride & Prejudice",

    [
        (
            "Elizabeth Bennet",
            "A witty and independent young woman who values intelligence, honesty, and personal freedom."
        ),
        (
            "Mr. Darcy",
            "A wealthy and reserved gentleman whose pride hides a deeply caring nature."
        ),
        (
            "Jane Bennet",
            "Elizabeth's kind and optimistic elder sister who believes in the goodness of others."
        )
    ],

    [
        "Elizabeth Bennet arrives at a gathering where she first notices the reserved Mr. Darcy. His distant manner leaves her unimpressed.",
        "Elizabeth hears conflicting opinions about Mr. Darcy and begins to question whether his proud behavior reveals his true character.",
        "Mr. Darcy finds himself increasingly drawn to Elizabeth despite his attempts to remain distant.",
        "Jane and Elizabeth discuss love, family expectations, and the complicated behavior of the gentlemen around them.",
        "Elizabeth is forced to reconsider her first impressions when new information changes her understanding of Darcy."
    ]
)


# --------------------------------------------------
# 2. SHERLOCK HOLMES
# --------------------------------------------------

create_story(
    "The Adventures of Sherlock Holmes",

    [
        (
            "Sherlock Holmes",
            "A brilliant detective who observes tiny details and uses logical deduction to solve mysteries."
        ),
        (
            "Dr. Watson",
            "Holmes's loyal friend and companion who records their adventures."
        ),
        (
            "Inspector Lestrade",
            "A Scotland Yard detective who often seeks Holmes's unusual expertise."
        )
    ],

    [
        "Sherlock Holmes examines a strange clue left at the scene of an unexplained incident.",
        "Dr. Watson notices that Holmes has become unusually interested in a small detail that everyone else ignored.",
        "Inspector Lestrade arrives with new information that makes the mystery more complicated.",
        "Holmes reconstructs the movements of the unknown visitor from a series of seemingly insignificant clues.",
        "The investigation reaches a critical moment when Holmes realizes that the first assumption about the case was wrong."
    ]
)


# --------------------------------------------------
# 3. DRACULA
# --------------------------------------------------

create_story(
    "Dracula",

    [
        (
            "Jonathan Harker",
            "A young solicitor who travels to a mysterious castle and slowly realizes that something is terribly wrong."
        ),
        (
            "Count Dracula",
            "A mysterious and powerful nobleman whose intentions are hidden behind an elegant appearance."
        ),
        (
            "Mina Murray",
            "An intelligent and determined woman who becomes involved in the strange events surrounding Dracula."
        )
    ],

    [
        "Jonathan Harker arrives at a remote castle and notices that his mysterious host behaves unlike any ordinary gentleman.",
        "Jonathan begins to notice strange details about the castle and realizes that he may not be free to leave.",
        "Count Dracula watches Jonathan carefully while hiding the true purpose of his guest's visit.",
        "Mina receives troubling news and begins to suspect that the strange events around her are connected.",
        "Jonathan and Mina both begin to understand that the mystery surrounding the castle is far larger than they imagined."
    ]
)


# --------------------------------------------------
# 4. ALICE IN WONDERLAND
# --------------------------------------------------

create_story(
    "Alice's Adventures in Wonderland",

    [
        (
            "Alice",
            "A curious and imaginative girl who finds herself in a bizarre world where ordinary rules no longer apply."
        ),
        (
            "The White Rabbit",
            "A hurried and mysterious rabbit whose strange behavior leads Alice deeper into Wonderland."
        ),
        (
            "The Cheshire Cat",
            "A mysterious and playful creature who gives Alice confusing but sometimes useful advice."
        )
    ],

    [
        "Alice follows the White Rabbit and suddenly finds herself falling into a strange world unlike anything she has known.",
        "Alice explores a mysterious room filled with unusual doors and objects that seem to change size.",
        "The Cheshire Cat appears and gives Alice a confusing clue about the strange world around her.",
        "Alice encounters creatures who follow rules that seem completely different from the rules of her ordinary world.",
        "Alice begins to realize that understanding Wonderland may require her to question everything she believes."
    ]
)


# --------------------------------------------------
# 5. THE TIME MACHINE
# --------------------------------------------------

create_story(
    "The Time Machine",

    [
        (
            "The Time Traveller",
            "A scientist fascinated by the possibility of travelling through time."
        ),
        (
            "Weena",
            "A gentle inhabitant of the distant future who becomes connected to the Time Traveller."
        ),
        (
            "The Narrator",
            "A curious observer who listens to the Time Traveller's extraordinary account."
        )
    ],

    [
        "The Time Traveller demonstrates his strange machine and claims that time itself can be explored.",
        "The machine carries him far into the future, where he discovers a world completely different from his own.",
        "The Time Traveller meets Weena and begins to understand that the future civilization hides a disturbing secret.",
        "The deeper he explores, the more he realizes that humanity's future may not resemble the progress he expected.",
        "The Time Traveller searches for a way back while the strange world around him becomes increasingly dangerous."
    ]
)


# --------------------------------------------------
# 6. FRANKENSTEIN
# --------------------------------------------------

create_story(
    "Frankenstein",

    [
        (
            "Victor Frankenstein",
            "A young scientist whose experiments lead him to create a living being."
        ),
        (
            "The Creature",
            "A newly created being struggling to understand humanity and its own existence."
        ),
        (
            "Elizabeth",
            "Victor's compassionate companion who worries about his increasingly secretive behavior."
        )
    ],

    [
        "Victor Frankenstein becomes consumed by his experiments and discovers a way to create life.",
        "The Creature awakens and discovers a world that immediately feels frightening and unfamiliar.",
        "Victor struggles with the consequences of his experiment and becomes increasingly isolated.",
        "The Creature observes humanity from a distance and begins to understand why people fear him.",
        "Victor realizes that the consequences of his creation cannot simply be forgotten."
    ]
)


db.close()

print("StoryShift database seeded successfully!")