import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import "../styles/TodoForm.css";

type Props = {
  inputValue: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  selectedFunc: AddTodo;
};

const TodoForm = ({ inputValue, setInput, selectedFunc }: Props) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    selectedFunc(inputValue);
  };
  useEffect(() => {
    if (inputValue.length > 0) {
      setIsTyping(true);
    }
    if (inputValue.length === 0) {
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
