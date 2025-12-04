import styles from "./styles/unixTimestamp.module.css";

import ToolHeader from "../../shared/components/ui/ToolHeader";
import UnixTimestampConversions from "./components/UnixTimestampConversions";

// 1. What is the current unix epoch time in MS? (display)
// 2. Allow users input of unix epoch time, show if it is MS or S.
// 2b. Button to display that value in local and UTC and relative time.
// 3. Allow user to chooses current datetime in readable format (e.g. YYYY-MM-DD hh-mm-ss).
// 3b. Button to convert the value into unix epoch MS

// display time in output as unix epoch MS, local, UTC, and relative difference from now.
// - What is the relative difference between the current time and the users input? (in s, min, hour, days)
function index() {
  return (
    <div className={styles.page}>
      <ToolHeader
        title="UNIX Timestamp Converter"
        description="Convert UNIX epoch time in seconds or milliseconds, into human readable date formats"
      />
      <UnixTimestampConversions />
    </div>
  );
}

export default index;
