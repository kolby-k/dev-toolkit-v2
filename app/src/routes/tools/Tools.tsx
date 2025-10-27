import { Link, useSearchParams } from "react-router";
import { IoMdClose } from "react-icons/io";
import "../../styles/Tools.css";
import useSearchFilter from "../../hooks/useSearchFilter";
import CustomButton from "../../components/CustomButton";
import { RxCrossCircled } from "react-icons/rx";

function Tools() {
  const { setUserSearchInput, userSearchInput, categoryParam, filteredTools } =
    useSearchFilter();

  const [, setSearchParams] = useSearchParams();

  const resetParams = () => {
    return setSearchParams();
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
          {categoryParam && (
            <div className="category-filter">
              <label>Category:</label>
              <CustomButton
                title={categoryParam}
                variant="primary"
                onClick={resetParams}
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
              return (
                <Link key={`t-${idx}`} to={t.href} className="card">
                  <h6>{t.label} </h6>
                  <p>{t.description}</p>
                  <p>{t.category.join(", ")}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Tools;
