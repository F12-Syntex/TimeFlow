import { useEffect, useState } from 'react';
import TodoItem from '../../../../express/src/types/TodoItem';
import TagItem from '../../../../express/src/types/TagItem';
import TodoItemWithTags from '../../../../express/src/types/TodoItemWithTags';
import { ObjectId } from 'mongodb';

function useFetchTaskList() {
  const [todoList, setTodoList] = useState<TodoItemWithTags[]>([]);

  useEffect(() => {
    const fetchTaskList = () => {
        fetch("http://localhost:3000/api/sample/tasks")
          .then((response) => response.json())
          .then((data) => {
            const tasks: TodoItem[] = data["tasks"];
            const fetchLabelPromises: Promise<TagItem[]>[] = tasks.map(
              (task: TodoItem) =>
                Promise.all(
                  task.labels.map((labelId: ObjectId) =>
                    fetch(`http://localhost:3000/api/sample/tags/${labelId}`)
                      .then((response) => response.json())
                      .then((labelData: TagItem) => {
                        return labelData;
                      })
                      .catch((error) => {
                        console.error("Error fetching label:", error);
                        return null;
                      })
                  )
                ).then(
                  (labelResults: (TagItem | null)[]) =>
                    labelResults.filter((label) => label !== null) as TagItem[]
                )
            );
    
            Promise.all(fetchLabelPromises)
              .then((labelResults: TagItem[][]) => {
                const updatedTodoList: TodoItemWithTags[] = tasks.map(
                  (task: TodoItem, index: number) => ({
                    user: task.user,
                    title: task.title,
                    description: task.description,
                    date: new Date(task.date),
                    priority: task.priority,
                    labels: labelResults[index],
                    completed: task.completed,
                    _id: task._id,
                  })
                );
                setTodoList(updatedTodoList);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          });
      };

    fetchTaskList();
  }, []);

  return todoList;
}

export default useFetchTaskList;
