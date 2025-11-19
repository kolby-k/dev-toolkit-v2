import TextCompareInputs from "./TextCompareInputs";
import TextCompareResults from "./TextCompareResults";

// Main logic for comparison, manages state, renders children ui, and runs compare logic
function TextCompare() {
  return (
    <div>
      <TextCompareInputs />
      <TextCompareResults />
    </div>
  );
}

export default TextCompare;
