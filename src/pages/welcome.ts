import { goTo } from "../router";
import { state } from "../state";

export class WelcomePage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    state.resetScore();
    this.render();
  }
  render() {
    this.innerHTML = `
      <div class="container">
        <my-text variant="title">Piedra Papel o Tijera</my-text>
        <my-button class="start-button">Empezar</my-button>
        <div class="hands-container">
          <my-hand play="piedra"></my-hand>
          <my-hand play="papel"></my-hand>
          <my-hand play="tijera"></my-hand>
        </div>
      </div>
    `;

    this.querySelector(".start-button")?.addEventListener("click", () => {
      goTo("/instructions");
    });

    const style = document.createElement("style");
    style.textContent = `
      .container my-text {
        max-width: 280px;
      }
      .hands-container {
        display: flex;
        gap: 18px;
        align-items: flex-end;
      }
    `;
    this.appendChild(style);
  }
}
customElements.define("welcome-page", WelcomePage);
