import React, { userState } from "react";
import { TodoForm } from "./TodoForm";

export const TodoWrapper = () => {
  const [todo, setTodo] = userState([]);

  const addTodo = (todo) => {
    setTodo();
  };
  return (
    <div className="TodoWrapper">
      <TodoForm>addTodo</TodoForm>
    </div>
  );
};
