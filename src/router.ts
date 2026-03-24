import { WelcomePage } from "./pages/welcome";
import { InstructionsPage } from "./pages/instructions";
import { GamePage } from "./pages/game";
import { ResultPage } from "./pages/result";

const routes = [
  { path: /^\/welcome$/, component: WelcomePage },
  { path: /^\/instructions$/, component: InstructionsPage },
  { path: /^\/game$/, component: GamePage },
  { path: /^\/result$/, component: ResultPage },
];

export function initRouter(container: Element) {
  function handleRoute(pathname: string) {
    for (const r of routes) {
      if (r.path.test(pathname)) {
        document.body.classList.toggle("no-game-bg", pathname === "/result");
        const page = new (r.component as any)();
        container.firstChild?.remove();
        container.appendChild(page);
        return;
      }
    }
    goTo("/welcome", true);
  }

  const renderCurrentRoute = () => handleRoute(location.pathname);

  window.addEventListener("popstate", renderCurrentRoute);
  window.addEventListener("routechange", renderCurrentRoute);

  if (location.pathname === "/") {
    history.replaceState({}, "", "/welcome");
    handleRoute("/welcome");
  } else {
    handleRoute(location.pathname);
  }
}

export function goTo(path: string, replace = false) {
  if (replace) {
    history.replaceState({}, "", path);
  } else {
    history.pushState({}, "", path);
  }
  window.dispatchEvent(new Event("routechange"));
}
