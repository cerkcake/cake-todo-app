import { useEffect, useState } from "react";
import "../styles/TodoListItem.css";
import Selector from "./Selector";
import TodoForm from "./TodoForm";

type Props = {
  filteredTodo: Todo;
  onDeleted: DeleteTodo;
  onEdited: EditTodo;
  onCompleted: CompleteTodo;
};

const TodoListItem = ({
  filteredTodo,
  onDeleted,
  onEdited,
  onCompleted,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(filteredTodo.title);
  const handleClickDelete = (id: string) => {
    onDeleted(id);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
    console.log(isEditing);
  };

  const handleEditTitle = (newTitle: string) => {
    const id = filteredTodo.id;
    onEdited(id, newTitle);
  };

  useEffect(() => {
    setIsEditing(false);
  }, [filteredTodo]);
  return (
    <>
      {!isEditing ? (
        <div
          className={
            filteredTodo.completed ? "todo-list completed" : "todo-list"
          }
          key={filteredTodo.id}
        >
          <form>
            <input
              type="checkbox"
              id={filteredTodo.id}
              onChange={() => onCompleted(filteredTodo)}
              checked={filteredTodo.completed}
            />
            <label htmlFor={filteredTodo.id}>{filteredTodo.title}</label>
          </form>

          <Selector
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            todoId={filteredTodo.id}
          />
        </div>
      ) : (
        <TodoForm
          inputValue={editTitle}
          setInput={setEditTitle}
          selectedFunc={handleEditTitle}
        />
      )}
    </>
  );
};

export default TodoListItem;
