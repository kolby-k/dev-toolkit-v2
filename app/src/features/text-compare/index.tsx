import CustomTextArea from "../../shared/components/textArea/CustomTextArea";
//import TextCompare from "./components/TextCompare";

import styles from "./styles/textCompare.module.css";

function index() {
  return (
    <div className={styles.page}>
      {/* <TextCompare /> */}
      <CustomTextArea />
    </div>
  );
}

export default index;
