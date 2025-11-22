export interface ToolHeaderProps {
  title: string;
  description: string;
}

function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div id="tool-header-wrapper">
      <h3 id="tool-header-title">{title}</h3>
      <p id="tool-header-description">{description}</p>
    </div>
  );
}

export default ToolHeader;
