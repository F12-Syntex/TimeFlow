import { useEffect } from "react";
import TodoItemWithTags from "../../../../express/src/types/TodoItemWithTags";
import { getWebSocketInstance } from "../websocket";

function useFetchWebSocket(
  setTodoList: (todoList: TodoItemWithTags[]) => void,
) {
  useEffect(() => {
    const socket = getWebSocketInstance();

    // Set up event listener for when the socket is opened
    socket.addEventListener("open", (event) => {
      // console.log("WebSocket connection opened:", event);
      const message = JSON.stringify({});
      socket.send(message);
    });

    // Set up event listener for incoming messages
    socket.addEventListener("message", (event) => {
      try {
        // Parse the received data as JSON
        const updatedData = JSON.parse(event.data);

        // Extract the tasks array from the received data
        const tasks = updatedData?.tasks || [];

        // Convert each task to TodoItemWithTags format
        const updatedTodoList: TodoItemWithTags[] = tasks.map(
          (task: TodoItemWithTags) => ({
            user: task.user,
            title: task.title,
            description: task.description,
            date: new Date(task.date),
            priority: task.priority,
            labels: task.labels,
            completed: task.completed,
            _id: task._id,
          }),
        );

        // console.log("WebSocket message received:", updatedTodoList);

        // Update the state with the new TodoItemWithTags array
        setTodoList(updatedTodoList);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);
}

export default useFetchWebSocket;
