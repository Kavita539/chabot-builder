import React from 'react';

import styles from './sideBar.module.css';

// Sidebar component for Nodes Panel
const SideBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.panelTitle}>Nodes Panel</div>
      <div
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
        className={styles.nodeItem}
      >
        <span>Message</span>
      </div>
    </aside>
  );
};

export default SideBar;
