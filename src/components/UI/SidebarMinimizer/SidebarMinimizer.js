import React from 'react';

const SidebarMinimizer = () => {

  const sidebarMinimize = () => {
    document.body.classList.toggle('sidebar-minimized');
  }

  const brandMinimize = () => {
    document.body.classList.toggle('brand-minimized');
  }

  return (
    <button className="sidebar-minimizer" type="button" onClick={() => { sidebarMinimize(); brandMinimize() }}></button>
  )
}

export default SidebarMinimizer;
