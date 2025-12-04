import { useState } from "react";

import styles from "../styles/unixTimestamp.module.css";
import CustomButton from "../../../shared/components/ui/CustomButton";
import {
  addPaddedZero,
  getClientUtcOffsetString,
  getCurrentDateTimeString,
  type DateTimeInputValue,
} from "../lib/times";
import CustomDateTimeInput from "../../../shared/components/ui/CustomDateTimeInput";

export interface ReadableInputTimeProps {
  isMs: boolean;
}

function ReadableInputTime({ isMs }: ReadableInputTimeProps) {
  const [userInput, setUserInput] = useState<DateTimeInputValue>(
    getCurrentDateTimeString()
  );
  const [unixTimeMs, setUnixTimeMs] = useState<null | number>(null);
  const [error, setError] = useState<null | string>(null);

  // user input time is always local
  const handleConversion = () => {
    if (!userInput) return;
    setError(null);
    setUnixTimeMs(null);
    // now determine time in unix epoch
    const timeZoneOffset = getClientUtcOffsetString();
    const dateTimeString = `${userInput.year}-${addPaddedZero(
      userInput.month
    )}-${addPaddedZero(userInput.day)}T${addPaddedZero(
      userInput.hour
    )}:${addPaddedZero(userInput.minute)}:${addPaddedZero(
      userInput.second
    )}${timeZoneOffset}`;
    const newUnixTimeMs = new Date(dateTimeString).getTime();
    if (Number.isNaN(newUnixTimeMs)) {
      setError("Error: Invalid date-time provided.");
    } else {
      setUnixTimeMs(newUnixTimeMs);
    }
  };

  // when user changes isMs the display time will update accordingly
  const displayUnix =
    unixTimeMs == null
      ? null
      : isMs
      ? unixTimeMs
      : Math.round(unixTimeMs / 1000);

  return (
    <div className={`${styles.readableInputSection} ${styles.col}`}>
      <label className={styles.label}>Unix Epoch to Readable Date</label>
      <CustomDateTimeInput value={userInput} onChange={setUserInput} />
      <CustomButton
        title="Convert to Timestamp"
        variant="primary"
        onClick={handleConversion}
        style={{ marginTop: "10px" }}
      />
      {displayUnix && (
        <span className={styles.unixResultContainer}>
          <p className={styles.resultLabelLocal}>
            Date as UNIX Epoch Timestamp:
          </p>
          <p className={styles.resultValueLocal}>{displayUnix}</p>
        </span>
      )}
      {error && (
        <span className={styles.unixResultContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </span>
      )}
    </div>
  );
}

export default ReadableInputTime;
