import { state } from "../state";

class MyScore extends HTMLElement {
  unsubscribeState?: () => void;

  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    this.unsubscribeState = state.subscribe(() => {
      this.render();
    });
  }
  disconnectedCallback() {
    this.unsubscribeState?.();
  }
  render() {
    const currentState = state.getState();
    const shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = "";
    
    const div = document.createElement("div");
    const style = document.createElement("style");

    style.textContent = `
      .container {
        border: 10px solid #000;
        background-color: #fff;
        padding: 20px;
        width: 260px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Odibee Sans', cursive;
      }
      .title {
        font-size: 55px;
        margin-bottom: 10px;
      }
      .score {
        font-size: 45px;
        align-self: flex-end;
      }
    `;

    div.className = "container";
    div.innerHTML = `
      <div class="title">Score</div>
      <div class="score">Vos: ${currentState.score.user}</div>
      <div class="score">Máquina: ${currentState.score.computer}</div>
    `;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(div);
  }
}
customElements.define("my-score", MyScore);
