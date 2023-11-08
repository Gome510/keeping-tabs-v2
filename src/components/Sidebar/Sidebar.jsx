import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">sidebar content</div>
      <div className="sidebar-content">sidebar content</div>
    </div>
  );
}

export default Sidebar;

function SidebarItem() {
  return <div>Sidebar</div>;
}
