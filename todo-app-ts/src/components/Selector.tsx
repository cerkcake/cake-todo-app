import React, { useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import "../styles/Selector.css";

type Props = {
  todoId:string;
  handleClickEdit:(todoId:string) => void;
  handleClickDelete:(todoId:string) => void;
};

const Selector = ({ todoId, handleClickEdit, handleClickDelete }: Props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="selector">
      <TfiMoreAlt onClick={() => setToggle(!toggle)} />

      {toggle && (
        <div className="selector-container">
          <button id="edit"
            onClick={() => {
              handleClickEdit(todoId);
              setToggle(false);
            }}
          >
            edit
          </button>
          <button id="delete"
            onClick={() => {
              handleClickDelete(todoId);
              setToggle(false);
            }}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Selector;
