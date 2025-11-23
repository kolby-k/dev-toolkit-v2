import React, { useLayoutEffect, useRef, useState } from "react";
import { IoChevronDownCircle, IoChevronUpCircle } from "react-icons/io5";

interface ExpandableDescriptionProps {
  children: React.ReactNode;
  title?: string;
}

function ExpandableDescription({
  children,
  title,
}: ExpandableDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [canCollapse, setCanCollapse] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    const c = containerRef.current;
    if (!el || !c) return;

    // measure full natural height
    const fullHeight = el.scrollHeight;
    console.log("content height: ", fullHeight);

    const containerHeight = c.scrollHeight;
    console.log("container height: ", containerHeight);

    // if it's taller than our threshold -> enable collapsing
    setCanCollapse(fullHeight > containerHeight);
  }, [children, expanded]);

  const handleExpandDescription = () => {
    setExpanded(true);
  };
  const handleCollapseDescription = () => {
    setExpanded(false);
    const el = contentRef.current;
    if (el?.scrollTop) el.scrollTop = 0;
    return;
  };

  const isCollapsedView = canCollapse && !expanded;

  return (
    <div ref={containerRef} className={`edw-shared`}>
      <div
        ref={contentRef}
        className={
          isCollapsedView
            ? "collapsed-description webkit-mask-bottom"
            : "expanded-description"
        }
      >
        <h4 className="edw-title">{title}</h4>
        {children}
      </div>

      {canCollapse && (
        <span className="chevron-icon-shared">
          {expanded ? (
            <IoChevronUpCircle
              onClick={handleCollapseDescription}
              className="chevron-icon expanded-chevron-icon"
            />
          ) : (
            <IoChevronDownCircle
              onClick={handleExpandDescription}
              className="chevron-icon"
            />
          )}
        </span>
      )}
    </div>
  );
}

export default ExpandableDescription;
