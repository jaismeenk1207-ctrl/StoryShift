import { useNavigate } from "react-router-dom";
import stories from "../data/stories";

function NovelLibrary() {
    const navigate = useNavigate();
  return (
    <div className="library-page">

      <div className="library-header">

        <p className="section-label">
          ✦ STORY LIBRARY
        </p>

        <h1>
          Choose your <span>story.</span>
        </h1>

        <p className="library-description">
          Enter a new world and experience the story
          through the minds of its characters.
        </p>

      </div>

      <div className="story-grid">

        {stories.map((story) => (

          <div className="story-card" key={story.id}>

            <div className="story-cover">
              <span>{story.emoji}</span>
            </div>

            <div className="story-info">

              <p className="story-genre">
                {story.genre}
              </p>

              <h2>
                {story.title}
              </h2>

              <p className="story-author">
                by {story.author}
              </p>

              <p className="story-description">
                {story.description}
              </p>

              <button onClick={() => navigate(`/read?story=${story.id}`)}>
                Read Story →
            </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default NovelLibrary;