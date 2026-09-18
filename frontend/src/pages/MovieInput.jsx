import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieInput() {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
const [isGenerating, setIsGenerating] = useState(false);
const [generationStep, setGenerationStep] = useState(0);

  const handleTransform = async () => {
  if (!movieName.trim()) return;

  try {
    const response = await fetch("http://127.0.0.1:8000/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_name: movieName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send movie to backend");
    }

    const data = await response.json();
    console.log("Backend response:", data);

    // Start the existing generation animation
    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => {
      setGenerationStep(2);
    }, 1200);

    setTimeout(() => {
      setGenerationStep(3);
    }, 2400);

    setTimeout(() => {
      setGenerationStep(4);
    }, 3600);

    setTimeout(() => {
      navigate(`/read?movie=${encodeURIComponent(movieName)}`);
    }, 5000);

  } catch (error) {
    console.error("Error:", error);
    alert("Could not connect to StoryShift backend.");
  }
};
if (isGenerating) {
  const steps = [
    "Analyzing the movie...",
    "Discovering characters...",
    "Building the narrative...",
    "Creating your novel...",
  ];

  return (
    <div className="generation-page">
      <div className="generation-glow"></div>

      <div className="generation-content">

        <div className="generation-symbol">
          ✦
        </div>

        <p className="generation-label">
          STORYSHIFT AI
        </p>

        <h1>
          Creating your
          <br />
          <span>novel.</span>
        </h1>

        <p className="generation-movie">
          {movieName}
        </p>

        <div className="generation-steps">
          {steps.map((step, index) => (
            <div
              key={step}
              className={
                generationStep >= index + 1
                  ? "generation-step active"
                  : "generation-step"
              }
            >
              <span className="step-icon">
                {generationStep > index + 1
                  ? "✓"
                  : generationStep === index + 1
                  ? "✦"
                  : "○"}
              </span>

              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="generation-progress">
          <div
            className="generation-progress-bar"
            style={{
              width: `${generationStep * 25}%`,
            }}
          ></div>
        </div>

      </div>
    </div>
  );
}
  return (
    <div className="movie-page">

      <div className="movie-topbar">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <div className="movie-logo">
          <span>✦</span> StoryShift
        </div>
      </div>

      <main className="movie-content">

        <div className="movie-badge">
          ✦ MOVIE → NOVEL
        </div>

        <h1>
          Turn any movie into
          <br />
          <span>a novel.</span>
        </h1>

        <p className="movie-description">
          Enter the name of a movie and StoryShift will transform
          its story into an immersive, character-driven novel.
        </p>

        <div className="movie-input-card">

          <div className="input-header">
            <div className="input-icon">🎬</div>

            <div>
              <h2>What movie do you want to experience?</h2>
              <p>
                Enter a movie name and let AI create your novel experience.
              </p>
            </div>
          </div>

          <div className="movie-search-box">

            <input
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              placeholder="Enter movie name..."
            />

            <button
              onClick={handleTransform}
              disabled={!movieName.trim()}
            >
              ✦ Generate Novel
            </button>

          </div>
            <div className="movie-suggestions">
          <span>Try a movie:</span>

          <button onClick={() => setMovieName("Inception")}>
            Inception
          </button>

          <button onClick={() => setMovieName("Interstellar")}>
            Interstellar
          </button>

          <button onClick={() => setMovieName("The Dark Knight")}>
            The Dark Knight
          </button>
            </div>

            <div className="transformation-flow">
          <span>🎬</span>
          <div></div>
          <span>✦</span>
          <div></div>
          <span>📖</span>
        </div>
        </div>

        <p className="flow-text">
          Movie <span>→</span> AI Transformation <span>→</span> Novel
        </p>

      </main>
    </div>
  );
}

export default MovieInput;