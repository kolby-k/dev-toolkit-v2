import { useState } from "react";
import CurrentUnixTime from "./CurrentUnixTime";
import UnixInputTime from "./UnixInputTime";

import styles from "../styles/unixTimestamp.module.css";
import CustomCheckbox from "../../../shared/components/ui/CustomCheckbox";
import ReadableInputTime from "./ReadableInputTime";
import CustomDivider from "../../../shared/components/ui/CustomDivider";

// TODO:
// - Show time in MS as UTC; unix epoch probably shouldnt be local MS ?
// - fix the month input since it is zero indexed; user input 12 should display 12 but internally save 11.
// - confirm logic for all children is correct for true unix epoch timestamps
// - improve the design.. UI and UX
function UnixTimestampConversions() {
  const [isMs, setIsMs] = useState<boolean>(false);

  return (
    <section className={styles.toolSectionWrapper}>
      <CustomCheckbox
        label="Display in milliseconds"
        initialValue={isMs}
        onChange={(isSelected) => setIsMs(isSelected)}
      />
      <CurrentUnixTime isMs={isMs} />
      <CustomDivider width="50%" />
      <UnixInputTime isMs={isMs} />
      <CustomDivider width="75%" />
      <ReadableInputTime isMs={isMs} />
    </section>
  );
}

export default UnixTimestampConversions;
