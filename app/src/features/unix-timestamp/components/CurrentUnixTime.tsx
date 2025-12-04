import { useEffect, useState } from "react";
import { currentUnixTime } from "../lib/times";
import { IoCopyOutline } from "react-icons/io5";

import styles from "../styles/unixTimestamp.module.css";

export interface CurrentUnixTimeProps {
  isMs: boolean;
}
// Display current time in Milliseconds or Seconds based on boolean parameter
function CurrentUnixTime({ isMs }: CurrentUnixTimeProps) {
  const [current, setCurrent] = useState<number>(() => currentUnixTime(isMs));

  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // set current time immediately when units changes
    setCurrent(currentUnixTime(isMs));

    // initialize a 1 second interval to display LIVE time
    const tick = setInterval(() => {
      // manually add time to ensure consistent display incrementing
      // otherwise timeout will cause a couple MS delay that skews display value
      setCurrent((prev) => prev + (isMs ? 1000 : 1));
    }, 1000);

    return () => clearInterval(tick);
  }, [isMs]);

  const handleCopy = () => {
    // if copied return early to effectively 'disable' while animation is running
    if (copied) return;
    setCopied(true);
    navigator.clipboard.writeText(current.toString());
  };

  // apply copy animation for 1 second
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [copied]);

  return (
    <div className={styles.currentTimeSection}>
      <label className={styles.label}>Current Unix Time</label>
      <span className={styles.currentTimeValueContainer}>
        <p className={styles.value}>{current}</p>
        <IoCopyOutline
          onClick={handleCopy}
          className={`${styles.copyIcon} ${copied ? "copy-success" : ""}`}
        />
      </span>
    </div>
  );
}

export default CurrentUnixTime;
