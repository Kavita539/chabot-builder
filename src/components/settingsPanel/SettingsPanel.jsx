import React, { useState } from "react";

import styles from "./settingsPanel.module.css";

// SettingsPanel component
const SettingsPanel = ({ node, updateNode }) => {
  const [text, setText] = useState(node.data.label);

  const handleChange = (e) => {
    setText(e.target.value);
    updateNode(node.id, { label: e.target.value });
  };

  return (
    <aside className={styles.settingsContainer}>
      <div className={styles.title}>Settings Panel</div>
      <label>Text:</label>
      <textarea
        rows="4"
        value={text}
        onChange={handleChange}
        className={styles.textarea}
      />
    </aside>
  );
};

export default SettingsPanel;
