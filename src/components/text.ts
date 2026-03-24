class MyText extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const variant = this.getAttribute("variant") || "body";
    const shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = "";
    const div = document.createElement("div");
    const style = document.createElement("style");

    style.textContent = `
      .title {
        font-size: 80px;
        color: #009048;
        font-weight: bold;
        line-height: 1;
        margin: 0;
        text-align: center;
      }
      .body {
        font-size: 40px;
        color: #000;
        text-align: center;
      }
    `;

    div.className = variant;
    div.textContent = this.textContent;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(div);
  }
}
customElements.define("my-text", MyText);
