class MyHand extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const play = this.getAttribute("play") || "piedra";
    const shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = "";
    const div = document.createElement("div");
    const style = document.createElement("style");

    const images: any = {
      piedra: new URL("../assets/piedra.png", import.meta.url).href,
      papel: new URL("../assets/papel.png", import.meta.url).href,
      tijera: new URL("../assets/tijera.png", import.meta.url).href,
    };

    style.textContent = `
      img {
        height: 170px;
        transition: transform 0.2s;
        cursor: pointer;
      }
      img:hover {
        transform: translateY(-20px);
      }
      :host(.selected) img {
        transform: translateY(-30px) scale(1.15);
      }
      :host(.unselected) img {
        opacity: 0.5;
      }
    `;

    const img = document.createElement("img");
    img.src = images[play];
    div.appendChild(img);
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(div);
  }
}
customElements.define("my-hand", MyHand);
