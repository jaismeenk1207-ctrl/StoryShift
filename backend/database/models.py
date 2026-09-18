from sqlalchemy import Column, Integer, String, Text


from database.database import Base


class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    story_type = Column(String, nullable=False)


class Scene(Base):
    __tablename__ = "scenes"

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, nullable=False)
    scene_number = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)


class Character(Base):
    __tablename__ = "characters"

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)


class StoryBranch(Base):
    __tablename__ = "story_branches"

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, nullable=False)
    starting_scene = Column(Integer, nullable=False)
    current_scene = Column(Integer, nullable=False)
    character = Column(String, nullable=False)
    generated_story = Column(Text, nullable=True)

class ReadingSession(Base):
    __tablename__ = "reading_sessions"

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, nullable=False)
    current_scene = Column(Integer, nullable=False)
    current_character = Column(String, nullable=False)
    branch_id = Column(Integer, nullable=True)