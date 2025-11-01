import { Link } from "react-router";
import type { ToolItem } from "../constants";
import Tag from "./Tag";

export interface ToolCardProps {
  tool: ToolItem;
}

function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="gradient-card tool-card">
      <Link to={tool.href} className="tool-card-link">
        <h5>{tool.label} </h5>
        <p className="description">{tool.description}</p>
        <div className="flex-row-container sm-margin">
          {tool.category.map((c) => (
            <Tag
              label={c}
              variant={c === "frontend" ? "primary" : "secondary"}
            />
          ))}
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;
