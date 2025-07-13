# 🤖 Chatbot Flow Builder

A drag-and-drop interface for visually designing chatbot message flows using **React** and **@xyflow/react** (React Flow). This tool allows users to connect messages using nodes and edges, manage flow validation, and easily extend node types in the future.

---

## 📚 Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Component Overview](#component-overview)
- [Project Structure](#project-structure)
- [CSS Modules](#css-modules)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)

---

## 🔗 Live Demo
👉 [Click here to try the Chatbot Flow Builder]([https://your-hosting-url.com](https://chabot-builder.vercel.app/))

---

## ✅ Features

### 1. **Text Node**
- Represents a basic chatbot message.
- Multiple text nodes can exist in a single flow.
- Nodes are draggable from the **Nodes Panel**.

### 2. **Nodes Panel**
- Displays all node types supported by the flow builder.
- Currently only includes a **Text Node**, but designed to be extensible for future types.

### 3. **Edge (Connection)**
- Connects a node’s source handle to another node’s target handle.
- Represents the flow between chatbot messages.

### 4. **Source Handle**
- Each node can have only **one outgoing edge**.
- Prevents circular or multiple flow branches from the same point.

### 5. **Target Handle**
- Accepts **multiple incoming edges**.
- Useful for merging flow branches into a single destination node.

### 6. **Settings Panel**
- Appears when a node is selected.
- Allows editing the label of the selected **Text Node**.
- Automatically replaces the **Nodes Panel** during node selection.

### 7. **Save Button**
- Triggers validation and saves the current node/edge layout.
- **Validation logic:**
  - If there are multiple nodes,
  - And more than one node has **no outgoing edge**,
  - Then an **error** is shown.
- On success, shows a confirmation message and logs flow data.

---

## 🧩 Component Overview

| Component          | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `ChatBotFlowBuilder` | Main page component, contains logic for node state, edge connection, layout |
| `TextNode`         | Custom node component used in flow                                          |
| `SideBar`          | Left panel with draggable nodes (appears when no node is selected)          |
| `SettingsPanel`    | Appears when a node is selected, allows editing its content                 |
| `useWindowHook`    | Hook to manage responsive behavior                                          |

---

## 🗂 Project Structure
src/
├── components/
│ ├── textNode/
│ │ ├── TextNode.jsx
│ │ └── textNode.module.css
│ ├── sideBar/
│ │ ├── SideBar.jsx
│ │ └── sideBar.module.css
│ └── settingsPanel/
│ ├── SettingsPanel.jsx
│ └── settingsPanel.module.css
│
├── pages/
│ ├── ChatBotFlowBuilder.jsx
│ └── ChatBotFlowBuilder.module.css
│
├── hooks/
│ └── useWindowHook.js

---

## 🎨 CSS Modules

All components use **CSS Modules** to ensure scoped, reusable, and maintainable styles.

| Component         | CSS Module                      |
|------------------|----------------------------------|
| ChatBotFlowBuilder | `ChatBotFlowBuilder.module.css` |
| TextNode         | `TextNode.module.css`           |
| SideBar          | `SideBar.module.css`            |
| SettingsPanel    | `SettingsPanel.module.css`      |

This ensures that styles are encapsulated and won't clash between components.

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Kavita539/chatbot-builder.git
cd chatbot-builder
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start the Development Server
```bash
npm run start
```
---

## ▶️ Usage

1. **Drag** a **Message Node** from the **Nodes Panel** into the canvas.
2. **Click** on a node to edit its label via the **Settings Panel**.
3. **Connect** nodes by dragging from a **source handle** to a **target handle**.
4. **Press** the **Save Changes** button to validate and save the flow.
5. ⚠️ **Validation Rule:**  
   If multiple nodes are **disconnected** (i.e., have no outgoing edge), the **flow cannot be saved**. Only one disconnected node is allowed.

---

## 🛠 Tech Stack

| Technology        | Purpose                                      |
|------------------|----------------------------------------------|
| **React**         | Building the user interface                  |
| **@xyflow/react** | Visual flow editor for drag-and-drop nodes   |
| **CSS Modules**   | Scoped styling for React components          |
| **JavaScript (ES6+)** | App logic, state management, interactions |
| **Custom React Hooks** | Responsive behavior (e.g., window size detection) |



