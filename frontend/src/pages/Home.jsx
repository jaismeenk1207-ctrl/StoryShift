import "../App.css";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
  return (
    <div className="home-page">

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span>✦</span> StoryShift
        </div>

        <div className="nav-links">
          <span>Home</span>
          <span>Explore</span>
          <span>About</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero">

        <div className="hero-badge">
          ✨ AI-POWERED INTERACTIVE STORYTELLING
        </div>

        <h1>
          Every story has
          <br />
          <span>more than one side.</span>
        </h1>

        <p>
          Step inside your favorite stories. Read them, transform them,
          and experience the same moment through the eyes of different characters.
        </p>

        {/* Main choices */}
        <div className="choice-container">

          <div className="choice-card">
            <div className="choice-icon">📚</div>

            <h2>Read a Novel</h2>

            <p>
              Explore a story and experience its characters from the inside.
            </p>

            <button onClick={() => navigate("/novels")}>
            Explore Novels →
            </button>
          </div>

          <div className="choice-card">
            <div className="choice-icon">🎬</div>

            <h2>Transform a Movie</h2>

            <p>
              Turn a cinematic story into an immersive novel experience.
            </p>

            <button onClick={() => navigate("/movie")}>
            Transform Movie →
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;