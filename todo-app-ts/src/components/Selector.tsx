import React from "react";

import "../styles/Selector.css";

type Props = {
  todoId: string;
  handleClickEdit: (todoId: string) => void;
  handleClickDelete: (todoId: string) => void;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Selector = ({
  todoId,
  handleClickEdit,
  handleClickDelete,
  setToggle,
}: Props) => {
  return (
    <div className="selector-container">
      <button
        id="edit"
        onClick={() => {
          handleClickEdit(todoId);
          setToggle(false);
        }}
      >
        edit
      </button>
      <button
        id="delete"
        onClick={() => {
          handleClickDelete(todoId);
          setToggle(false);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Selector;
