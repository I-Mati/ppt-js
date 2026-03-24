import { goTo } from "../router";
import { state } from "../state";

export class ResultPage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const { userPlay, computerPlay } = state.getState().currentGame;
    if (!userPlay || !computerPlay) {
      goTo("/instructions");
      return;
    }

    const result = state.whoWon(userPlay, computerPlay);
    
    let backgroundColor = "#FF8282"; // Perdiste (Rojo)
    let resultText = "Perdiste";
    
    if (result === "ganaste") {
      backgroundColor = "#888949E5"; // Ganaste (Verde/Oliva)
      resultText = "Ganaste";
    } else if (result === "empate") {
      backgroundColor = "#F5F5F5";
      resultText = "Empate";
    }

    this.innerHTML = `
      <div class="result-container">
        <div class="hands-reveal">
          <my-hand class="computer-hand" play="${computerPlay}"></my-hand>
          <my-hand class="user-hand" play="${userPlay}"></my-hand>
        </div>
        <div class="overlay">
          <my-text variant="title">${resultText}</my-text>
          <my-score></my-score>
          <my-button class="back-button">Volver a jugar</my-button>
        </div>
      </div>
    `;

    this.querySelector(".back-button")?.addEventListener("click", () => {
      goTo("/instructions");
    });

    const style = document.createElement("style");
    style.textContent = `
      .result-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: ${backgroundColor};
        overflow: hidden;
      }
      .hands-reveal {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        width: 100%;
        position: absolute;
        overflow: hidden;
        pointer-events: none;
      }
      .computer-hand {
        transform: rotate(180deg) translateY(-30px);
        align-self: center;
      }
      .user-hand {
        align-self: center;
        transform: translateY(30px);
      }
      .overlay {
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
      }
    `;
    this.appendChild(style);
  }
}
customElements.define("result-page", ResultPage);
