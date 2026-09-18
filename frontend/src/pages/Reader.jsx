import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import stories from "../data/stories";

const API_BASE = "http://127.0.0.1:8000";

function Reader() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const storyId = Number(searchParams.get("story"));
  const movieName = searchParams.get("movie");

  const story =
    stories.find((item) => item.id === storyId) || stories[0];

  const isMovie = Boolean(movieName);
  const [isSwitching, setIsSwitching] = useState(false);

  // ---- MOVIE (Inception demo) state — unchanged from before ----
  const [chapter, setChapter] = useState(0);

  // ---- NOVEL state — now driven by the backend + AI ----
  const [novelCharacters, setNovelCharacters] = useState({});
  const [sceneNumber, setSceneNumber] = useState(1);
  const [narration, setNarration] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const [storyFinished, setStoryFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [currentPOV, setCurrentPOV] = useState(
    movieName ? "Cobb" : null
  );

  const movieCharacters = {
    Cobb: { name: "Cobb", role: "The Extractor", emoji: "🧠" },
    Arthur: { name: "Arthur", role: "The Point Man", emoji: "🎩" },
    Mal: { name: "Mal", role: "The Projection", emoji: "🌀" },
  };

  const storyContent = {
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
  };

  // Which character set + which "current chapter/scene" are we showing?
  const characters = isMovie ? movieCharacters : novelCharacters;
  const currentCharacter = currentPOV ? characters[currentPOV] : null;

  // ---- Fetch the real characters for this book from the backend ----
  useEffect(() => {
    if (isMovie) return;

    const emojis = ["👤", "🦹", "👩", "🧙", "🕵️", "👑"];

    fetch(`${API_BASE}/story/${storyId}/characters`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.characters || data.characters.length === 0) {
          setErrorMsg(
            "No characters found for this book yet — has the backend been seeded?"
          );
          return;
        }

        const charObj = {};
        data.characters.forEach((c, index) => {
          charObj[c.name] = {
            name: c.name,
            role: c.description || "Character",
            emoji: emojis[index % emojis.length],
          };
        });

        setNovelCharacters(charObj);
        setCurrentPOV(data.characters[0].name);
      })
      .catch(() =>
        setErrorMsg(
          "Could not reach the backend. Make sure it's running on http://127.0.0.1:8000."
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId, isMovie]);

  // ---- Fetch AI-generated narration whenever the POV or scene changes ----
  useEffect(() => {
    if (isMovie || !currentPOV) return;

    setLoading(true);
    setErrorMsg("");

    fetch(
      `${API_BASE}/story/${storyId}/continue?character=${encodeURIComponent(
        currentPOV
      )}&scene_number=${sceneNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMsg(data.error);
          return;
        }

        if (data.finished) {
          setStoryFinished(true);
          setNarration("");
          setHasNext(false);
          return;
        }

        setStoryFinished(false);
        setNarration(data.narration);
        setHasNext(data.has_next);
      })
      .catch(() =>
        setErrorMsg(
          "Could not reach the backend. Make sure it's running on http://127.0.0.1:8000."
        )
      )
      .finally(() => setLoading(false));
  }, [storyId, currentPOV, sceneNumber, isMovie]);

  const switchPerspective = (character) => {
    if (character === currentPOV) return;

    setIsSwitching(true);

    setTimeout(() => {
      setCurrentPOV(character);
      setIsSwitching(false);
    }, 500);
  };

  const handleContinue = () => {
    if (isMovie) {
      setChapter((prev) =>
        Math.min(prev + 1, storyContent[currentPOV].length - 1)
      );
      return;
    }

    if (!hasNext || loading) return;

    setIsSwitching(true);
    setTimeout(() => {
      setSceneNumber((prev) => prev + 1);
      setIsSwitching(false);
    }, 500);
  };

  return (
    <div className="reader-page">
      {/* TOP BAR */}
      <div className="reader-topbar">
        <button className="back-button" onClick={() => navigate("/novels")}>
          ← Back to Library
        </button>

        <div className="reader-story-name">{movieName || story.title}</div>
      </div>

      {/* READER */}
      <main className="reader-content">
        <div className="chapter-label">
          {isMovie
            ? `CHAPTER ${String(chapter + 1).padStart(2, "0")}`
            : `SCENE ${String(sceneNumber).padStart(2, "0")}`}
        </div>

        <h1>{movieName ? `${movieName} — A Novel` : story.title}</h1>

        {currentCharacter && (
          <div className="current-pov">
            <span>{currentCharacter.emoji}</span>

            <div>
              <p>CURRENT PERSPECTIVE</p>
              <strong>{currentCharacter.name}</strong>
              <small>{currentCharacter.role}</small>
            </div>
          </div>
        )}

        {/* STORY */}
        <article
          className={isSwitching ? "story-text pov-switching" : "story-text"}
        >
          {isMovie ? (
            storyContent[currentPOV][chapter].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : errorMsg ? (
            <p className="reader-error">{errorMsg}</p>
          ) : loading ? (
            <p>Generating {currentCharacter?.name}'s side of the story...</p>
          ) : storyFinished ? (
            <p>You've reached the end of this story.</p>
          ) : (
            narration
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)
          )}
        </article>

        {/* POV SWITCHER */}
        <section className="perspective-section">
          <div className="perspective-heading">
            <span>✦</span>

            <div>
              <p>CHANGE YOUR PERSPECTIVE</p>
              <h2>Continue the story through their eyes.</h2>
            </div>
          </div>

          <div className="character-switcher">
            {Object.entries(characters).map(([key, character]) => (
              <button
                key={key}
                className={
                  currentPOV === key
                    ? "character-button active"
                    : "character-button"
                }
                onClick={() => switchPerspective(key)}
              >
                <span>{character.emoji}</span>

                <div>
                  <strong>{character.name}</strong>
                  <small>{character.role}</small>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CONTINUE */}
        <button
          className="continue-button"
          onClick={handleContinue}
          disabled={!isMovie && (!hasNext || loading)}
        >
          {!isMovie && storyFinished ? "The End" : "Continue Story →"}
        </button>
      </main>
    </div>
  );
}

export default Reader;
