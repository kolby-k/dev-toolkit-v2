import { useState } from "react";

export interface CustomCheckboxProps {
  onChange: (isSelected: boolean) => void;
  initialValue: boolean;
  label?: string;
}
function CustomCheckbox({
  onChange,
  initialValue,
  label,
}: CustomCheckboxProps) {
  const [isSelected, setIsSelected] = useState<boolean>(initialValue);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onChange(!isSelected);
  };

  return (
    <div className="custom-checkbox-wrapper">
      {label && <label className="custom-checkbox-label">{label}</label>}
      <input
        id="custom-checkbox-input"
        type="checkbox"
        checked={isSelected}
        onChange={handleClick}
      />
    </div>
  );
}

export default CustomCheckbox;
