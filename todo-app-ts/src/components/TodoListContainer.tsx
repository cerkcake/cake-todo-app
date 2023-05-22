import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TodoForm from "./TodoForm";
import TodoListItem from "./TodoListItem";
import Filter from "./Filter";
import "../styles/TodoListContainer.css";
import { API_URL } from "../Config";

type Props = {
  todos: Todo[];
  getTodos: GetTodos;
  isOpenFilter: boolean;
  setIsOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openSelectorId: string;
  setOpenSelectorId: React.Dispatch<React.SetStateAction<string>>;
};

const TodoListContainer = ({
  todos,
  getTodos,
  isOpenFilter,
  setIsOpenFilter,
  openSelectorId,
  setOpenSelectorId,
}: Props) => {
  const [titleToAdd, setTitleToAdd] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [disableCheckedId, setDisableCheckedId] = useState("");

  const onAdded = (newTitle: string) => {
    const data = JSON.stringify({
      id: uuidv4(),
      title: newTitle,
      completed: false,
    });
    console.log(data);

    const config = {
      method: "post",
      url: `${API_URL}/todos`,
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
  const onCompleted = (todo: Todo) => {
    setDisableCheckedId(todo.id);
    const data = JSON.stringify({
      completed: !todo.completed,
    });

    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${API_URL}/todos/${todo.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        getTodos();
        setDisableCheckedId("");
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

  const onSelected = (selectedId: string) => {
    if (selectedId === openSelectorId) {
      setOpenSelectorId("");
    } else {
      setOpenSelectorId(selectedId);
    }
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
    setTitleToAdd("");
  }, [todos]);

  return (
    <div>
      <div className="header">
        <h1>Tasks</h1>
        <Filter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          isOpenFilter={isOpenFilter}
          setIsOpenFilter={setIsOpenFilter}
          setOpenSelectorId={setOpenSelectorId}
        />
      </div>
      {filteredTodos.map((filteredTodo) => (
        <TodoListItem
          key={filteredTodo.id}
          filteredTodo={filteredTodo}
          onDeleted={onDeleted}
          onEdited={onEdited}
          onCompleted={onCompleted}
          onSelected={onSelected}
          disableCheckedId={disableCheckedId}
          setOpenSelectorId={setOpenSelectorId}
          openSelectorId={openSelectorId}
        />
      ))}

      <TodoForm
        inputValue={titleToAdd}
        setInputValue={setTitleToAdd}
        selectedFunc={onAdded}
      />
    </div>
  );
};

export default TodoListContainer;
