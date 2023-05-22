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
  onSelected: SelectOption;
  disableCheckedId: string;
  openSelectorId: string;
  setOpenSelectorId: React.Dispatch<React.SetStateAction<string>>;
};

const TodoListItem = ({
  filteredTodo,
  onDeleted,
  onEdited,
  onCompleted,
  onSelected,
  disableCheckedId,
  openSelectorId,
  setOpenSelectorId,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleToEdit, setTitleToEdit] = useState(filteredTodo.title);

  const handleClickDelete = (id: string) => {
    onDeleted(id);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleEditTitle = (newTitle: string) => {
    const id = filteredTodo.id;
    onEdited(id, newTitle);
  };

  const handleClickSelector = (selectedId: string) => {
    onSelected(selectedId);
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
              <TfiMoreAlt
                onClick={() => {
                  handleClickSelector(filteredTodo.id);
                }}
              />
            </div>
          </div>
          {openSelectorId === filteredTodo.id && (
            <div>
              <Selector
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
                todoId={filteredTodo.id}
                openSelectorId={openSelectorId}
                setOpenSelectorId={setOpenSelectorId}
              />
            </div>
          )}
        </Fragment>
      ) : (
        <TodoForm
          inputValue={titleToEdit}
          setInputValue={setTitleToEdit}
          selectedFunc={handleEditTitle}
        />
      )}
    </Fragment>
  );
};

export default TodoListItem;
