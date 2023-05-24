import "../styles/Progress.css";

type Props = {
  todos: Todo[];
};

const Progress = ({ todos }: Props) => {
  const countTodo = todos.length;
  const countCompleted = todos.filter((todo) => todo.completed === true).length;
  const percent = (countCompleted * 100) / countTodo;
  return (
    <div className="progress-container">
      <h2>Progress</h2>
      <div className="progress-bar">
        <span style={{ width: `${percent}%` }}></span>
      </div>
      <p>
        Completed {countCompleted} / {countTodo} tasks
      </p>
    </div>
  );
};

export default Progress;
