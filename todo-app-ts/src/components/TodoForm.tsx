import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import "../styles/TodoForm.css";

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  selectedFunc: AddOrEditTodo;
};

const TodoForm = ({ inputValue, setInputValue, selectedFunc }: Props) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
        maxLength={80}
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
