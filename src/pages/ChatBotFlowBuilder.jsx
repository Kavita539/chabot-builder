import React, { useState, useRef, useCallback } from "react";
import { ReactFlow, useReactFlow } from "@xyflow/react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  ReactFlowProvider,
  MiniMap,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import styles from "./chatBotFlowBuilder.module.css";
import SettingsPanel from "../components/settingsPanel/SettingsPanel";
import SideBar from "../components/sideBar/SideBar";
import TextNode from "../components/textNode/TextNode";
import { useWindowSize } from "../hooks/useWindowHook";

const ChatBotFlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const { width } = useWindowSize();
  const isMobile = width <= 1140;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const nodeTypes = { textNode: TextNode };
  let id = 1;
  const getId = () => `node_${id++}`;

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const sourceHasEdge = eds.some((edge) => edge.source === params.source);
        if (sourceHasEdge) {
          showNotification(
            "A source handle can only have one outgoing connection.",
            "error"
          );
          return eds;
        }
        return addEdge(params, eds);
      });
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      let position = { x: 0, y: 0 };
      if (typeof reactFlowInstance.project === "function") {
        position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
      } else {
        position = {
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        };
      }

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `text message` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          selected: n.id === node.id,
        }))
      );
    },
    [setNodes]
  );

  const clearSelection = () => {
    setSelectedNode(null);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: false,
      }))
    );
  };

  const updateNode = (id, data) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const saveFlow = () => {
    if (nodes.length > 1) {
      const targetNodes = new Set(edges.map((edge) => edge.target));
      const nodesWithEmptyTargets = nodes.filter(
        (node) => !targetNodes.has(node.id)
      );

      if (nodesWithEmptyTargets.length > 1) {
        showNotification(
          "Cannot save flow: More than one node has an empty target.",
          "error"
        );
        return;
      }
    }
    showNotification("Flow saved successfully!", "success");
  };

  return (
    <div className={styles.wrapper}>
      {notification.show && (
        <div
          className={`${styles.notification} ${
            notification.type === "success" ? styles.success : styles.error
          }`}
        >
          {notification.message}
        </div>
      )}
      <header className={styles.header}>
        <button onClick={saveFlow} className={styles.saveButton}>
          Save Changes
        </button>
      </header>
      <div
        className={`${styles.content} ${isMobile ? styles.mobileContent : ""}`}
      >
        <ReactFlowProvider>
          <div className={styles.reactFlowWrapper} ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              onPaneClick={clearSelection}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
          <div
            className={`${styles.panel} ${isMobile ? styles.mobilePanel : ""}`}
          >
            {selectedNode ? (
              <SettingsPanel
                node={selectedNode}
                updateNode={updateNode}
                clearSelection={clearSelection}
              />
            ) : (
              <SideBar />
            )}
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default ChatBotFlowBuilder;
