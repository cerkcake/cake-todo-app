import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TodoForm from "./TodoForm";
import TodoListItem from "./TodoListItem";
import Filter from "./Filter";
import "../styles/TodoListContainer.css";
import { API_URL } from "../Config";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  getTodos: GetTodos;
};

const TodoListContainer = ({ todos, setTodos, getTodos }: Props) => {
  const [input, setInput] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const onAdded = (input: string) => {
    const data = JSON.stringify({
      id: uuidv4(),
      title: input,
      completed: false,
    });
    console.log(data);

    const config = {
      method: "post",
      url: "http://localhost:3001/todos",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onCompleted = (item: Todo) => {
    const data = JSON.stringify({
      completed: !item.completed,
    });

    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${API_URL}/todos/${item.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleted = (id: string) => {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${API_URL}/todos/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEdited = (id: string, newTitle: string) => {
    let data = JSON.stringify({
      title: newTitle,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${API_URL}/todos/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let filteredTodosToUpdate = [...todos];
    if (selectedFilter === "All") {
      setFilteredTodos(todos);
    }
    if (selectedFilter === "Done") {
      filteredTodosToUpdate = todos.filter((todo) => todo.completed === true);
    }
    if (selectedFilter === "Active") {
      filteredTodosToUpdate = todos.filter((todo) => todo.completed === false);
    }
    setFilteredTodos(filteredTodosToUpdate);
  }, [selectedFilter, todos]);

  useEffect(() => {
    setInput("");
  }, [todos]);

  return (
    <div>
      <div className="header">
        <h1>Tasks</h1>
        <Filter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>
      {filteredTodos.map((filteredTodo) => (
        <TodoListItem
          key={filteredTodo.id}
          filteredTodo={filteredTodo}
          onDeleted={onDeleted}
          onEdited={onEdited}
          onCompleted={onCompleted}
        />
      ))}

      <TodoForm inputValue={input} setInput={setInput} selectedFunc={onAdded} />
    </div>
  );
};

export default TodoListContainer;
