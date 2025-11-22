import React, { useState } from "react";
import { IoChevronDownCircle, IoChevronUpCircle } from "react-icons/io5";

function ExpandableDescription({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={`edw-shared ${
        expanded
          ? "expanded-description-wrapper"
          : "collapsed-description-wrapper"
      }`}
    >
      <div
        className={`${
          expanded ? "" : "webkit-mask-bottom collapsed-description"
        }`}
      >
        {children}
      </div>
      <span onClick={() => setExpanded((prev) => !prev)}>
        {expanded ? (
          <IoChevronUpCircle className="expanded-description-icon chevron-icon-shared" />
        ) : (
          <IoChevronDownCircle className="collapsed-description-icon chevron-icon-shared" />
        )}
      </span>
    </div>
  );
}

export default ExpandableDescription;
