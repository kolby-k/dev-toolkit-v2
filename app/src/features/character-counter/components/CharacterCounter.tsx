import { useState } from "react";

import CharacterCounterStats from "./CharacterCounterStats";
import CustomTextArea from "../../../shared/components/ui/CustomTextArea";
import "../styles/CharacterCounter.css";

function CharacterCounter() {
  const [text, setText] = useState<string>("");

  return (
    <section id="character-counter-section">
      <CharacterCounterStats text={text} />
      <CustomTextArea text={text} setText={setText} />
    </section>
  );
}

export default CharacterCounter;
