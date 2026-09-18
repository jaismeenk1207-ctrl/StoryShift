// frontend/src/pages/Reader.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import stories from "../data/stories";

const API = "/api";

export default function Reader() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const storyId = params.get("storyId") || "1";

  const story =
    stories.find((item) => String(item.id) === String(storyId)) ||
    stories[0];

  const [characters, setCharacters] = useState([]);
  const [scenes, setScenes] = useState([]);

  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [branchId, setBranchId] = useState(null);

  const [currentChapter, setCurrentChapter] = useState(1);
  const [generatedChapters, setGeneratedChapters] = useState([]);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [error, setError] = useState("");

  const selectedCharacterData = useMemo(
    () =>
      characters.find(
        (character) => character.name === selectedCharacter
      ),
    [characters, selectedCharacter]
  );

  useEffect(() => {
    async function loadStory() {
      try {
        setLoading(true);
        setError("");

        setCharacters([]);
        setScenes([]);
        setSelectedCharacter("");
        setBranchId(null);
        setCurrentChapter(1);
        setGeneratedChapters([]);

        const [charactersResponse, scenesResponse] =
          await Promise.all([
            fetch(`${API}/story/${storyId}/characters`),
            fetch(`${API}/story/${storyId}/scenes`),
          ]);

        if (!charactersResponse.ok || !scenesResponse.ok) {
          throw new Error("Failed to load story");
        }

        const charactersData = await charactersResponse.json();
        const scenesData = await scenesResponse.json();

        setCharacters(charactersData);
        setScenes(scenesData);

        if (charactersData.length > 0) {
          setSelectedCharacter(charactersData[0].name);
        }
      } catch (err) {
        console.error(err);
        setError(
          "Could not load this story. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadStory();
  }, [storyId]);

  async function changePerspective(characterName) {
    if (switching || generating) return;

    if (characterName === selectedCharacter && branchId) {
      return;
    }

    try {
      setSwitching(true);
      setError("");

      setSelectedCharacter(characterName);

      const sceneNumber =
        currentChapter > 1 ? currentChapter : 1;

      const response = await fetch(`${API}/perspective`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          story_id: Number(storyId),
          scene_id: sceneNumber,
          character: characterName,
        }),
      });

      if (!response.ok) {
        throw new Error("Perspective switch failed");
      }

      const data = await response.json();

      setBranchId(data.branch_id);
    } catch (err) {
      console.error(err);
      setError("Could not switch perspective.");
    } finally {
      setSwitching(false);
    }
  }

  async function continueStory() {
    if (generating || switching) return;

    try {
      setGenerating(true);
      setError("");

      let url = `${API}/story/${storyId}/continue`;

      if (branchId) {
        url += `?branch_id=${branchId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();

      const nextChapter = currentChapter + 1;

      setBranchId(data.branch_id);
      setCurrentChapter(nextChapter);

      setGeneratedChapters((previous) => [
        ...previous,
        {
          chapter: nextChapter,
          character: data.character || selectedCharacter,
          text: data.continuation || "",
        },
      ]);
    } catch (err) {
      console.error(err);
      setError(
        "The next chapter could not be generated. Please check the backend and Gemini connection."
      );
    } finally {
      setGenerating(false);
    }
  }

  function renderParagraphs(text) {
    if (!text) return null;

    return text
      .split(/\n\s*\n/)
      .filter((paragraph) => paragraph.trim())
      .map((paragraph, index) => (
        <p key={index}>{paragraph.trim()}</p>
      ));
  }

  return (
    <div className="pov-page">

      {/* TOP NAV */}

      <header className="pov-nav">
        <button
          className="pov-library-button"
          onClick={() => navigate("/novels")}
        >
          <span>←</span>
          Library
        </button>

        <div className="pov-logo">
          POV<span>VERSE</span>
        </div>

        <div className="pov-nav-right">
          <span className="live-dot"></span>
          Interactive Story
        </div>
      </header>

      {loading ? (
        <div className="pov-loading">
          <div className="loading-ring">
            <span>✦</span>
          </div>

          <h2>Entering the story...</h2>
          <p>Preparing your world of perspectives.</p>
        </div>
      ) : (
        <div className="pov-shell">

          {/* =========================================
              MAIN READER
          ========================================= */}

          <main className="pov-reading">

            <div className="pov-book-header">

              <div className="book-kicker">
                {story.genre}
              </div>

              <h1>{story.title}</h1>

              <div className="book-author">
                {story.author}
              </div>

            </div>

            {/* CHAPTER 1 */}

            <section className="chapter-block">

              <div className="chapter-topline">
                <span>CHAPTER 01</span>
                <div className="chapter-rule"></div>
              </div>

              <h2>First Impressions</h2>

              <div className="pov-under-chapter">
                <span className="pov-spark">✦</span>

                <span>POV</span>

                <strong>
                  {selectedCharacter || "Choose a character"}
                </strong>
              </div>

              <article className="chapter-text">
                {scenes.length > 0 ? (
                  scenes.map((scene) => (
                    <div key={scene.id}>
                      {renderParagraphs(scene.content)}
                    </div>
                  ))
                ) : (
                  <p className="empty-text">
                    The story is waiting to begin...
                  </p>
                )}
              </article>

            </section>

            {/* GENERATED CHAPTERS */}

            {generatedChapters.map((chapter) => (
              <section
                className="chapter-block generated-chapter"
                key={`${chapter.chapter}-${chapter.character}`}
              >

                <div className="chapter-topline">
                  <span>
                    CHAPTER{" "}
                    {String(chapter.chapter).padStart(2, "0")}
                  </span>

                  <div className="chapter-rule"></div>
                </div>

                <h2>
                  {chapter.character}'s Story
                </h2>

                <div className="pov-under-chapter generated-pov">
                  <span className="pov-spark">✦</span>

                  <span>POV</span>

                  <strong>{chapter.character}</strong>
                </div>

                <article className="chapter-text">
                  {renderParagraphs(chapter.text)}
                </article>

              </section>
            ))}

            {/* ERROR */}

            {error && (
              <div className="pov-error">
                <span>⚠</span>
                {error}
              </div>
            )}

            {/* CONTINUE */}

            <div className="next-chapter-area">

              <div className="next-chapter-decoration">
                <span></span>
                <i>✦</i>
                <span></span>
              </div>

              <button
                className="next-chapter-button"
                onClick={continueStory}
                disabled={generating || switching}
              >
                {generating ? (
                  <>
                    <span className="button-spinner"></span>
                    Writing Chapter{" "}
                    {String(currentChapter + 1).padStart(2, "0")}
                    ...
                  </>
                ) : (
                  <>
                    Continue to Chapter{" "}
                    {String(currentChapter + 1).padStart(2, "0")}
                    <span>→</span>
                  </>
                )}
              </button>

              <p className="next-chapter-caption">
                The next chapter unfolds through{" "}
                <strong>
                  {selectedCharacter || "your chosen character"}
                </strong>
                's eyes.
              </p>

            </div>

          </main>

          {/* =========================================
              PERSPECTIVE EXPERIENCE
          ========================================= */}

          <aside className="pov-panel">

            <div className="pov-panel-header">

              <div className="orbit-icon">
                <span>✦</span>
              </div>

              <div>
                <div className="panel-eyebrow">
                  CHANGE THE STORY
                </div>

                <h2>Choose your POV</h2>
              </div>

            </div>

            <p className="panel-intro">
              Every character sees a different story.
              Pick one and keep reading through their
              eyes.
            </p>

            <div className="character-cards">

              {characters.map((character, index) => {

                const active =
                  selectedCharacter === character.name;

                return (
                  <button
                    key={character.id}
                    className={
                      active
                        ? "pov-character active"
                        : "pov-character"
                    }
                    onClick={() =>
                      changePerspective(character.name)
                    }
                    disabled={switching || generating}
                  >

                    <div className="character-number">
                      0{index + 1}
                    </div>

                    <div
                      className={
                        active
                          ? "character-face active-face"
                          : "character-face"
                      }
                    >
                      {character.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="character-copy">

                      <strong>{character.name}</strong>

                      <span>
                        {character.description ||
                          "A character in this story."}
                      </span>

                    </div>

                    <div className="character-arrow">
                      {active ? "✓" : "↗"}
                    </div>

                  </button>
                );
              })}

            </div>

            {/* CURRENT POV */}

            {selectedCharacterData && (
              <div className="current-pov-card">

                <div className="current-pov-label">
                  YOU ARE READING AS
                </div>

                <div className="current-pov-name">
                  {selectedCharacter}
                </div>

                <div className="current-pov-status">
                  <span></span>
                  Perspective active
                </div>

              </div>
            )}

            {/* FUN FEATURE */}

            <div className="perspective-tip">

              <div className="tip-icon">◈</div>

              <div>
                <strong>See it differently.</strong>

                <p>
                  Switch POV whenever you want.
                  Your next chapter follows the
                  character you choose.
                </p>
              </div>

            </div>

          </aside>

        </div>
      )}
    </div>
  );
}