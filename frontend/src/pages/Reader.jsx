import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import stories from "../data/stories";

function Reader() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const storyId = Number(searchParams.get("story"));
  const movieName = searchParams.get("movie");

  const story =
    stories.find((item) => item.id === storyId) || stories[0];

  const [currentPOV, setCurrentPOV] = useState(
  movieName ? "Cobb" : "Arjun"
);
  const isMovie = Boolean(movieName);
  const [isSwitching, setIsSwitching] = useState(false);
  const [chapter, setChapter] = useState(0);

  const characters = isMovie
  ? {
      Cobb: {
        name: "Cobb",
        role: "The Extractor",
        emoji: "🧠",
      },

      Arthur: {
        name: "Arthur",
        role: "The Point Man",
        emoji: "🎩",
      },

      Mal: {
        name: "Mal",
        role: "The Projection",
        emoji: "🌀",
      },
    }
  : {
      Arjun: {
        name: "Arjun",
        role: "Protagonist",
        emoji: "👤",
      },

      Victor: {
        name: "Victor",
        role: "Antagonist",
        emoji: "🦹",
      },

      Maya: {
        name: "Maya",
        role: "Observer",
        emoji: "👩",
      },
    };

  const currentCharacter = characters[currentPOV];

  const storyContent = isMovie
  ? {
      Cobb: [
  [
    "Cobb opened his eyes and found himself standing in a hotel room that felt strangely familiar.",
    "Across the room, Arthur watched him carefully. Cobb knew this wasn't reality, but the details were convincing enough to make doubt dangerous.",
    '"How did we get here?" Cobb asked.',
    "He looked around the room, searching for the small imperfections that would reveal the dream. Somewhere beneath the perfect illusion, his memories were waiting.",
  ],
  [
    "Cobb moved toward the window and looked down at the impossible city below.",
    "The streets twisted in ways that no real city could. He felt the familiar pressure of a dream beginning to collapse around him.",
    "Arthur called his name from behind, but Cobb barely heard him.",
    "There was something hidden inside this dream, and Cobb was beginning to remember why he had come looking for it.",
  ],
],

      Arthur: [
  [
    "Arthur watched Cobb examine the room. He had seen that expression before — the look Cobb wore whenever reality became difficult to separate from memory.",
    "Everything around them appeared perfectly ordinary, but Arthur knew better. The room had been constructed, layer by layer, to feel real.",
    '"How did we get here?" Cobb asked.',
    "Arthur kept his answer to himself. Cobb was already beginning to question the dream, and that meant they were running out of time.",
  ],
  [
    "Arthur followed Cobb toward the window, carefully studying the shifting streets below.",
    "He knew the dream was becoming unstable, but Cobb seemed more interested in the strange details than in escaping.",
    "Arthur checked the time and felt a growing sense of urgency.",
    "If the dream collapsed before they found what they were looking for, neither of them would get a second chance.",
  ],
],

      Mal: [
  [
    "Mal stood silently at the edge of the room, watching Cobb search for an escape.",
    "To Cobb, she was a memory. To Mal, however, the world around them felt completely real.",
    '"How did we get here?" Cobb asked.',
    "Mal smiled faintly. Cobb believed he was searching for reality, but she knew the deeper truth: sometimes the mind creates a world it would rather never leave.",
  ],
  [
    "Mal watched as the city outside began to bend and reshape itself.",
    "Cobb still believed he could control the dream, but Mal could see the cracks spreading through his carefully constructed reality.",
    "She stepped closer to him, carrying memories that Cobb had spent years trying to bury.",
    "For Mal, this wasn't simply another dream. It was a world where the past could still reach him.",
  ],
],
    }
  : {
      Arjun: [
        "Arjun stepped into the room, his eyes immediately falling on Victor.",
        "Something about the way Victor stood near the window made him uneasy.",
        '"You shouldn\'t have come," Victor said.',
        "Arjun felt a strange knot forming in his chest. He knew Victor was hiding something.",
      ],

      Victor: [
        "Victor watched Arjun step through the doorway.",
        "His heart sank. Arjun was here far earlier than he had expected.",
        '"You shouldn\'t have come," Victor said, hoping his voice would not betray him.',
        "Victor knew the truth about the house. Arjun knew nothing yet, and Victor intended to keep it that way.",
      ],

      Maya: [
        "Maya stood quietly at the end of the hallway, watching the two men.",
        "She could see the tension between them, even though neither wanted to acknowledge it.",
        "Victor was afraid. Arjun was suspicious.",
        "But Maya knew something neither of them did: the real secret was not inside the house.",
      ],
    };

  const switchPerspective = (character) => {
  if (character === currentPOV) return;

  setIsSwitching(true);

  setTimeout(() => {
    setCurrentPOV(character);
    setIsSwitching(false);
  }, 500);
};

  return (
    <div className="reader-page">

      {/* TOP BAR */}

      <div className="reader-topbar">

        <button
          className="back-button"
          onClick={() => navigate("/novels")}
        >
          ← Back to Library
        </button>

        <div className="reader-story-name">
        {movieName || story.title}
        </div>

      </div>


      {/* READER */}

      <main className="reader-content">

        <div className="chapter-label">
         CHAPTER {String(chapter+1).padStart(2, "0")}
        </div>

        <h1>{movieName ? `${movieName} — A Novel` : "The Revelation"}</h1>

        <div className="current-pov">

          <span>
            {currentCharacter.emoji}
          </span>

          <div>
            <p>CURRENT PERSPECTIVE</p>

            <strong>
              {currentCharacter.name}
            </strong>

            <small>
              {currentCharacter.role}
            </small>
          </div>

        </div>


        {/* STORY */}

        <article
        className={
         isSwitching
        ? "story-text pov-switching"
        : "story-text"
        }
>

          {storyContent[currentPOV][chapter].map(
  (paragraph, index) => (
    <p key={index}>
      {paragraph}
    </p>
  )
)}

        </article>


        {/* POV SWITCHER */}

        <section className="perspective-section">

          <div className="perspective-heading">

            <span>✦</span>

            <div>

              <p>CHANGE YOUR PERSPECTIVE</p>

              <h2>
                Continue the story through their eyes.
              </h2>

            </div>

          </div>


          <div className="character-switcher">

            {Object.entries(characters).map(
              ([key, character]) => (

                <button
                  key={key}
                  className={
                    currentPOV === key
                      ? "character-button active"
                      : "character-button"
                  }
                  onClick={() =>
                    switchPerspective(key)
                  }
                >

                  <span>
                    {character.emoji}
                  </span>

                  <div>

                    <strong>
                      {character.name}
                    </strong>

                    <small>
                      {character.role}
                    </small>

                  </div>

                </button>

              )
            )}

          </div>

        </section>


        {/* CONTINUE */}

        <button
  className="continue-button"
  onClick={() => setChapter((prev) => prev + 1)}
>
  Continue Story →
</button>

      </main>

    </div>
  );
}

export default Reader;