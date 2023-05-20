import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import "../styles/Filter.css";

type Props = {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = ({ selectedFilter, setSelectedFilter }: Props) => {
  const [toggle, setToggle] = useState(false);
  const handleFilterChanged = (value: string) => {
    setSelectedFilter(value);
    setToggle(false);
  };
  return (
    <div className="select">
      <span onClick={() => setToggle(!toggle)}>{selectedFilter}</span>
      <AiOutlineDown
        className={!toggle ? "icon" : "icon rotate"}
        onClick={() => setToggle(!toggle)}
      />

      {toggle && (
        <ul>
          <li onClick={() => handleFilterChanged("All")}>All</li>
          <li onClick={() => handleFilterChanged("Done")}>Done</li>
          <li onClick={() => handleFilterChanged("Active")}>Active</li>
        </ul>
      )}
    </div>
  );
};

export default Filter;
