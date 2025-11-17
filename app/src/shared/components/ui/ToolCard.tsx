import { Link } from "react-router";
import type { ToolCategoryTypes, ToolItem } from "../../../config/constants";
import Tag, { type TagVariantTypes } from "./Tag";
import resetScrollOnRedirect from "../../lib/resetWindowScroll";

export interface ToolCardProps {
  tool: ToolItem;
}

function ToolCard({ tool }: ToolCardProps) {
  function getTagVariantByCategory(category: ToolCategoryTypes) {
    let tagVariant;
    switch (category) {
      case "utility":
        tagVariant = "primary";
        break;
      case "design":
        tagVariant = "secondary";
        break;
      case "security":
        tagVariant = "tertiary";
        break;
      default:
        tagVariant = "misc";
        break;
    }
    return tagVariant as TagVariantTypes;
  }

  // force window to scroll to top when redirecting to new page (50ms delay for smoother transition)
  const onRedirect = async () => {
    await resetScrollOnRedirect(50);
  };

  return (
    <div className="gradient-card tool-card">
      <Link to={tool.href} onClick={onRedirect} className="tool-card-link">
        <h5>{tool.label} </h5>
        <p className="description">{tool.description}</p>
        <div className="flex-row-container sm-margin">
          {tool.category.map((c) => (
            <Tag label={c} variant={getTagVariantByCategory(c)} />
          ))}
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;
