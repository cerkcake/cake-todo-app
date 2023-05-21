import { useEffect, useState, Fragment } from "react";
import "../styles/TodoListItem.css";
import Selector from "./Selector";
import TodoForm from "./TodoForm";
import { TfiMoreAlt } from "react-icons/tfi";

type Props = {
  filteredTodo: Todo;
  onDeleted: DeleteTodo;
  onEdited: EditTodo;
  onCompleted: CompleteTodo;
  disableCheckedId: string;
};

const TodoListItem = ({
  filteredTodo,
  onDeleted,
  onEdited,
  onCompleted,
  disableCheckedId,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(filteredTodo.title);
  const [toggle, setToggle] = useState(false);
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
    <Fragment>
      {!isEditing ? (
        <Fragment>
          <div
            className={
              filteredTodo.completed ? "todo-list completed" : "todo-list"
            }
            key={filteredTodo.id}
          >
            <div className="todo-checked">
              <input
                type="checkbox"
                disabled={disableCheckedId === filteredTodo.id}
                id={filteredTodo.id}
                onChange={() => {
                  onCompleted(filteredTodo);
                }}
                checked={filteredTodo.completed}
              />
              <label htmlFor={filteredTodo.id}>{filteredTodo.title}</label>
            </div>
            <div className="todo-editor">
              <TfiMoreAlt onClick={() => setToggle(!toggle)} />
            </div>
          </div>
          <div>
            {toggle && (
              <Selector
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
                todoId={filteredTodo.id}
                setToggle={setToggle}
              />
            )}
          </div>
        </Fragment>
      ) : (
        <TodoForm
          inputValue={editTitle}
          setInput={setEditTitle}
          selectedFunc={handleEditTitle}
        />
      )}
    </Fragment>
  );
};

export default TodoListItem;
