import React from 'react';
import './ExpandedMenu.css';
import { icon } from 'leaflet';

function ExpandedMenu({ items, onClickItem }) {
  return (
    <div className="expandedMenu">
      {items.map((item, index) => (
        <div className='expandedMenuIconContainer' key={index}>
          <div className="icon" onClick={() => onClickItem(item)}>
            <img src={item.icon} width="75px" height="75px" alt="" />

            <div className="icon-name">{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpandedMenu;
