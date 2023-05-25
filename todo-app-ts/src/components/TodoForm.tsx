import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import "../styles/TodoForm.css";

type Props = {
  inputValue: string;
  setInputValue: setStateString
  selectedFunc: AddOrEditTodo;
  setOpenSelectorId: setStateString
};

const TodoForm = ({
  inputValue,
  setInputValue,
  selectedFunc,
  setOpenSelectorId,
}: Props) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    selectedFunc(inputValue);
  };
  useEffect(() => {
    if (inputValue.trim().length > 0) {
      setIsTyping(true);
    }
    if (inputValue.trim().length === 0) {
      setIsTyping(false);
    }
  }, [inputValue]);

  return (
    <form className="todo-form">
      <input
        type="text"
        value={inputValue}
        placeholder="Add a todo"
        onChange={handleChange}
        onSelect={() => setOpenSelectorId("")}
        maxLength={70}
      />
      {isTyping && (
        <button className="todo-button" onClick={handleSubmit}>
          Save
        </button>
      )}
    </form>
  );
};

export default TodoForm;
