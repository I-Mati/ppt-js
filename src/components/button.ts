class MyButton extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = "";
    const button = document.createElement("button");
    const style = document.createElement("style");

    style.textContent = `
      button {
        width: min(322px, 100%);
        height: 87px;
        background-color: #006C84;
        border: 10px solid #001935;
        border-radius: 10px;
        color: #D8FCFC;
        font-family: 'Odibee Sans', cursive;
        font-size: 45px;
        cursor: pointer;
        transition: transform 0.1s;
      }
      button:active {
        transform: scale(0.98);
      }
    `;

    button.textContent = this.textContent;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(button);
  }
}
customElements.define("my-button", MyButton);
