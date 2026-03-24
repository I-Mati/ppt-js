import { goTo } from "../router";

export class InstructionsPage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <div class="container">
        <my-text variant="body">
          Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
        </my-text>
        <my-button class="play-button">¡Jugar!</my-button>
        <div class="hands-container">
          <my-hand play="piedra"></my-hand>
          <my-hand play="papel"></my-hand>
          <my-hand play="tijera"></my-hand>
        </div>
      </div>
    `;

    this.querySelector(".play-button")?.addEventListener("click", () => {
      goTo("/game");
    });

    const style = document.createElement("style");
    style.textContent = `
      .container my-text {
        max-width: 300px;
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
customElements.define("instructions-page", InstructionsPage);
