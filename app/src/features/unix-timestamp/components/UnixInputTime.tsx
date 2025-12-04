import { useEffect, useState } from "react";
import CustomButton from "../../../shared/components/ui/CustomButton";
import { convertUnixMsToDate, readableDateTime } from "../lib/times";

import styles from "../styles/unixTimestamp.module.css";

export interface UnixInputTimeProps {
  isMs: boolean;
}

type readableTime = {
  local: string;
  utc: string;
};

// useEffect ensures the userInput value matches the specified units, either S or MS.
// When converting to readable time, the userInput needs to be in MS for time conversion.
function UnixInputTime({ isMs }: UnixInputTimeProps) {
  const [userInput, setUserInput] = useState<number>(0);
  const [placeholderTime, setPlacecholderTime] = useState<number | null>(null);
  const [readableTime, setReadableTime] = useState<null | readableTime>(null);

  const handleSetUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValueString = e.target?.value || "0";
    const newValue = parseInt(newValueString);

    setUserInput(newValue);
  };

  const handleConversion = () => {
    if (!userInput) return;
    const valueInMs = isMs ? userInput : userInput * 1000;
    const localDateFormat = convertUnixMsToDate(valueInMs);
    // local time in a readable format and in UTC
    const readableDate = readableDateTime(localDateFormat);
    const utcDate = readableDateTime(localDateFormat, "UTC");
    setReadableTime({ local: readableDate, utc: utcDate });
  };

  useEffect(() => {
    if (isMs) {
      setUserInput((prev) => (prev ? prev * 1000 : 0));
      setPlacecholderTime(Date.now());
    } else {
      setUserInput((prev) => (prev ? Math.round(prev / 1000) : 0));
      setPlacecholderTime(Math.round(Date.now() / 1000));
    }
  }, [isMs]);

  return (
    <div className={`${styles.unixInputSection} ${styles.col}`}>
      <label className={styles.label}>Unix Epoch to Readable Date</label>
      <input
        type="text"
        value={userInput ? userInput : ""}
        onChange={handleSetUserInput}
        className={styles.unixInput}
        placeholder={placeholderTime?.toString()}
      />
      <CustomButton
        title="Convert to Date"
        variant="primary"
        onClick={handleConversion}
        style={{ marginTop: "10px" }}
      />
      {readableTime && (
        <span className={styles.readableResultContainer}>
          <p className={styles.resultLabelLocal}>Local Datetime:</p>
          <p className={styles.resultValueLocal}>{readableTime.local}</p>
          <p className={styles.resultLabelUTC}>UTC Datetime:</p>
          <p className={styles.resultValueUTC}>{readableTime.utc}</p>
        </span>
      )}
    </div>
  );
}

export default UnixInputTime;
