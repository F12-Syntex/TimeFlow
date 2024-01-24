import { useEffect } from "react";
import TagItem from "express/src/types/TagItem";

function useFetchTagsWebSocket(setTagList: (tagList: TagItem[]) => void) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

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
        const tags = updatedData?.tags || [];

        // Convert each task to TagItem format
        const updatedTagList: TagItem[] = tags.map((tag: TagItem) => ({
          user: tag.user,
          name: tag.name,
          _id: tag._id,
        }));

        // console.log("WebSocket message received:", updatedTagList);

        // Update the state with the new TagItem array
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

export default useFetchTagsWebSocket;
