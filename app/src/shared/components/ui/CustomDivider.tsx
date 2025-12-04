export interface CustomDividerProps {
  width?: string;
}

function CustomDivider({ width = "100%" }: CustomDividerProps) {
  return <hr style={{ width }} className="base-style-divider"></hr>;
}

export default CustomDivider;
