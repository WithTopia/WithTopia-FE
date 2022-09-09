import React from 'react';

const Sidebaritem = ({menu}) => {
  return (
    <div className="sidebar-item">
      <p>{menu.name}</p>
    </div>
  );
}

export default Sidebaritem;
