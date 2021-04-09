import React from "react";
import { connect, useConnect } from "frontity";
import { Packages } from "./types";

const Link: React.FC<{
  link: string;
  target?: string;
  scroll?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}> = ({
  link,
  children,
  target = "_self",
  scroll = true,
  onClick,
  ...anchorProps
}) => {
  const { actions } = useConnect<Packages>();

  const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    // Do nothing if it's an external link
    if (
      ((link) => {
        try {
          new URL(link);
          return true;
        } catch (e) {
          return false;
        }
      })(link)
    ) {
      return;
    }

    // Do nothing if this is supposed to open in a new tab
    if (target === "_blank") {
      return;
    }

    // Allow the user to open the link in a new tab
    if (
      event.ctrlKey ||
      event.shiftKey ||
      event.metaKey ||
      (event.button && event.button === 1)
    ) {
      return;
    }

    // Prevent the server-side rendering.
    event.preventDefault();

    // Set the router to the new url.
    actions.router.set(link);

    // Scroll the page to the top
    if (scroll) {
      window.scrollTo(0, 0);
      document.body.focus();
    }

    // If there's an additional handler, execute it.
    if (typeof onClick === "function") onClick(event);
  };

  return (
    <a href={link} target={target} onClick={onClickHandler} {...anchorProps}>
      {children}
    </a>
  );
};

export default connect(Link, { injectProps: false });
