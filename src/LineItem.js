import React from "react";
import { FaTrashAlt } from "react-icons/fa";
//we are using item as props not items because this is individual line item
const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        // aria-label is for accessibility
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItem;
