import React from "react";

import styles from "./textNode.module.css";
import { Handle, Position } from "@xyflow/react";

// Custom TextNode component
const TextNode = ({ data, isConnectable, selected }) => {
  return (
    <div
      style={{
        border: `1px solid ${selected ? "#6e41e2" : "#ddd"}`,
      }}
      className={styles.textNodeContainer}
    >
      {/* Node Header */}
      <div className={styles.header}>
        <span>💬 Send Message</span>
        <span className={styles.headerIcon}>📱</span>
      </div>
      {/* Node Body */}
      <div className={styles.nodeBody}>{data.label || "Text message"}</div>
      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        className={styles.handle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        className={styles.handle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextNode;
