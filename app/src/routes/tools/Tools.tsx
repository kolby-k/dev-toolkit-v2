import { useSearchParams } from "react-router";
import { IoMdClose } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

import useSearchFilter from "../../hooks/useSearchFilter";
import CustomButton from "../../components/CustomButton";

import "../../styles/Tools.css";
import ToolCard from "../../components/ToolCard";

function Tools() {
  const {
    setUserSearchInput,
    userSearchInput,
    categoryParam,
    stackParam,
    filteredTools,
  } = useSearchFilter();

  const [, setSearchParams] = useSearchParams();

  // Resets only the paramLabel provided, keeping the other param as an active filter
  const resetParams = (paramLabel: "stack" | "category") => {
    if (paramLabel === "stack" && categoryParam) {
      setSearchParams({ category: categoryParam });
    } else if (paramLabel === "category" && stackParam) {
      setSearchParams({ stack: stackParam });
    } else {
      setSearchParams();
    }
  };
  return (
    <div className="page-wrapper">
      <div className="tool-section">
        <div className="input-container gradient-card">
          <h3>Tool Search</h3>
          <div className="search-container">
            <input
              type="text"
              value={userSearchInput ?? ""}
              onChange={(e) => setUserSearchInput(e.target.value)}
              id="search-input"
            />
            {!!userSearchInput.length && (
              <RxCrossCircled
                onClick={() => setUserSearchInput("")}
                id="clear-search"
              />
            )}
          </div>
          {stackParam && (
            <div className="category-filter">
              <label>Filter:</label>
              <CustomButton
                title={stackParam}
                variant="primary"
                onClick={() => resetParams("stack")}
                fontSize={0.9}
                style={{
                  padding: "0.5rem 0.75rem",
                  minHeight: 30,
                  fontWeight: 400,
                  gap: "0.5rem",
                }}
              >
                <IoMdClose size={18} />
              </CustomButton>
            </div>
          )}
          {categoryParam && (
            <div className="category-filter">
              <label>Category:</label>
              <CustomButton
                title={categoryParam}
                variant="secondary"
                onClick={() => resetParams("category")}
                fontSize={0.9}
                style={{
                  padding: "0.5rem 0.75rem",
                  minHeight: 30,
                  fontWeight: 400,
                  gap: "0.5rem",
                }}
              >
                <IoMdClose size={18} />
              </CustomButton>
            </div>
          )}
        </div>

        <div className="tool-list">
          {filteredTools &&
            filteredTools.map((t, idx) => {
              return <ToolCard tool={t} key={`tool-${idx}`} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Tools;
