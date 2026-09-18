const stories = [
  {
    id: 1,
    title: "Pride & Prejudice",
    genre: "Romance",
    author: "Jane Austen",
    description:
      "A story of love, misunderstanding, family and society.",
    emoji: "🌹",
    characters: [
      {
        name: "Elizabeth Bennet",
        role: "The Observer",
        emoji: "E",
        description:
          "Witty, independent and quick to question the intentions of those around her."
      },
      {
        name: "Mr. Darcy",
        role: "The Reserved Gentleman",
        emoji: "M",
        description:
          "A wealthy and reserved gentleman whose thoughts reveal another side of the story."
      },
      {
        name: "Jane Bennet",
        role: "The Optimist",
        emoji: "J",
        description:
          "Kind and hopeful, Jane looks for the goodness in people and situations."
      }
    ],
    opening: {
      "Elizabeth Bennet":
        "Elizabeth Bennet arrives at a gathering where she first notices the reserved Mr. Darcy. His distant manner leaves her unimpressed.",
      "Mr. Darcy":
        "Mr. Darcy observes the lively gathering from a distance, determined to remain detached despite Elizabeth Bennet's unusual presence.",
      "Jane Bennet":
        "Jane Bennet attends the gathering with Elizabeth, hoping that the evening will bring pleasant company and perhaps a little happiness."
    }
  },

  {
    id: 2,
    title: "The Adventures of Sherlock Holmes",
    genre: "Mystery",
    author: "Arthur Conan Doyle",
    description:
      "Follow Sherlock Holmes as he unravels mysterious cases.",
    emoji: "🔎",
    characters: [
      {
        name: "Sherlock Holmes",
        role: "The Detective",
        emoji: "S",
        description:
          "A brilliant detective who notices details others overlook and follows logic wherever it leads."
      },
      {
        name: "Dr. Watson",
        role: "The Chronicler",
        emoji: "W",
        description:
          "Holmes's loyal companion who records the strange and fascinating cases they encounter."
      },
      {
        name: "Inspector Lestrade",
        role: "The Investigator",
        emoji: "L",
        description:
          "A Scotland Yard inspector who brings official investigations to Holmes."
      }
    ],
    opening: {
      "Sherlock Holmes":
        "Sherlock Holmes examines a strange clue left at the scene of an unexplained incident.",
      "Dr. Watson":
        "Dr. Watson notices that Holmes has become unusually interested in a small detail that everyone else ignored.",
      "Inspector Lestrade":
        "Inspector Lestrade arrives with new information that makes the mystery more complicated."
    }
  },

  {
    id: 3,
    title: "Dracula",
    genre: "Horror",
    author: "Bram Stoker",
    description:
      "A gothic tale of mystery, fear and the supernatural.",
    emoji: "🧛",
    characters: [
      {
        name: "Jonathan Harker",
        role: "The Visitor",
        emoji: "J",
        description:
          "A young solicitor whose journey into the unknown becomes increasingly disturbing."
      },
      {
        name: "Count Dracula",
        role: "The Count",
        emoji: "D",
        description:
          "A mysterious nobleman whose presence hides secrets far darker than expected."
      },
      {
        name: "Mina Murray",
        role: "The Witness",
        emoji: "M",
        description:
          "Intelligent and observant, Mina tries to understand the strange events surrounding her."
      }
    ],
    opening: {
      "Jonathan Harker":
        "Jonathan Harker arrives at a remote castle and immediately notices that something about his mysterious host feels deeply wrong.",
      "Count Dracula":
        "Count Dracula watches his unexpected guest enter the castle, carefully concealing the secrets that surround the ancient walls.",
      "Mina Murray":
        "Mina Murray receives troubling information from Jonathan and begins to suspect that his journey has placed him in terrible danger."
    }
  },

  {
    id: 4,
    title: "Alice's Adventures in Wonderland",
    genre: "Fantasy",
    author: "Lewis Carroll",
    description:
      "Enter a strange world where nothing is quite what it seems.",
    emoji: "🐇",
    characters: [
      {
        name: "Alice",
        role: "The Adventurer",
        emoji: "A",
        description:
          "Curious and fearless, Alice follows every strange clue into Wonderland."
      },
      {
        name: "The White Rabbit",
        role: "The Guide",
        emoji: "W",
        description:
          "Always rushing somewhere, the White Rabbit seems to know more than he says."
      },
      {
        name: "The Mad Hatter",
        role: "The Trickster",
        emoji: "H",
        description:
          "A wonderfully unpredictable character whose riddles rarely make ordinary sense."
      }
    ],
    opening: {
      Alice:
        "Alice notices a hurried white rabbit disappear down a mysterious hole and decides that following it might be worth the risk.",
      "The White Rabbit":
        "The White Rabbit hurries through Wonderland, increasingly worried that someone has noticed the secret he is carrying.",
      "The Mad Hatter":
        "The Mad Hatter prepares another impossible tea party while wondering when the next unexpected visitor will arrive."
    }
  },

  {
    id: 5,
    title: "The Time Machine",
    genre: "Science Fiction",
    author: "H. G. Wells",
    description:
      "A scientist travels through time and discovers an unfamiliar future.",
    emoji: "⏳",
    characters: [
      {
        name: "The Time Traveller",
        role: "The Inventor",
        emoji: "T",
        description:
          "A scientist determined to uncover what lies beyond the boundaries of his own era."
      },
      {
        name: "Weena",
        role: "The Survivor",
        emoji: "W",
        description:
          "A mysterious figure from the future whose perspective reveals another side of the strange world."
      },
      {
        name: "The Narrator",
        role: "The Witness",
        emoji: "N",
        description:
          "A curious observer trying to understand the impossible story unfolding before him."
      }
    ],
    opening: {
      "The Time Traveller":
        "The Time Traveller activates his extraordinary machine and watches the world race forward around him.",
      Weena:
        "Weena observes the strange visitor who has appeared in her world and wonders what he could possibly want.",
      "The Narrator":
        "The Narrator listens carefully as the Time Traveller begins describing a journey that seems impossible to believe."
    }
  },

  {
    id: 6,
    title: "Frankenstein",
    genre: "Horror",
    author: "Mary Shelley",
    description:
      "A scientist creates life and faces the consequences of his experiment.",
    emoji: "⚡",
    characters: [
      {
        name: "Victor Frankenstein",
        role: "The Creator",
        emoji: "V",
        description:
          "A brilliant scientist whose ambition leads him into dangerous and unexplored territory."
      },
      {
        name: "The Creature",
        role: "The Created",
        emoji: "C",
        description:
          "A lonely being searching for understanding, belonging and answers about his existence."
      },
      {
        name: "Robert Walton",
        role: "The Explorer",
        emoji: "R",
        description:
          "An explorer who becomes fascinated by Victor's extraordinary and tragic story."
      }
    ],
    opening: {
      "Victor Frankenstein":
        "Victor Frankenstein looks upon the result of his experiment and realizes that the moment he dreamed about has become something terrifying.",
      "The Creature":
        "The Creature awakens to an unfamiliar world, surrounded by strange sensations and unable to understand why he exists.",
      "Robert Walton":
        "Robert Walton encounters a mysterious stranger whose exhausted appearance suggests that an extraordinary story is about to unfold."
    }
  }
];

export default stories;