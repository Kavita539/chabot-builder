import React, { useState, useEffect } from "react";

import styles from "./settingsPanel.module.css";

const SettingsPanel = ({ node, updateNode, clearSelection }) => {
  const [text, setText] = useState(node.data.label);

  useEffect(() => {
    setText(node.data.label);
  }, [node]);

  const handleChange = (evt) => {
    const newText = evt.target.value;
    setText(newText);
    updateNode(node.id, { label: newText });
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.header}>
        <button onClick={clearSelection} className={styles.backButton}>
          ←
        </button>
        Message Settings
      </div>
      <label className={styles.label}>Text:</label>
      <textarea
        rows="5"
        value={text}
        onChange={handleChange}
        className={styles.textarea}
      />
    </aside>
  );
};

export default SettingsPanel;
