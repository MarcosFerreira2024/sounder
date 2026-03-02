import { useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTooltip } from "../../contexts/TooltipContext";

function CustomTooltipWrapper() {
  const { showTooltip, hideTooltip } = useTooltip();
  const location = useLocation();
  const currentTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    hideTooltip();
  }, [location.pathname, hideTooltip]);

  const replaceTitleWithDataAttribute = useCallback((node: HTMLElement) => {
    if (node.hasAttribute && node.hasAttribute("title")) {
      const title = node.getAttribute("title");
      if (title) {
        node.setAttribute("data-original-title", title);
        node.removeAttribute("title");
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.hasAttribute("data-original-title")) {
        const title = target.getAttribute("data-original-title");
        if (title) {
          showTooltip(event as unknown as React.MouseEvent, title);
        }
      }
    },
    [showTooltip],
  );

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.hasAttribute("data-original-title")) {
        currentTarget.current = target;
        target.addEventListener("mousemove", handleMouseMove);
      }
    };

    const handleMouseOut = () => {
      if (currentTarget.current) {
        currentTarget.current.removeEventListener("mousemove", handleMouseMove);
        currentTarget.current = null;
      }
      hideTooltip();
    };

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              replaceTitleWithDataAttribute(element);
              element
                .querySelectorAll<HTMLElement>("[title]")
                .forEach(replaceTitleWithDataAttribute);
            }
          });
        } else if (
          mutation.type === "attributes" &&
          mutation.attributeName === "title"
        ) {
          const target = mutation.target as HTMLElement;
          replaceTitleWithDataAttribute(target);
        }
      }
    });

    document
      .querySelectorAll<HTMLElement>("[title]")
      .forEach(replaceTitleWithDataAttribute);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["title"],
    });

    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      observer.disconnect();
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, [replaceTitleWithDataAttribute, handleMouseMove, hideTooltip]);

  return null;
}

export default CustomTooltipWrapper;
