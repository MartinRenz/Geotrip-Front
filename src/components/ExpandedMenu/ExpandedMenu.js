import React from 'react';
import './ExpandedMenu.css';

function ExpandedMenu({ items, onClickItem }) {
  return (
    <div className="expandedMenu">
      {items.map((item, index) => (
        <div
          className="icon"
          key={index}
          onClick={() => onClickItem(item)}
        >
          <img src={item.icon} width="75px" height="75px" alt="" />
        </div>
      ))}
    </div>
  );
}

export default ExpandedMenu;
