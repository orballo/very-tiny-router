import { Frontity, MergePackages, Action } from "frontity/types";
import Router from "@frontity/router/types";

export default interface VeryTinyRouter extends Router {
  name: "@orballo/very-tiny-router";
  state: Router<Packages>["state"];
  actions: Router<Packages>["actions"] & {
    router: {
      init: Action<Packages>;
    };
  };
}

export type Packages = MergePackages<Frontity, VeryTinyRouter>;
