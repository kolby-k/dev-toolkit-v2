import type { DateTimeInputValue } from "../../../features/unix-timestamp/lib/times";

export interface CustomDateTimeInputProps {
  value: DateTimeInputValue;
  onChange: (newValue: DateTimeInputValue) => void;
}

function CustomDateTimeInput({ value, onChange }: CustomDateTimeInputProps) {
  // html element id is equal to key to update
  const handleSetUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateTime = e.target?.value;
    const id = e.target.id;
    if (!newDateTime || !id) return;

    return onChange({ ...value, [id]: newDateTime });
  };

  return (
    <div className="date-time-input-wrapper">
      {value &&
        Object.entries(value).map(([k, v]) => {
          return (
            <div id={`${k}`} className="date-time-input-value-container">
              <label className="date-time-input-label">{k}</label>
              <input
                type="text"
                value={v}
                onChange={handleSetUserInput}
                className="date-time-input-value"
                id={`${k}`}
              />
            </div>
          );
        })}
    </div>
  );
}

export default CustomDateTimeInput;
