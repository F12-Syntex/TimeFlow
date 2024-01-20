import { useEffect } from "react";
import TodoItemWithTags from "../../../../express/src/types/TodoItemWithTags";
import TagItem from "../../../../express/src/types/TagItem";
import { getWebSocketInstance } from "../websocket";

function useFetchSearchWebSocket(
  searchTerm: string,
  setTodoList: (todoList: TodoItemWithTags[]) => void,
  setTagList: (tagList: TagItem[]) => void
) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    // Set up event listener for when the socket is opened
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    // Set up event listener for incoming messages
    socket.addEventListener("message", (event) => {
      try {
        // Parse the received data as JSON
        const updatedData = JSON.parse(event.data);

        // Extract the tasks array from the received data
        const tasks = updatedData?.tasks || [];

        // Convert each task to TodoItemWithTags format
        const updatedTodoList: TodoItemWithTags[] = tasks
          .map(
            (task: TodoItemWithTags) => ({
              user: task.user,
              title: task.title,
              description: task.description,
              date: new Date(task.date),
              priority: task.priority,
              labels: task.labels,
              completed: task.completed,
              _id: task._id,
            })
            //   any element of task can be searched
          )
          .filter((task: TodoItemWithTags) => {
            if (task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return true;
            }
            if (
              task.description.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
            if (
              task.labels.some((label: TagItem) =>
                label.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            ) {
              return true;
            }
            return false;
          });

        const tags = updatedData?.tags || [];

        const updatedTagList: TagItem[] = tags.map((tag: TagItem) => ({
          name: tag.name,
          _id: tag._id,
        }));

        console.log(
          "WebSocket message received:",
          updatedTodoList,
          updatedTagList
        );

        // Update the state with the new TodoItemWithTags array
        setTodoList(updatedTodoList);
        setTagList(updatedTagList);
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

export default useFetchSearchWebSocket;
