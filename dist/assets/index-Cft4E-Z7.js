var g=Object.defineProperty;var x=(t,e,n)=>e in t?g(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var d=(t,e,n)=>x(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const u="game-state",f=["piedra","papel","tijera"],i={data:{score:{user:0,computer:0},currentGame:{userPlay:null,computerPlay:null}},listeners:[],init(){const t=localStorage.getItem(u);t&&this.setState(JSON.parse(t))},getState(){return this.data},setState(t){this.data={...this.data,...t};for(const e of this.listeners)e(this.data);localStorage.setItem(u,JSON.stringify(this.data))},subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}},resetCurrentGame(){this.setState({currentGame:{userPlay:null,computerPlay:null}})},resetScore(){this.setState({score:{user:0,computer:0},currentGame:{userPlay:null,computerPlay:null}})},setPlay(t){const e=this.getComputerPlay();this.setState({currentGame:{userPlay:t,computerPlay:e}}),this.updateScore(t,e)},setAutoLoseRound(){const t=this.getComputerPlay(),n={piedra:"papel",papel:"tijera",tijera:"piedra"}[t];this.setState({currentGame:{userPlay:t,computerPlay:n},score:{...this.data.score,computer:this.data.score.computer+1}})},getComputerPlay(){const t=Math.floor(Math.random()*3);return f[t]},whoWon(t,e){return t===e?"empate":t==="piedra"&&e==="tijera"||t==="papel"&&e==="piedra"||t==="tijera"&&e==="papel"?"ganaste":"perdiste"},updateScore(t,e){const n=this.whoWon(t,e),r=this.data.score;n!=="empate"&&this.setState({score:n==="ganaste"?{...r,user:r.user+1}:{...r,computer:r.computer+1}})}};class p extends HTMLElement{constructor(){super()}connectedCallback(){i.resetScore(),this.render()}render(){var n;this.innerHTML=`
      <div class="container">
        <my-text variant="title">Piedra Papel o Tijera</my-text>
        <my-button class="start-button">Empezar</my-button>
        <div class="hands-container">
          <my-hand play="piedra"></my-hand>
          <my-hand play="papel"></my-hand>
          <my-hand play="tijera"></my-hand>
        </div>
      </div>
    `,(n=this.querySelector(".start-button"))==null||n.addEventListener("click",()=>{l("/instructions")});const e=document.createElement("style");e.textContent=`
      .container my-text {
        max-width: 280px;
      }
      .hands-container {
        display: flex;
        gap: 18px;
        align-items: flex-end;
      }
    `,this.appendChild(e)}}customElements.define("welcome-page",p);class m extends HTMLElement{constructor(){super()}connectedCallback(){this.render()}render(){var n;this.innerHTML=`
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
    `,(n=this.querySelector(".play-button"))==null||n.addEventListener("click",()=>{l("/game")});const e=document.createElement("style");e.textContent=`
      .container my-text {
        max-width: 300px;
      }
      .hands-container {
        display: flex;
        gap: 18px;
        align-items: flex-end;
      }
    `,this.appendChild(e)}}customElements.define("instructions-page",m);class h extends HTMLElement{constructor(){super()}connectedCallback(){this.render()}render(){i.resetCurrentGame(),this.innerHTML=`
      <div class="container game-container">
        <div class="countdown">3</div>
        <div class="hands-container">
          <my-hand class="hand" play="piedra"></my-hand>
          <my-hand class="hand" play="papel"></my-hand>
          <my-hand class="hand" play="tijera"></my-hand>
        </div>
      </div>
    `;let e=3;const n=this.querySelector(".countdown"),r=setInterval(()=>{e--,n&&(n.textContent=e.toString()),e===0&&(clearInterval(r),i.getState().currentGame.userPlay||(i.setAutoLoseRound(),l("/result")))},1e3),s=this.querySelectorAll(".hand");s.forEach(a=>{a.addEventListener("click",()=>{const c=a.getAttribute("play");c&&(i.setPlay(c),s.forEach(y=>y.classList.add("unselected")),a.classList.remove("unselected"),a.classList.add("selected"),setTimeout(()=>{clearInterval(r),l("/result")},500))})});const o=document.createElement("style");o.textContent=`
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
    `,this.appendChild(o)}}customElements.define("game-page",h);class A extends HTMLElement{constructor(){super()}connectedCallback(){this.render()}render(){var c;const{userPlay:e,computerPlay:n}=i.getState().currentGame;if(!e||!n){l("/instructions");return}const r=i.whoWon(e,n);let s="#FF8282",o="Perdiste";r==="ganaste"?(s="#888949E5",o="Ganaste"):r==="empate"&&(s="#F5F5F5",o="Empate"),this.innerHTML=`
      <div class="result-container">
        <div class="hands-reveal">
          <my-hand class="computer-hand" play="${n}"></my-hand>
          <my-hand class="user-hand" play="${e}"></my-hand>
        </div>
        <div class="overlay">
          <my-text variant="title">${o}</my-text>
          <my-score></my-score>
          <my-button class="back-button">Volver a jugar</my-button>
        </div>
      </div>
    `,(c=this.querySelector(".back-button"))==null||c.addEventListener("click",()=>{l("/instructions")});const a=document.createElement("style");a.textContent=`
      .result-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: ${s};
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
    `,this.appendChild(a)}}customElements.define("result-page",A);const E=[{path:/^\/welcome$/,component:p},{path:/^\/instructions$/,component:m},{path:/^\/game$/,component:h},{path:/^\/result$/,component:A}];function v(t){function e(r){var s;for(const o of E)if(o.path.test(r)){document.body.classList.toggle("no-game-bg",r==="/result");const a=new o.component;(s=t.firstChild)==null||s.remove(),t.appendChild(a);return}l("/welcome",!0)}const n=()=>e(location.pathname);window.addEventListener("popstate",n),window.addEventListener("routechange",n),location.pathname==="/"?(history.replaceState({},"","/welcome"),e("/welcome")):e(location.pathname)}function l(t,e=!1){e?history.replaceState({},"",t):history.pushState({},"",t),window.dispatchEvent(new Event("routechange"))}class C extends HTMLElement{constructor(){super(),this.render()}render(){const e=this.getAttribute("variant")||"body",n=this.shadowRoot||this.attachShadow({mode:"open"});n.innerHTML="";const r=document.createElement("div"),s=document.createElement("style");s.textContent=`
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
    `,r.className=e,r.textContent=this.textContent,n.appendChild(s),n.appendChild(r)}}customElements.define("my-text",C);class b extends HTMLElement{constructor(){super(),this.render()}render(){const e=this.shadowRoot||this.attachShadow({mode:"open"});e.innerHTML="";const n=document.createElement("button"),r=document.createElement("style");r.textContent=`
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
    `,n.textContent=this.textContent,e.appendChild(r),e.appendChild(n)}}customElements.define("my-button",b);class k extends HTMLElement{constructor(){super(),this.render()}render(){const e=this.getAttribute("play")||"piedra",n=this.shadowRoot||this.attachShadow({mode:"open"});n.innerHTML="";const r=document.createElement("div"),s=document.createElement("style"),o={piedra:new URL("data:image/png;base64,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",import.meta.url).href,papel:new URL("data:image/png;base64,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",import.meta.url).href,tijera:new URL("data:image/png;base64,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",import.meta.url).href};s.textContent=`
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
    `;const a=document.createElement("img");a.src=o[e],r.appendChild(a),n.appendChild(s),n.appendChild(r)}}customElements.define("my-hand",k);class S extends HTMLElement{constructor(){super();d(this,"unsubscribeState");this.render()}connectedCallback(){this.unsubscribeState=i.subscribe(()=>{this.render()})}disconnectedCallback(){var n;(n=this.unsubscribeState)==null||n.call(this)}render(){const n=i.getState(),r=this.shadowRoot||this.attachShadow({mode:"open"});r.innerHTML="";const s=document.createElement("div"),o=document.createElement("style");o.textContent=`
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
    `,s.className="container",s.innerHTML=`
      <div class="title">Score</div>
      <div class="score">Vos: ${n.score.user}</div>
      <div class="score">Máquina: ${n.score.computer}</div>
    `,r.appendChild(o),r.appendChild(s)}}customElements.define("my-score",S);(function(){i.init();const e=document.querySelector("#root");e&&v(e)})();
