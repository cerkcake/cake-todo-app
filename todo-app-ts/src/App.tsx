import { useEffect, useState } from "react";
import Progress from "./components/Progress";
import TodoListContainer from "./components/TodoListContainer";
import "./App.css";
import axios from "axios";
import { API_URL } from "./Config";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [openSelectorId, setOpenSelectorId] = useState("");

  const getTodos = () => {
    axios({
      method: "GET",
      url: `${API_URL}/todos/`,
    }).then((response) => {
      const _todos = response.data;
      setTodos(_todos);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const closeHandler = () => {
    if (isOpenFilter) {
      setIsOpenFilter(false);
    }
    if (openSelectorId !== "") {
      setOpenSelectorId("");
    }
  };

  return (
    <div className="App" onClick={() => closeHandler()}>
      <Progress todos={todos} />
      <TodoListContainer
        todos={todos}
        getTodos={getTodos}
        isOpenFilter={isOpenFilter}
        setIsOpenFilter={setIsOpenFilter}
        openSelectorId={openSelectorId}
        setOpenSelectorId={setOpenSelectorId}
      />
    </div>
  );
}

export default App;
