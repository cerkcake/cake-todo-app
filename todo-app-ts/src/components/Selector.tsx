import React from "react";

import "../styles/Selector.css";

type Props = {
  todoId: string;
  handleClickEdit: (todoId: string) => void;
  handleClickDelete: (todoId: string) => void;
  setOpenSelectorId:(todoId:string)=> void
  openSelectorId:string
};

const Selector = ({
  todoId,
  handleClickEdit,
  handleClickDelete,
  setOpenSelectorId
}: Props) => {
  return (
    <div className="selector-container">
      <button
        id="edit"
        onClick={() => {
          handleClickEdit(todoId);
          setOpenSelectorId("");
        }}
      >
        edit
      </button>
      <button
        id="delete"
        onClick={() => {
          handleClickDelete(todoId);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Selector;
