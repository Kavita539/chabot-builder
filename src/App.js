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
import ChatBotFlowBuilder from './pages/ChatBotFlowBuilder';

export default function App() {



  return (
    <ChatBotFlowBuilder />
  );
}
