import { useEffect, useState } from "react";
import Progress from "./components/Progress";
import TodoListContainer from "./components/TodoListContainer";
import "./App.css";
import axios from "axios";
import { API_URL } from "./Config";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
    <div className="App">
      <Progress todos={todos} />
      <TodoListContainer
        todos={todos}
        getTodos={getTodos}
      />
    </div>
  );
}

export default App;
