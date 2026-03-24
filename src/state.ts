export type Play = "piedra" | "papel" | "tijera";
type GameResult = "ganaste" | "perdiste" | "empate";
const STORAGE_KEY = "game-state";
const plays: Play[] = ["piedra", "papel", "tijera"];

export type GameState = {
  score: {
    user: number;
    computer: number;
  };
  currentGame: {
    userPlay: Play | null;
    computerPlay: Play | null;
  };
};

const state = {
  data: {
    score: {
      user: 0,
      computer: 0,
    },
    currentGame: {
      userPlay: null,
      computerPlay: null,
    },
  } as GameState,

  listeners: [] as Array<(data: GameState) => void>,

  init() {
    const lastStorageState = localStorage.getItem(STORAGE_KEY);
    if (lastStorageState) {
      this.setState(JSON.parse(lastStorageState));
    }
  },

  getState() {
    return this.data;
  },

  setState(newState: Partial<GameState>) {
    this.data = { ...this.data, ...newState };
    for (const cb of this.listeners) {
      cb(this.data);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  },

  subscribe(callback: (data: GameState) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  },

  resetCurrentGame() {
    this.setState({
      currentGame: {
        userPlay: null,
        computerPlay: null,
      },
    });
  },

  resetScore() {
    this.setState({
      score: {
        user: 0,
        computer: 0,
      },
      currentGame: {
        userPlay: null,
        computerPlay: null,
      },
    });
  },

  setPlay(userPlay: Play) {
    const computerPlay = this.getComputerPlay();
    this.setState({
      currentGame: { userPlay, computerPlay },
    });
    this.updateScore(userPlay, computerPlay);
  },

  setAutoLoseRound() {
    const randomUserPlay = this.getComputerPlay();
    const winnerPlayByUserPlay: Record<Play, Play> = {
      piedra: "papel",
      papel: "tijera",
      tijera: "piedra",
    };
    const computerPlay = winnerPlayByUserPlay[randomUserPlay];

    this.setState({
      currentGame: {
        userPlay: randomUserPlay,
        computerPlay,
      },
      score: {
        ...this.data.score,
        computer: this.data.score.computer + 1,
      },
    });
  },

  getComputerPlay(): Play {
    const randomIndex = Math.floor(Math.random() * 3);
    return plays[randomIndex];
  },

  whoWon(userPlay: Play, computerPlay: Play): GameResult {
    if (userPlay === computerPlay) return "empate";
    if (
      (userPlay === "piedra" && computerPlay === "tijera") ||
      (userPlay === "papel" && computerPlay === "piedra") ||
      (userPlay === "tijera" && computerPlay === "papel")
    ) {
      return "ganaste";
    }
    return "perdiste";
  },

  updateScore(userPlay: Play, computerPlay: Play) {
    const result = this.whoWon(userPlay, computerPlay);
    const currentScore = this.data.score;
    if (result === "empate") return;

    this.setState({
      score:
        result === "ganaste"
          ? { ...currentScore, user: currentScore.user + 1 }
          : { ...currentScore, computer: currentScore.computer + 1 },
    });
  },
};

export { state };
