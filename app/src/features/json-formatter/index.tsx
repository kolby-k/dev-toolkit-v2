import ToolHeader from "../../shared/components/ui/ToolHeader";
import JsonFormatter from "./components/JsonFormatter";

function index() {
  return (
    <div id="tool-full-page">
      <ToolHeader
        title="JSON Formatter"
        description="Paste your JSON below to easily format, validate, and copy it — or try with sample JSON instead."
      />
      <JsonFormatter />
    </div>
  );
}

export default index;
