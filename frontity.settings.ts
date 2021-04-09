import { Settings } from "frontity/types";

const settings: Settings = {
  name: "very-tiny-router",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "Test Frontity Blog",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: ["@orballo/very-tiny-router"],
};

export default settings;
