import { goTo } from "../router";
import { state } from "../state";

export class GamePage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    state.resetCurrentGame();

    this.innerHTML = `
      <div class="container game-container">
        <div class="countdown">3</div>
        <div class="hands-container">
          <my-hand class="hand" play="piedra"></my-hand>
          <my-hand class="hand" play="papel"></my-hand>
          <my-hand class="hand" play="tijera"></my-hand>
        </div>
      </div>
    `;

    let counter = 3;
    const countdownEl = this.querySelector(".countdown");
    const interval = setInterval(() => {
      counter--;
      if (countdownEl) countdownEl.textContent = counter.toString();
      if (counter === 0) {
        clearInterval(interval);
        // Si no eligió nada, pierde automáticamente la ronda
        if (!state.getState().currentGame.userPlay) {
          state.setAutoLoseRound();
          goTo("/result");
        }
      }
    }, 1000);

    const hands = this.querySelectorAll(".hand");
    hands.forEach((hand: any) => {
      hand.addEventListener("click", () => {
        const play = hand.getAttribute("play");
        if (!play) return;

        state.setPlay(play as "piedra" | "papel" | "tijera");
        
        // Estilo de selección
        hands.forEach(h => h.classList.add("unselected"));
        hand.classList.remove("unselected");
        hand.classList.add("selected");

        setTimeout(() => {
          clearInterval(interval);
          goTo("/result");
        }, 500);
      });
    });

    const style = document.createElement("style");
    style.textContent = `
      .game-container {
        justify-content: space-around;
      }
      .countdown {
        font-size: 100px;
        border: 20px solid #000;
        border-radius: 50%;
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
      }
      .hands-container {
        display: flex;
        gap: 20px;
        align-items: flex-end;
      }
      .unselected {
        opacity: 0.5;
        transform: scale(0.8);
      }
      .selected {
        transform: translateY(-30px) scale(1.2);
      }
    `;
    this.appendChild(style);
  }
}
customElements.define("game-page", GamePage);
