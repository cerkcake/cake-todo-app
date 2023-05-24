import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import "../styles/Filter.css";

type Props = {
  selectedFilter: string;
  setSelectedFilter: setStateString;
  isOpenFilter: boolean;
  setIsOpenFilter: setStateBoolean;
  setOpenSelectorId: setStateString;
};

const Filter = ({
  selectedFilter,
  setSelectedFilter,
  isOpenFilter,
  setIsOpenFilter,
  setOpenSelectorId,
}: Props) => {
  const handleFilterChanged = (value: string) => {
    setSelectedFilter(value);
    setIsOpenFilter(false);
  };
  return (
    <div className="select">
      <span
        onClick={() => {
          setIsOpenFilter(!isOpenFilter);
          setOpenSelectorId("");
        }}
      >
        {selectedFilter}
      </span>
      <AiOutlineDown
        className={!isOpenFilter ? "icon" : "icon rotate"}
        onClick={() => {
          setIsOpenFilter(!isOpenFilter);
          setOpenSelectorId("");
        }}
      />

      {isOpenFilter && (
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
