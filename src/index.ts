import { state } from "./state";
import { initRouter } from "./router";
import "../style.css";

// Import components to register them
import "./components/text";
import "./components/button";
import "./components/hand";
import "./components/score";

(function main() {
  state.init();
  const root = document.querySelector("#root");
  if (root) {
    initRouter(root);
  }
})();
