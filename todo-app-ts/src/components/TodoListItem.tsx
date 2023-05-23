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
  editingId: string;
  setEditingId: React.Dispatch<React.SetStateAction<string>>;
  setTitleToAdd: React.Dispatch<React.SetStateAction<string>>;
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
  editingId,
  setEditingId,
  setTitleToAdd,
}: Props) => {
  const [titleToEdit, setTitleToEdit] = useState(filteredTodo.title);

  const handleClickDelete = (id: string) => {
    onDeleted(id);
  };

  const handleClickEdit = () => {
    setEditingId(filteredTodo.id);
  };

  const handleEditTitle = (newTitle: string) => {
    const id = filteredTodo.id;
    onEdited(id, newTitle);
  };

  const handleClickSelector = (selectedId: string) => {
    onSelected(selectedId);
    setEditingId("");
    setTitleToAdd("");
  };

  useEffect(() => {
    setEditingId("");
  }, [filteredTodo]);

  return (
    <Fragment>
      {!(editingId === filteredTodo.id) ? (
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
                setEditingId={setEditingId}
              />
            </div>
          )}
        </Fragment>
      ) : (
        <TodoForm
          inputValue={titleToEdit}
          setInputValue={setTitleToEdit}
          selectedFunc={handleEditTitle}
          setOpenSelectorId={setOpenSelectorId}
        />
      )}
    </Fragment>
  );
};

export default TodoListItem;
