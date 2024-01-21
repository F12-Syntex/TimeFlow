import TagItem from "../../../express/src/types/TagItem";

export const getTags = (setTagList: (tagList: TagItem[]) => void) => {
  fetch("http://localhost:3000/api/sample/tags")
    .then((response) => response.json())
    .then((data) => {
      // Check if data.tags is an array
      if (Array.isArray(data.tags)) {
        // Manipulate the data to get TagItem array
        const parsedTagList: TagItem[] = data.tags.map((tag: any) => ({
          name: tag.name,
          _id: tag._id,
        }));
        setTagList(parsedTagList);
      } else {
        console.error("Invalid data format for tags");
      }
    })
    .catch((error) => {
      console.error("Error fetching tags:", error);
    });
};

export const getLoginStatus = async (
  setIsLoggedIn: (isLoggedIn: boolean) => void
) => {
  try {
    const response = await fetch("http://localhost:3000/api/get-login-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setIsLoggedIn(data.cookie[0].value !== null && data.cookie[0].value !== "");
  } catch (error) {
    console.error("Error:", error);
    setIsLoggedIn(false);
  }
};
