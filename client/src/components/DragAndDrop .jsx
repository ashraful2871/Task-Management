import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  { id: "1", content: "📌 Task 1" },
  { id: "2", content: "✅ Task 2" },
  { id: "3", content: "🚀 Task 3" },
];

const DragAndDrop = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedItem);

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>i am home</h2>
    </div>
  );
};

export default DragAndDrop;
