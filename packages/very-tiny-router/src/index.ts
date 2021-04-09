import { error, batch } from "frontity";
import VeryTinyRouter from "../types";

const veryTinyRouter: VeryTinyRouter = {
  name: "@orballo/very-tiny-router",
  state: {
    router: {
      link: "/",
      state: {},
    },
  },
  actions: {
    router: {
      init: ({ state, actions }) => {
        if (state.frontity.platform === "server") {
          state.router.link = state.frontity.initialLink;
        } else {
          // Sync Frontity state with browser.
          window.history.replaceState(
            JSON.parse(JSON.stringify(state.router.state)),
            "",
            state.router.link
          );

          // Listen to changes in history.
          window.addEventListener("popstate", (event) => {
            if (event.state) {
              actions.router.set(
                window.location.pathname +
                  window.location.search +
                  window.location.hash,
                // We are casting types here because `pop` is used only internally,
                // therefore we don't want to expose it in the types for users.
                { method: "pop", state: event.state } as any
              );
            }
          });
        }
      },
      set: ({ state }) => (link, options = {}) => {
        if (state.router.link === link) return;

        const historyState = JSON.parse(JSON.stringify(options.state || {}));

        if (state.frontity.platform === "client") {
          if (!options.method || options.method === "push")
            window.history.pushState(historyState, "", link);
          else if (options.method === "replace")
            window.history.replaceState(historyState, "", link);
          else if (options.method !== "pop") {
            // Throw an error if another method is used. We support "pop" internally
            // for popstate events.
            error(
              `The method ${options.method} is not supported by actions.router.set.`
            );
          }
        }

        batch(() => {
          state.router.previous = state.router.link;
          state.router.link = link;
          state.router.state = historyState;
        });
      },
      updateState: ({ state }) => (historyState) => {
        const cloned = JSON.parse(JSON.stringify(historyState));

        state.router.state = cloned;
        window.history.replaceState(cloned, "");
      },
    },
  },
};

export default veryTinyRouter;
