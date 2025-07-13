import React, { useState, useRef, useCallback } from 'react';
import { ReactFlow, useReactFlow } from '@xyflow/react';

import {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  ReactFlowProvider,
  MiniMap,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import SettingsPanel from "../components/settingsPanel/SettingsPanel";
import SideBar from "../components/sideBar/SideBar";
import TextNode from "../components/textNode/TextNode";

const ChatBotFlowBuilder = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodeTypes = { textNode: TextNode };
  let id = 1;
  const getId = () => `node_${id++}`;

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
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

      // FIX here: reactFlowInstance.project might not be a function
      // So use useReactFlow hook to get project function, or fallback:
      let position = { x: 0, y: 0 };
      if (typeof reactFlowInstance.project === "function") {
        position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
      } else {
        // fallback: Use raw coords relative to container
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

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const updateNode = (id, data) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  };

  const saveFlow = () => {
    if (nodes.length > 1) {
      const nodesWithoutIncomingEdges = nodes.filter((node) => {
        return !edges.some((edge) => edge.target === node.id);
      });

      if (nodesWithoutIncomingEdges.length > 1) {
        alert("Error: More than one node has an empty target handle.");
      } else {
        alert("Flow saved successfully!");
      }
    } else {
      alert("Flow saved successfully!");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          padding: "10px",
          background: "#f3f3f3",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={saveFlow}
          style={{
            padding: "10px 20px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Flow
        </button>
      </header>
      <div style={{ display: "flex", flexGrow: 1 }}>
        <ReactFlowProvider>
          <div style={{ flexGrow: 1, height: "100%" }} ref={reactFlowWrapper}>
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
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
          {selectedNode ? (
            <SettingsPanel node={selectedNode} updateNode={updateNode} />
          ) : (
            <SideBar />
          )}
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default ChatBotFlowBuilder;
