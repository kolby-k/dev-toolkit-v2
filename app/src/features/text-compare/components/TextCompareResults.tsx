import { useState } from "react";
import CustomTextArea from "../../../shared/components/textArea/CustomTextArea";

function TextCompareResults() {
  const [textA, setTextA] = useState<string>("");
  const [textB, setTextB] = useState<string>("");

  return (
    <div>
      <div>
        <h6>Text 1 Result</h6>
        <CustomTextArea text={textA} setText={setTextA} />
      </div>
      <h6>Text 2 Result</h6>
      <CustomTextArea text={textB} setText={setTextB} />
    </div>
  );
}

export default TextCompareResults;
