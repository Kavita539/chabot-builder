import React from "react";
import styles from "./textNode.module.css";

// Custom TextNode component
const TextNode = ({ data, id }) => {
  return (
    <div className={styles.textNodeContainer}>
      <div className={styles.header}>
        <div className={styles.title}>Send Message</div>
        <div className={styles.platform}>WhatsApp</div>
      </div>
      <div className={styles.label}>{data.label}</div>
      {/* add source handle & taget handle */}
      <div
        id={`source_${id}`}
        className={`${styles.handle} ${styles.handleSource}`}
      />
      <div
        id={`target_${id}`}
        className={`${styles.handle} ${styles.handleTarget}`}
      />
    </div>
  );
};

export default TextNode;
